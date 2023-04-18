import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './auth/login/login.component';
import { RemindPasswordComponent } from './auth/remind-password/remind-password.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { AddCarComponent } from './dashboard/add-car/add-car.component';
import { ShowCarsComponent } from './dashboard/show-cars/show-cars.component';
import { AuthGuard } from './guards/auth-guard.guard';

const routes: Routes = [
  { path: '',   component: LoginComponent },
  { path: 'signup',  component: SignUpComponent },
  { path: 'remind',  component: RemindPasswordComponent},
  { path: 'addCar',  component: AddCarComponent, canActivate: [AuthGuard]}, //canActivate: [AuthGuard]
  { path: 'showCars',  component: ShowCarsComponent, canActivate: [AuthGuard]} //canActivate: [AuthGuard]
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
