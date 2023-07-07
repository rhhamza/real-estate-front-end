import { Component, OnInit } from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IUserEntity } from 'src/app/core/interfaces/user.interface';
import { UserService } from 'src/app/core/services/user.service';
import { CompanyService } from 'src/app/core/services/company-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
 
  constructor(config: NgbModalConfig, private modalService: NgbModal, private formBuilder: FormBuilder, public companyService: CompanyService,
    ) { 
      this.registerForm = this.formBuilder.group({
        company_name: ['', Validators.required],
        phone: ['', Validators.required],
        address: ['', Validators.required],
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
  
  const company: ICompany = {
    name: this.registerForm.get('company_name')?.value,
    phone: this.registerForm.get('phone')?.value,
    address: this.registerForm.get('address')?.value,
    email: this.registerForm.get('email')?.value,
    status: 'PENDING'
    
  }; 

  this.companyService.addCompany(company).subscribe(() => {    })
  
}

}
