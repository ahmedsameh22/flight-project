import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { NavparComponent } from './shered/navpar/navpar.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { Error404Component } from './pages/error404/error404.component';
import { RegisterformComponent } from './pages/registerform/registerform.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { ProfileComponent } from './pages/profile/profile.component';
import { FlightsComponent } from './pages/flights/flights.component';
import { AuchInterceptor } from './interceptor/auch.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AdminComponent } from './pages/admin/admin.component';
import { UsersComponent } from './pages/users/users.component';
import { FlightformComponent } from './components/flightform/flightform.component';
import { RequestetformComponent } from './components/requestetform/requestetform.component';

@NgModule({
  declarations: [
    AppComponent,
    NavparComponent,
    HomeComponent,
    LoginComponent,
    Error404Component,
    RegisterformComponent,
    ProfileComponent,
    FlightsComponent,
    AdminComponent,
    UsersComponent,
    FlightformComponent,
    RequestetformComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-center',
    }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuchInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
