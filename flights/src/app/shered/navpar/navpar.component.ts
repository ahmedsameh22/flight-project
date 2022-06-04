import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-navpar',
  templateUrl: './navpar.component.html',
  styleUrls: ['./navpar.component.css'],
})
export class NavparComponent implements OnInit {
  constructor(
    public global: GlobalService,
    private route: Router,
    private toster: ToastrService
  ) {
    const token = localStorage.getItem('token');
    if (token) {
      this.global.isAdmin = localStorage.getItem('isAdmin') ? true : false;
      if (!this.global.isAdmin) {
        this.global.islogin = true;
      }
    }
  }
  ngOnInit(): void {}
  handellogout() {
    this.global.logOut().subscribe((res) => {
      this.toster.success(`${res.message}`, ' you logout');
      localStorage.removeItem('token');
      localStorage.removeItem('isAdmin');
      this.global.islogin = false;
      this.global.isAdmin = false;

      this.route.navigateByUrl('home');
    });
  }
}
