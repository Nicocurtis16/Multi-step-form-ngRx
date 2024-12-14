import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Component/HomePage/home/home.component';
import { YourInfoComponent } from './Component/Steps/your-info/your-info.component';
import { SelectPlanComponent } from './Component/Steps/select-plan/select-plan.component';
import { AddOnsComponent } from './Component/Steps/add-ons/add-ons.component';
import { SummaryComponent } from './Component/Steps/summary/summary.component';
import { SignUpComponent } from './Component/SignUp/sign-up/sign-up.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },  // Default route
  { path: 'signup', component: SignUpComponent, children: [
      { path: 'step1', component: YourInfoComponent },
      { path: 'step2', component: SelectPlanComponent },
      { path: 'step3', component: AddOnsComponent },
      { path: 'step4', component: SummaryComponent },
      { path: '', redirectTo: 'step1', pathMatch: 'full' }
    ]},
  { path: '**', redirectTo: '', pathMatch: 'full' }  // Redirect unknown paths to home
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
