import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthResponseDto } from 'src/app/core/models/AuthResponseDto.model';
import { UserLogin } from 'src/app/core/models/login.model';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit,OnDestroy {  registerForm: FormGroup = new FormGroup({});
user: UserLogin = new UserLogin();
errorMessage: string = '';
submitted = false;
private subscription: Subscription = new Subscription();

constructor(
  private userService: UserService,
  private router: Router,
  private formBuilder: FormBuilder
) {
  this.registerForm = this.formBuilder.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });
}

ngOnInit(): void {}

ngOnDestroy(): void {
  this.subscription.unsubscribe();
}

get f() {
  return this.registerForm.controls;
}

onSubmit() {
  this.submitted = true;
  if (this.registerForm.invalid) {
    return;
  }
  const user: UserLogin = {
    email: this.registerForm.get('email')?.value,
    password: this.registerForm.get('password')?.value
  };
  this.subscription = this.userService.login(user).subscribe(
    (data: AuthResponseDto) => {
      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('userId', data.userid);  

      if ( data.userid == "14" ) {
        this.router.navigate(['/admin/offers'])
      } else {
        this.router.navigate([''])
      }
    },
    (error: any) => {
      // Login failed
      this.errorMessage = 'Invalid credentials';
    }
  );
}
}
