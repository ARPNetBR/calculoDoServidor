import { Component, ViewChild } from '@angular/core';
import { IonContent } from '@ionic/angular';
import { HomeService } from './services/home.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  @ViewChild(IonContent, { static: false }) content: IonContent;
  
  public appPages = [
    { title: 'Planos', url: 'prices', icon: '' },
    { title: 'Funcionalidades', url: 'features', icon: ''},
    { title: 'Siga-nos', url: 'social-media', icon: '' },
    { title: 'Contato', url: 'contact', icon: '' },
    { title: 'Entre', url: 'login', icon: 'person' }    
  ];
  constructor(private homeService: HomeService) {}

  onScrollTo(section: string) {
    if (section === 'login') 
      this.homeService.onPopupRequest(section)
    else 
      this.homeService.scrollToSection(section)
  }
}
