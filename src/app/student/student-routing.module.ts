import { MyBooksComponent } from './components/my-books/my-books.component';
import { AllBooksComponent } from './components/all-books/all-books.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StudentDashboardComponent } from './components/student-dashboard/student-dashboard.component';
import { StudentNavComponent } from './components/student-nav/student-nav.component';


const routes: Routes = [
  {path:'', component:StudentNavComponent,
  children:[
  {path:'dashboard', component:StudentDashboardComponent},
  {path:'all-books', component:AllBooksComponent},
  {path:'my-books', component:MyBooksComponent}
  
  ]
}
  // {path: 'login',component:LoginComponent},
  // {path: 'signup', component:RegisterComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule { }
