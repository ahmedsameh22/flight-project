import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-requestetform',
  templateUrl: './requestetform.component.html',
  styleUrls: ['./requestetform.component.css'],
})
export class RequestetformComponent implements OnInit {
  reqModel = {
    startDate: '',
    to: '',
    days: '',
  };
  constructor(private global: GlobalService, private toster: ToastrService) {}

  ngOnInit(): void {}
  handelSubmit(req: NgForm) {
    if (req.valid) {
      this.global.reqFlight(this.reqModel).subscribe(
        (res) => {
          this.toster.success('Requset send to Admin', 'Done');
        },
        (err) => {
          this.toster.warning(err.error, 'erros');
        }
      );
    }
  }
}
