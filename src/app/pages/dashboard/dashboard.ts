import { Component, inject, ChangeDetectorRef } from '@angular/core';
import { DepartmentService } from '../../services/department.service';
import { EmployeeService } from '../../services/employee.service';
import { LeaveService } from '../../services/leave.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard {

  deptService = inject(DepartmentService);
  empService = inject(EmployeeService);
  leaveService = inject(LeaveService);

  cdr = inject(ChangeDetectorRef);

  totals = {
    employees: 0,
    departments: 0,
    leaves: 0,
    pendingLeaves: 0
  };

  recentLeaves: any[] = [];

  user: any = JSON.parse(localStorage.getItem("employeeApp") || "{}");

  ngOnInit() {
    this.loadStats();
    this.loadRecentLeaves();
  }

  loadStats() {

    // Employees (only admin or manager)
    if (this.user.role === "admin" || this.user.role === "manager") {
      this.empService.getAllEmployees().subscribe((res: any) => {
        this.totals.employees = res.data.length || 0;
        this.cdr.detectChanges();
      });
    }

    // Departments (count only)
    this.deptService.getAllDepartments().subscribe((res: any) => {
      this.totals.departments = res.length || 0;
      this.cdr.detectChanges();
    });

    // Leaves
    if (this.user.role === "employee") {
      this.leaveService.getUserLeaves(this.user._id).subscribe((res: any) => {
        const list = Array.isArray(res) ? res : [];

        this.totals.leaves = list.length;
        this.totals.pendingLeaves = list.filter(l => l.status === 'pending').length;

        this.cdr.detectChanges();
      });
    } else {
      this.leaveService.getAllLeaves().subscribe((res: any) => {
        const list = Array.isArray(res) ? res : [];

        this.totals.leaves = list.length;
        this.totals.pendingLeaves = list.filter(l => l.status === 'pending').length;

        this.cdr.detectChanges();
      });
    }
  }

  loadRecentLeaves() {
    if (this.user.role === "employee") {
      this.leaveService.getUserLeaves(this.user._id).subscribe((res: any) => {
        const list = Array.isArray(res) ? res : [];

        this.recentLeaves = list.map((l: any) => ({
          ...l,
          from: l.startDate,
          to: l.endDate
        })).slice(0, 5);

        this.cdr.detectChanges();
      });
    } else {
      this.leaveService.getAllLeaves().subscribe((res: any) => {
        const list = Array.isArray(res) ? res : [];

        this.recentLeaves = list.map((l: any) => ({
          ...l,
          from: l.startDate,
          to: l.endDate
        })).slice(0, 5);

        this.cdr.detectChanges();
      });
    }
  }
}
