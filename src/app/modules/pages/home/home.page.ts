import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent, IonRouterOutlet, ModalController, NavController, Platform } from '@ionic/angular';
import { LoginComponent } from '../../components/login/login.component';
import { Router } from '@angular/router';
import { HomeService } from 'src/app/services/home.service';
import { ForgotComponent } from '../../components/forgot/forgot.component';
import { RegisterComponent } from '../../components/register/register.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  @ViewChild(IonContent, { static: false }) content: IonContent;

  isScrolled: boolean = false
  youtubeWidth: number = 600
  youtubeHeight: number = 315

  constructor(
    public modal: ModalController,
    public routerOutlet: IonRouterOutlet,
    private router: Router,
    private navCtrl: NavController,
    private homeService: HomeService,
    private platform: Platform
  ) { }

  ngOnInit() {
    this.platform.ready().then(() => {   
      if ( this.platform.width() <= 576 ){
        this.youtubeHeight = 212
        this.youtubeWidth = this.platform.width() - 40
      }
    })
    this.homeService.scrollToSection$.subscribe((section: string) => {   
        this.onScrollTo(section)
    })
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
    const offset = element.offsetTop - 50
    if (element) this.content.scrollToPoint(0, offset, 1200)
  }
  async onPopupRequest(form: string ){
    this.homeService.onPopupRequest( form )
  }
}
