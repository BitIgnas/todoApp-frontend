import { TodoListViewComponent } from './layout/todo-list-view/todo-list-view.component';
import { RegisterViewComponent } from './layout/register-view/register-view.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './layout/home/home.component';
import { LoginViewComponent } from './layout/login-view/login-view.component';

const routes: Routes = [
  {path:'', component: HomeComponent},
  {path:'home', component: HomeComponent},
  {path:'register', component: RegisterViewComponent},
  {path: 'login', component: LoginViewComponent},
  {path: 'todo', component: TodoListViewComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
