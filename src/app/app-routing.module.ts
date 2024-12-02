import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './partials/body/home/home.component';
import { LoginComponent } from './partials/body/login/login.component';
import { NotfoundComponent } from './partials/body/notfound/notfound.component';
import { LogoutComponent } from './partials/body/logout/logout.component';
import { UserViewComponent } from './partials/body/userControl/user-view/user-view.component';
import { TaskViewComponent } from './partials/body/userControl/task-view/task-view.component';
import { TaskCreateComponent } from './partials/body/userControl/task-create/task-create.component';
import { TaskEditComponent } from './partials/body/userControl/task-edit/task-edit.component';
import { AuthguardGuard } from './guard/authguard.guard';

const routes: Routes = [
  // landing page
  {path:'home', title:'Home', component:HomeComponent,pathMatch:'full'},

  // login page
  {path:'login',component: LoginComponent},
  {path:'logout', component:LogoutComponent},

  // User pages
  {path: 'userSelf/:id', title:'userPage', component:UserViewComponent},

  // Task pages
  {path:'tasks', title:'AllTasks', component:TaskViewComponent},
  {path:'createTask', title:'CreateTask', component:TaskCreateComponent, canActivate: [AuthguardGuard]},
  {path:'editTask/:id', title:'EditTask', component:TaskEditComponent, canActivate: [AuthguardGuard]}, 
  
  // route entry error handling
  {path:'', redirectTo:'/home',pathMatch:'full'},
  {path:'**', component:NotfoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
