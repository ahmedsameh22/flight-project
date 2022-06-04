import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  constructor(public global: GlobalService, private router: Router) {
    this.global.isAdmin = localStorage.getItem('isAdmin') ? true : false;
  }

  ngOnInit(): void {
    console.log(this.global.isAdmin);
  }
}
