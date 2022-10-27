import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardPageComponent } from './components/dashboard-page/dashboard-page.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { AdminLayoutComponent } from './shared/components/admin-layout/admin-layout.component';
import {RouterModule, Routes} from "@angular/router";
import { CreateComponent } from './components/create/create.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "../shared/shared.module";
import {AuthGuard} from "../auth.guard";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {EditPostComponent} from "../edit-post/edit-post.component";
import { AlertComponent } from './shared/components/alert/alert.component';
import {AlertService} from "./services/alert.service";
import {TableComponent} from "../table/table.component";

const router: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      {path: '', redirectTo: '/admin/login', pathMatch: 'full'},
      {path: 'login', component: LoginPageComponent},
      {path: 'create', component: CreateComponent, canActivate: [AuthGuard]},
      {path: 'dashboard', component: DashboardPageComponent, canActivate: [AuthGuard]},
      {path: 'post/:id/edit', component: EditPostComponent}
    ]
  }
];


@NgModule({
  declarations: [
    DashboardPageComponent,
    LoginPageComponent,
    AdminLayoutComponent,
    CreateComponent,
    AlertComponent,
    TableComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(router),
    SharedModule,
    MatProgressSpinnerModule,
    // AppModule,
  ],
  exports: [
    DashboardPageComponent,
    LoginPageComponent,
    AdminLayoutComponent,
    TableComponent
  ],
    providers: [AuthGuard, AlertService]
})
export class AdminModule { }
