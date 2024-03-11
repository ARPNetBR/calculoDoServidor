import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { LOGINMESSAGES } from '../../pages/landing/validations';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.scss'],
})
export class ForgotComponent  implements OnInit {

 
  // public section
  errorMessage: any = LOGINMESSAGES;
  formData: FormGroup;
  successMsg: string = '';
  errorMsg: string   = '';
  phoneNumber: string
  
  constructor(
    public modal: ModalController,
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.formData = this.fb.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ]))})
  }

  async formSubmit(data:any){}

  modalDismiss(data?: any): void { this.modal.dismiss( data ) }

  goToLogin(): void { this.modalDismiss({ redir: 'login'})}
}
