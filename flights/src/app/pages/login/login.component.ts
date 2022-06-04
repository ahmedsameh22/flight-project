import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validator, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginFrom = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });
  logininfo = FormControl;
  type: any = '';
  constructor(
    private global: GlobalService,
    private router: Router,
    private _activated: ActivatedRoute,
    private toastr: ToastrService
  ) {}
  get loganVal() {
    return this.loginFrom.controls;
  }
  UserDataa: any = {};
  ngOnInit(): void {}
  onClickSubmit() {
    this.type = this._activated.snapshot.paramMap.get('loginType');
    this.global.login(this.loginFrom.value, this.type).subscribe((res) => {
      console.log(res);

      if (res.apiReq) {
        localStorage.setItem('token', res.data.token);
        if (res.data.role == 'admin') {
          localStorage.setItem('isAdmin', 'true');
          this.global.isAdmin = true;
          console.log(this.global.isAdmin);
          this.toastr.success(`Hi Admin`, 'login success');
          this.router.navigate(['/admin']);
        } else {
          this.global.islogin = true;
          this.toastr.success(`Hi ${res.data.user.name}`, 'login success');
          this.router.navigate(['/profile']);
        }
      } else {
        this.toastr.warning(`${res.message}`, 're enter password or Email');
      }
    });
  }
}
