import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-flights',
  templateUrl: './flights.component.html',
  styleUrls: ['./flights.component.css'],
})
export class FlightsComponent implements OnInit {
  flights: any = [];
  flightModel: any = {
    to: '',
    startDate: '',
    price: '',
    sets: '',
  };
  isLogin = localStorage.getItem('token');
  constructor(public global: GlobalService, private toster: ToastrService) {
    this.global.isAdmin = localStorage.getItem('isAdmin') ? true : false;
  }

  ngOnInit(): void {
    this.allFligth();
  }
  allFligth() {
    this.global.showAll().subscribe((res) => {
      this.flights = res.data;

      // return this.flights.push(...res.data);
    });
  }
  bookTiket(id: any) {
    if (this.isLogin) {
      this.global.bookTicket(id).subscribe((res) => {
        if (res.ApiReq) {
          console.log(res);
          this.toster.success(res.message, 'Correct');
          // return this.flights.push(...res.flight);
          this.flights = res.flight;
        } else this.toster.warning(res.message, 'Wrong');
      });
    } else {
      this.toster.warning('LOGIN FRIST', 'plaese');
    }
  }
  deleteFlight(fligthId: any) {
    this.global.deleteFligh(fligthId).subscribe(
      (res) => {
        console.log(res);
        this.allFligth();
        this.toster.success('User Deletetd ', 'Done');
      },
      (err) => {
        console.log(err.error.message);
      }
    );
  }

  displayStyle = 'none';
  idF: any = '';
  openPopup(id: any) {
    this.displayStyle = 'block';
    this.idF = id;
  }
  closePopup() {
    this.displayStyle = 'none';
  }
  handelSubmit(editForm: any) {
    if (editForm.valid) {
      for (const property in this.flightModel) {
        if (this.flightModel[property] == '') {
          delete this.flightModel[property];
        }
      }

      this.global.editFlight(this.flightModel, this.idF).subscribe(
        (res) => {
          this.allFligth();
          this.toster.success('Flight Edit Success ', 'Done');
          this.closePopup();
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }
}
