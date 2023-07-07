import { Component, OnInit } from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IUserEntity } from 'src/app/core/interfaces/user.interface';
import { UserService } from 'src/app/core/services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-company-register',
  templateUrl: './company-register.component.html',
  styleUrls: ['./company-register.component.scss'],
  providers: [NgbModalConfig, NgbModal],
})
export class CompanyRegisterComponent implements OnInit {
  registerForm: FormGroup = new FormGroup({});

  submitted = false;
 
  constructor(config: NgbModalConfig, private modalService: NgbModal, private formBuilder: FormBuilder, public userService: UserService,
    ) { 
      this.registerForm = this.formBuilder.group({
        first_name: ['', Validators.required],
        last_name: ['', Validators.required],
        email: ['', Validators.required],
        password: ['', Validators.required],
    });
    }

  ngOnInit(): void {
  }

  get f() { return this.registerForm.controls; }

  open(content: any) {
  this.modalService.open(content);
}

  onSubmit() {  
    this.submitted = true;
    if (this.registerForm.invalid) {      
        return;
    }
  
  const user: IUserEntity = {
    firstname: this.registerForm.get('first_name')?.value,
    lastname: this.registerForm.get('last_name')?.value,
    email: this.registerForm.get('email')?.value,
    password: this.registerForm.get('password')?.value,
    
  }; 
  this.userService.registerUser(user).subscribe(() => {    
  })
}

}
