import { Component, inject, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DepartmentService } from '../../services/department.service';

@Component({
  selector: 'app-department-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './department-form.html',
  styleUrl: './department-form.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DepartmentForm {

  deptService = inject(DepartmentService);
  route = inject(ActivatedRoute);
  router = inject(Router);
  cdr = inject(ChangeDetectorRef);   // ✅ required for OnPush

  isEdit = false;
  departmentId = "";

  department = {
    name: "",
    description: ""
  };

  ngOnInit() {
    this.departmentId = this.route.snapshot.params['id'];

    if (this.departmentId) {
      this.isEdit = true;
      this.loadDepartment();
    }
  }

  loadDepartment() {
    this.deptService.getAllDepartments().subscribe({
      next: (res: any) => {
        const list = Array.isArray(res) ? res : [];
        const dept = list.find((d: any) => d._id === this.departmentId);

        if (dept) {
          this.department = {
            name: dept.name,
            description: dept.description
          };
        }

        this.cdr.detectChanges();   // ✅ force UI update
      },

      error: () => {
        this.cdr.detectChanges();   // still update view
      }
    });
  }

  saveDepartment() {
    if (!this.department.name) {
      alert("Department name is required!");
      return;
    }

    if (this.isEdit) {
      this.deptService.updateDepartment(this.departmentId, this.department)
        .subscribe({
          next: () => {
            alert("Department updated!");
            this.router.navigateByUrl("/departments");
          },
          error: () => {
            alert("Failed to update department");
          }
        });

    } else {
      this.deptService.addDepartment(this.department)
        .subscribe({
          next: () => {
            alert("Department added!");
            this.router.navigateByUrl("/departments");
          },
          error: () => {
            alert("Failed to add department");
          }
        });
    }
  }
}
