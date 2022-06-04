import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-flightform',
  templateUrl: './flightform.component.html',
  styleUrls: ['./flightform.component.css'],
})
export class FlightformComponent implements OnInit {
  flightModel: any = {
    to: '',
    startDate: '',
    price: '',
    sets: '',
  };
  constructor(private global: GlobalService, private toster: ToastrService) {}

  ngOnInit(): void {}
  handelSubmit(addFlight: NgForm) {
    if (addFlight.valid) {
      this.global.addFlight(this.flightModel).subscribe(
        (res) => {
          this.toster.success('Flight Add Success ', 'Done');
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }
}
