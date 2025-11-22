import { Component, inject, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { LeaveService } from '../../services/leave.service';
import { AuthService } from '../../services/auth.service';
import { CommonModule, DatePipe, UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-leave-list',
  standalone: true,
  imports: [CommonModule, DatePipe, UpperCasePipe],
  templateUrl: './leave-list.html',
  styleUrl: './leave-list.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LeaveList {

  leaveService = inject(LeaveService);
  authService = inject(AuthService);
  cdr = inject(ChangeDetectorRef);

  leaves: any[] = [];
  user: any;

  ngOnInit() {
    this.user = this.authService.getUser();

    if (this.user.role === "employee") {
      // Load only employee’s own leaves
      this.leaveService.getUserLeaves(this.user._id).subscribe((res: any) => {
        this.leaves = res;
        this.cdr.detectChanges();
      });
    } else {
      // Load all leaves for admin / manager
      this.leaveService.getAllLeaves().subscribe((res: any) => {
        const list = Array.isArray(res) ? res : [];
        this.leaves = list;
        this.cdr.detectChanges();
      });
    }
  }

  updateStatus(id: string, status: string) {
    if (this.user.role !== "admin" && this.user.role !== "manager") return;

    this.leaveService.updateLeaveStatus(id, status).subscribe(() => {
      this.ngOnInit();  // reload data
    });
  }
}
