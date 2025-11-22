import { Component, inject, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './employee-list.html',
  styleUrl: './employee-list.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeeList {

  employeeService = inject(EmployeeService);
  router = inject(Router);
  cdr = inject(ChangeDetectorRef);   // 🔥 Needed for OnPush

  employees: any[] = [];

  ngOnInit() {
    this.loadEmployees();
  }

  loadEmployees() {
    this.employeeService.getAllEmployees().subscribe({
      next: (res: any) => {
        console.log("API response:", res); 
        // Some APIs return array directly, some return {data: []}
        this.employees = Array.isArray(res) ? res : res.data || [];
        this.cdr.detectChanges();   // 🔥 Force UI update
      },

      error: () => {
        this.employees = [];
        this.cdr.detectChanges();
      }
    });
  }

  deleteEmployee(id: string) {
    if (!confirm("Are you sure you want to delete this employee?")) return;

    this.employeeService.deleteEmployee(id).subscribe({
      next: () => {
        this.loadEmployees();   // 🔥 refresh list
      },

      error: () => {
        alert("Failed to delete employee");
      }
    });
  }
}
