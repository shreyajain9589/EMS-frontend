import { Component, inject, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { EmployeeService } from '../../services/employee.service';
import { DepartmentService } from '../../services/department.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './employee-form.html',
  styleUrl: './employee-form.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeeForm {

  // 🚨 THE FIX: Force component to recreate when navigating
  constructor() {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  employeeService = inject(EmployeeService);
  deptService = inject(DepartmentService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  cdr = inject(ChangeDetectorRef);

  isEdit = false;
  employeeId = '';

  departments: any[] = [];

  // Initial employee model
  employee: any = {
    name: "",
    email: "",
    phone: "",
    department: "",
    designation: "",
    joiningDate: "",
    password: ""
  };

  ngOnInit() {

    this.loadDepartments();

    this.employeeId = this.route.snapshot.params['id'];

    if (this.employeeId) {
      this.isEdit = true;
      this.loadEmployee();
    } else {
      this.isEdit = false;
      this.resetEmployee();
      this.cdr.detectChanges();
    }
  }

  resetEmployee() {
    this.employee = {
      name: "",
      email: "",
      phone: "",
      department: "",
      designation: "",
      joiningDate: "",
      password: ""
    };
  }

  loadDepartments() {
    this.deptService.getAllDepartments().subscribe({
      next: (res: any) => {
        this.departments = Array.isArray(res) ? res : res?.data || [];
        this.cdr.detectChanges();
      }
    });
  }

  loadEmployee() {
    this.employeeService.getEmployeeById(this.employeeId).subscribe({
      next: (res: any) => {
        const e = res?.data;

        if (e) {
          this.employee = {
            name: e.name,
            email: e.email,
            phone: e.phone,
            department: e.department?._id || "",
            designation: e.designation || "",
            joiningDate: e.joiningDate ? e.joiningDate.substring(0, 10) : "",
            password: ""
          };
        }

        this.cdr.detectChanges();
      }
    });
  }

  saveEmployee() {
    if (!this.employee.name || !this.employee.email || !this.employee.department) {
      alert("Name, Email & Department are required!");
      return;
    }

    if (this.isEdit) {
      this.employeeService.updateEmployee(this.employeeId, this.employee).subscribe({
        next: () => {
          alert("Employee updated!");
          this.router.navigateByUrl("/employees");
        }
      });

    } else {
      this.employeeService.addEmployee(this.employee).subscribe({
        next: () => {
          alert("Employee added!");
          this.router.navigateByUrl("/employees");
        }
      });
    }
  }
}
