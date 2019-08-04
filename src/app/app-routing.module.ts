import { ContactComponent } from './shared/components/contact/contact.component';
import { AboutComponent } from './shared/components/about/about.component';
import { HomeComponent } from './shared/components/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';
import { LoginComponent } from './student/components/login/login.component';
import { RegisterComponent } from './student/components/register/register.component';

const routes: Routes = [
  {path:'',redirectTo:'/home',pathMatch:'full'},
  {path:'home', component: HomeComponent,children:
  [
    {path:'about', component:AboutComponent},
    {path:'contact', component:ContactComponent},
    {path:'login', component:LoginComponent},
    {path:'signup', component:RegisterComponent}
  ]},
  
  {path: 'student', loadChildren:() => import('./student/student.module').then(mod => mod.StudentModule)},
  {path: 'librarian', loadChildren:()=> import('./librarian/librarian.module').then(mod => mod.LibrarianModule)},
  {path: '**',component:PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
