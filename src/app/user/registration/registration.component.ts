import { UserService } from './../../shared/user.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styles: []
})
export class RegistrationComponent implements OnInit {

  constructor(public service: UserService, private toastr: ToastrService) { }

  ngOnInit() {
    this.service.formModel.reset();
  }

  onSubmit() {
    this.service.register().subscribe(
      (res: any) => {
        console.log('response',res)
        if (res.isActive) {
          this.service.formModel.reset();
          this.toastr.success('New user created!', 'Registration successful.');
        } else {
                this.toastr.error('Username is already taken','Registration failed.');

          // res.errors.forEach(element => {
          //   switch (element.code) {
          //     case 'DuplicateUserName':
          //       this.toastr.error('Username is already taken','Registration failed.');
          //       break;

          //     default:
          //     this.toastr.error(element.description,'Registration failed.');
          //       break;
          //   }
          // });
        }
      },
      err => {
        this.toastr.error('Username is already taken','Registration failed.');
      }
    );
  }

}
