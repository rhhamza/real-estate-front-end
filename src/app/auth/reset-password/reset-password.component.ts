import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ResetPassword } from 'src/app/core/models/ResetPassword.model';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  constructor(private resetPasswordService: UserService) { }
  emailForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email])
  });

  ngOnInit(): void {
  }
  onSubmit() {
    if (this.emailForm.valid) {
      const email = this.emailForm.value.email;
      if (email) {
        this.resetPasswordService.resetPassword(email)
          .subscribe(
            response => {
              console.log('Password reset email sent!', response);
              // Add any success handling logic or navigate to a success page
            },
            error => {
              console.error('Error resetting password:', error);
              // Handle the error, display an error message, or navigate to an error page
            }
          );
      } else {
        console.error('Invalid email');
        // Handle the case when the email value is null or undefined
      }
    }
  }
  
  

}
