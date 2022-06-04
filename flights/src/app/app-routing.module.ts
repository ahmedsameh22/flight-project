import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FlightformComponent } from './components/flightform/flightform.component';
import { RequestetformComponent } from './components/requestetform/requestetform.component';
import { AdminComponent } from './pages/admin/admin.component';
import { Error404Component } from './pages/error404/error404.component';
import { FlightsComponent } from './pages/flights/flights.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { RegisterformComponent } from './pages/registerform/registerform.component';
import { UsersComponent } from './pages/users/users.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'register', component: RegisterformComponent },
  { path: 'logout', component: HomeComponent },
  {
    path: 'login',
    children: [{ path: ':loginType', component: LoginComponent }],
  },
  { path: 'profile', component: ProfileComponent },
  { path: 'flights', component: FlightsComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'users', component: UsersComponent },
  { path: 'request', component: RequestetformComponent },

  { path: 'addflight', component: FlightformComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', component: Error404Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
