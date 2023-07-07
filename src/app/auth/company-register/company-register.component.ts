import { Component, OnInit } from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IUserEntity } from 'src/app/core/interfaces/user.interface';
import { UserService } from 'src/app/core/services/user.service';
import { CompanyService } from 'src/app/core/services/company-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotifierService } from 'angular-notifier';
import { Company } from 'src/app/core/models/company.model';
import {ICompany} from 'src/app/core/interfaces/company';
@Component({
  selector: 'app-company-register',
  templateUrl: './company-register.component.html',
  styleUrls: ['./company-register.component.scss'],
  providers: [NgbModalConfig, NgbModal],
})
export class CompanyRegisterComponent implements OnInit {
  registerForm: FormGroup = new FormGroup({});

  submitted = false;
 
  constructor(
    config: NgbModalConfig, 
    public modalService: NgbModal, 
    private formBuilder: FormBuilder, 
    public userService: UserService,
    private notifier: NotifierService,
    public companyService: CompanyService
    ) { 
      this.registerForm = this.formBuilder.group({
        name: ['', Validators.required],
        phone: ['', Validators.required],
        address: ['', Validators.required],
        email: ['', Validators.required],
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
  
  const company: ICompany = {
    id: '', // Provide a default or placeholder value
    name: this.registerForm.get('company_name')?.value,
    phone: this.registerForm.get('phone')?.value,
    address: this.registerForm.get('address')?.value,
    email: this.registerForm.get('email')?.value,
    logo: '', // Provide a default or placeholder value
    status: 'PENDING',
    description: '', // Provide a default or placeholder value
    createdAt: '', // Provide a default or placeholder value
    updatedAt: '', // Provide a default or placeholder value
    
  }; 
 

  this.companyService.addCompany(company).subscribe(() => {
    this.submitted = false;
    this.registerForm.reset()
    this.notifier.notify(
      'success',
      'Registered Company with success'
    );
      this.modalService.dismissAll()
    }, err => { // 400 500 
      this.notifier.notify(
        'error',
        'User Exists'
      );
    })
}

}
