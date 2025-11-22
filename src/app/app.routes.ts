import { Routes } from '@angular/router';

// Public Page
import { Login } from './pages/login/login';

// Layout + Pages
import { Layout } from './pages/layout/layout';
import { Dashboard } from './pages/dashboard/dashboard';

import { EmployeeList } from './pages/employee-list/employee-list';
import { EmployeeForm } from './pages/employee-form/employee-form';

import { DepartmentList } from './pages/department-list/department-list';
import { DepartmentForm } from './pages/department-form/department-form';

import { LeaveList } from './pages/leave-list/leave-list';
import { LeaveApply } from './pages/leave-apply/leave-apply';

// Guards
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  { path: 'login', component: Login },

  {
    path: '',
    component: Layout,
    canActivate: [AuthGuard],
    children: [
      { path: 'dashboard', component: Dashboard }, // Admin only (shown in UI, but guard controls access)

      // Admin pages
      { path: 'employees', component: EmployeeList },
      { path: 'employees/add', component: EmployeeForm },
      { path: 'employees/edit/:id', component: EmployeeForm },

      { path: 'departments', component: DepartmentList },
      { path: 'departments/add', component: DepartmentForm },
      { path: 'departments/edit/:id', component: DepartmentForm },

      // Leaves
      { path: 'leaves', component: LeaveList },
      { path: 'leaves/apply', component: LeaveApply }
    ]
  },

  { path: '**', redirectTo: 'dashboard' }
];
