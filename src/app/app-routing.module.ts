import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [ 
  {
    path: 'landing',
    loadChildren: () => import('./modules/pages/landing/landing.module').then( m => m.LandingPageModule)
  },
  {
    path: '',
    loadChildren: () => import('./modules/pages/home/home.module').then( m => m.HomePageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
