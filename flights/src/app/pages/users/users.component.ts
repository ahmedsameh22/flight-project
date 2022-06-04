import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  usersData: any = [];
  display = 'none';

  constructor(private global: GlobalService, private toster: ToastrService) {
    this.allUser();
  }
  allUser() {
    this.global.getAllUser().subscribe(
      (res) => {
        this.usersData = res.data;
        console.log(this.usersData);
      },
      (err) => {
        console.log(err.error.message);
      }
    );
  }
  ngOnInit(): void {}
  deleteUser(userId: any) {
    this.global.deleteUser(userId).subscribe(
      (res) => {
        this.allUser();
        this.toster.success('User Deletetd ', 'Done');
      },
      (err) => {
        console.log(err.error.message);
      }
    );
  }
  openModal(id: any) {
    this.display = 'block';
  }
  onCloseHandled() {
    this.display = 'none';
  }
}
