import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { LOGINMESSAGES } from '../../pages/landing/validations';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent  implements OnInit {

 
  // public section
  errorMessage: any = LOGINMESSAGES;
  formData: FormGroup;
  successMsg: string = '';
  errorMsg: string   = '';
  phoneNumber: string

  registerSuccess:boolean = false
  registerFailed:boolean = false
  email:string = ''
  mensagemErro:string = ''
  
  constructor(
    public modal: ModalController,
    private fb: FormBuilder,
    private authService:AuthenticationService
  ) { }

  ngOnInit() {
    this.formData = this.fb.group({
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      repeatPassword: ['', [Validators.required, Validators.minLength(6)]]
    }, { validator: this.passwordMatchValidator })   
  }

  onPhoneChange(  ){ 
    this.phoneNumber = this.phoneNumber.replace(/\D/g,"")                
    this.phoneNumber = this.phoneNumber.replace(/^(\d\d)(\d)/g,"($1) $2")
    this.phoneNumber = this.phoneNumber.replace(/(\d{5})(\d)/,"$1-$2")   
  }
  /**
   *
   *
   * @param {*} data
   */
  async formSubmit(data: any){
    const authentication = await this.authService.register( { email: data.email, password: data.password })
    if(!authentication.registred){
      this.registerFailed = true
      this.mensagemErro = 'Erro ao criar conta, tente novamente mais tarde!';
      if(authentication?.error.code == 'auth/email-already-in-use')
        this.mensagemErro = `O email ${data.email} já está em uso`;      
    }
    else{
      this.registerSuccess = true
      this.email = data.email      
    }
  }
  /**
   * modal creation on homeService
   *
   */
  goToLogin( ){ this.modalDismiss( {redir: 'login'} ) }
  /**
   *
   *
   * @param {*} [data]
   */
  modalDismiss(data?: any){ this.modal.dismiss( data ) }
  /**
   *
   *
   * @private
   * @param {FormGroup} g
   * @returns {*}  
   */
  private passwordMatchValidator(g: FormGroup){
    const password = g.get('password').value;
    const repeatPassword = g.get('repeatPassword').value;
    return password === repeatPassword ? null : { mismatch: true };
  }

}
