import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TechnicalAdminComponent } from './technical-admin.component';
import { UsersComponent } from './components/users/users.component';

const routes: Routes = [
  {
    path: '',
    component: TechnicalAdminComponent,
    children: [
      {
        path: "",
        redirectTo: "/users",
        pathMatch: "full",
      },
      {
        path: "users",
        component: UsersComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TechnicalAdminRoutingModule { }
