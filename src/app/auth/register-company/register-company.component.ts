import { Roles } from 'src/app/core/models/roles.model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IUserEntity } from 'src/app/core/interfaces/user.interface';
import { UserService } from 'src/app/core/services/user.service';
import { CompanyRegisterComponent } from '../company-register/company-register.component';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { StatusType, UserEntity } from 'src/app/core/models/user-entity.model';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-register-company',
  templateUrl: './register-company.component.html',
  styleUrls: ['./register-company.component.scss']
})
export class RegisterCompanyComponent implements OnInit {
  registerForm: FormGroup = new FormGroup({});
  
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    public userService: UserService,
    //private modalService: NgbModal,
    private notifier: NotifierService
  ) { 
    this.registerForm = this.formBuilder.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      
  });
  }

  ngOnInit() {    
    console.log("Register form initialized  ");
    }
  
  get f() { return this.registerForm.controls; }

  onSubmit() {  
    this.submitted = true;
    if (this.registerForm.invalid) {      
        return;
    }
  
  const user1: UserEntity = {
    firstname: this.registerForm.get('first_name')?.value,
    lastname: this.registerForm.get('last_name')?.value,
    email: this.registerForm.get('email')?.value,
    password: this.registerForm.get('password')?.value,
    status: StatusType.INACTIVE,
    roles: [{ ID: 1, name: 'company' }],
    publications: [],
    comments: [],
    reacts: [],
    reports: []
  };  
  this.userService.registerCompany(user1).subscribe(() => {  // 200
    this.submitted = false;
    this.registerForm.reset()
    this.notifier.notify(
      'success',
      'Registered Company with success'
    );
  }, err => { // 400 500 
    this.notifier.notify(
      'error',
      'Company Exists'
    );
  })
}
}

