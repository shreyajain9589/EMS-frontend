import { Component, inject } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { DepartmentService } from '../../services/department.service';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-department-list',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, CommonModule],
  templateUrl: './department-list.html',
  styleUrl: './department-list.css'
})
export class DepartmentList {

  deptService = inject(DepartmentService);
  router = inject(Router);
  cdr = inject(ChangeDetectorRef);

  departments: any[] = [];

  ngOnInit() {
    this.loadDepartments();
  }

  loadDepartments() {
    this.deptService.getAllDepartments().subscribe((res: any) => {
      this.departments = Array.isArray(res) ? res : [];
      this.cdr.detectChanges();
    });
  }

  deleteDepartment(id: string) {
    if (!confirm("Are you sure you want to delete this department?")) return;

    this.deptService.deleteDepartment(id).subscribe(() => {
      this.loadDepartments();
      this.cdr.detectChanges();
    });
  }
}
