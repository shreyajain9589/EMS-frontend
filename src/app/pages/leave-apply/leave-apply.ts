import { Component, inject, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LeaveService } from '../../services/leave.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-leave-apply',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './leave-apply.html',
  styleUrl: './leave-apply.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LeaveApply {

  leaveService = inject(LeaveService);
  router = inject(Router);
  cdr = inject(ChangeDetectorRef);

  leaveObj = {
    from: "",
    to: "",
    reason: ""
  };

  apply() {
    if (!this.leaveObj.from || !this.leaveObj.to || !this.leaveObj.reason) {
      alert("All fields are required!");
      return;
    }

    const user = JSON.parse(localStorage.getItem("employeeApp") || "{}");

    const payload = {
      employeeId: user._id,
      startDate: this.leaveObj.from,
      endDate: this.leaveObj.to,
      type: "casual",        // 🔥 FIXED (lowercase allowed by backend)
      reason: this.leaveObj.reason
    };

    console.log("Leave Payload:", payload);

    this.leaveService.applyLeave(payload).subscribe({
      next: () => {
        alert("Leave request submitted successfully!");
        this.router.navigateByUrl("/leaves");
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error("Leave Error:", err);
        alert(err.error?.message || "Something went wrong.");
        this.cdr.detectChanges();
      }
    });
  }
}
