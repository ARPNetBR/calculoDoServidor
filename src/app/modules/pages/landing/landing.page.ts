import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent, IonRouterOutlet, ModalController, NavController } from '@ionic/angular';
import { LoginComponent } from '../../components/login/login.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss'],
})
export class LandingPage implements OnInit {
  @ViewChild(IonContent, { static: false }) content: IonContent;

  isScrolled: boolean = false
  youtubeWidth: number = 600
  youtubeHeight: number = 315
  
  constructor(
    public modal: ModalController,
    public routerOutlet: IonRouterOutlet,
    private router: Router,
    private navCtrl: NavController
  ) { }

  ngOnInit() { }

  async onPopupRequest(form: string ){
    const component = this._getFormComponent( form )
   
    const modal = await this.modal.create({
      component: component,
      showBackdrop: true,
      cssClass: 'my-login-class',  
      presentingElement: this.routerOutlet.nativeEl,
    });

    await modal.present();
    const { data } = await modal.onWillDismiss();

    if( data === undefined){}
    else{
      if( data.hasOwnProperty('redir') ){
        setTimeout(() => {
         this.onPopupRequest(data.redir);
        }, 300);
        }
    }
    
  }

  onScroll(event: CustomEvent){
    this.isScrolled = false
    this.isScrolled =  event.detail.scrollTop > 0 ? true : false    
  }
  onScrollToTop(event: Event){
    event.preventDefault( )
    this.content.scrollToTop(1200);
  }
  onScrollTo(section: string) {
    const element = document.getElementById(section)
    if (element) this.content.scrollToPoint(0, element.offsetTop, 1200)
  }


  private _getFormComponent(form){
    let comp: any;
    switch (form) {
      case 'login':
        comp = LoginComponent
        break;
      // case 'register':
      //   comp = RegisterComponent
      //   break;
      // case 'forgot':
      //   comp = ForgotComponent
      //   break;
      default:
        return false
        break;
    }
    return comp
  }

}
