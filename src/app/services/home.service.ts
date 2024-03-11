import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, IonRouterOutlet, NavController, LoadingController } from '@ionic/angular';
import { Subject } from 'rxjs';
import { LoginComponent } from '../modules/components/login/login.component';
import { RegisterComponent } from '../modules/components/register/register.component';
import { ForgotComponent } from '../modules/components/forgot/forgot.component';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  private scrollToSectionSource = new Subject<string>();
  scrollToSection$ = this.scrollToSectionSource.asObservable();
  
  constructor(public modal: ModalController,
    private readonly loadingCtrl: LoadingController
    ) { }

  scrollToSection(section: string) {
    this.scrollToSectionSource.next(section);
  }

  async onPopupRequest(form: string ){
    const loading = await this.loadingCtrl.create()
    await loading.present()  
    const component = this._getFormComponent( form )   
    const popupModal = await this.modal.create({
      component: component,
      showBackdrop: true,
      cssClass: 'my-login-class',  
    })
    await popupModal.present()
    await loading.dismiss() 
    const { data, role } = await popupModal.onWillDismiss()
    if( data === undefined){}
    else{
      console.log(data)
      if( data.hasOwnProperty('redir') ){
        setTimeout(() => {
         this.onPopupRequest(data.redir);
        }, 300);
        }
    }
  }

  private _getFormComponent(form){
    let comp: any;
    switch (form) {
      case 'login':
        comp = LoginComponent
        break;
      case 'register':
        comp = RegisterComponent
        break;
      case 'forgot':
        comp = ForgotComponent
        break;
      default:
        return false
        break;
    }
    return comp
  }
}
