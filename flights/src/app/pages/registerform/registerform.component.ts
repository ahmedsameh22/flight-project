import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-registerform',
  templateUrl: './registerform.component.html',
  styleUrls: ['./registerform.component.css'],
})
export class RegisterformComponent implements OnInit {
  modelUser: any = {};
  constructor(
    private globel: GlobalService,
    private toster: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {}
  handalSubmit(e: NgForm) {
    if (e.valid) {
      console.log(this.modelUser);
      this.globel.signUp(this.modelUser).subscribe(
        (res) => {
          console.log(res);
          if (res.AppReq) {
            this.toster.success(res.message, 'Done');
            this.router.navigateByUrl('login/user');
          }
        },
        (err) => {
          this.toster.warning(err.error.error, 'ERROR');
          console.log(err.error.error);
        }
      );
    }
  }
}
