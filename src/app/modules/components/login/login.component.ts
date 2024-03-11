import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { LOGINMESSAGES } from '../../pages/landing/validations';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent  implements OnInit {

  // public section
  errorMessage: any = LOGINMESSAGES;
  formData: FormGroup;
  successMsg: string = '';
  errorMsg: string   = '';
  phoneNumber: string
  
  constructor(
    public modal: ModalController,
    private router: Router,   
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.formData = this.fb.group({
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    })
  }

  onPhoneChange(  ){ 
    this.phoneNumber = this.phoneNumber.replace(/\D/g,"")                
    this.phoneNumber = this.phoneNumber.replace(/^(\d\d)(\d)/g,"($1) $2")
    this.phoneNumber = this.phoneNumber.replace(/(\d{5})(\d)/,"$1-$2")   
  }
  async formSubmit(data: any){
  }
  goTo(page:string){ this.modalDismiss( {redir: page} ) }

  modalDismiss(data?: any){ this.modal.dismiss( data ) }

}
