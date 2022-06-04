import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  userInfo: any = {};
  file: any = null;
  imageProfile: string = 'assets/image/blank-profile-picture.png';
  authration: boolean = false;
  display = 'none';
  ticketInfo: any = null;
  constructor(private global: GlobalService) {
    this.global.getMe().subscribe((res) => {
      console.log(res);
      if (res.message == 'Not Authration') {
        this.authration = true;
      } else {
        this.userInfo = res.data;
        if (this.userInfo.image) {
          this.imageProfile =
            'http://localhost:3000' + this.userInfo.image.replace('public', '');
        }
      }
    });
  }
  ngOnInit(): void {}
  handelSubmit() {
    if (this.file) {
      let formData = new FormData();
      formData.append('profileImg', this.file[0]);
      this.global.uploadImg(formData).subscribe((res) => {
        console.log(res);
        this.imageProfile =
          'http://localhost:3000' + res.data.image.replace('public', '');
      });
    }
  }
  handelChange(e: any) {
    console.log(e.target.files);
    this.file = e.target.files;
  }
  openModal(id: any) {
    console.log(id);
    this.global.showFlight(id).subscribe(
      (res) => {
        console.log(res);
        this.ticketInfo = res.ticket;
      },
      (err) => {
        console.log(err);
      }
    );
    this.display = 'block';
  }
  onCloseHandled() {
    this.display = 'none';
  }
}
