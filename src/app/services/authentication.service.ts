import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AngularFireAuth,  } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat/app';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  public  userCredential: firebase.auth.UserCredential;
  public  user: firebase.User;
 

  constructor(
    private angularFireAuth: AngularFireAuth,
    private loadingController: LoadingController,
    private afs: AngularFirestore,
    private router: Router
  ) { }

  async register(credentials: any, name?: string, addData?: string){
    const loading = await this._loading( );
    try {
      const userCredential = 
        await this.angularFireAuth.createUserWithEmailAndPassword(credentials.email, credentials.password)

      //if(addData !== undefined)
     // await userCredential.user.updateProfile({displayName: name, photoURL: addData})
      // if (additionalData !== undefined) {
      //   await this.afs.collection('users').doc(userCredential.user.uid).set({ ...additionalData });
      // }        
      await userCredential.user.sendEmailVerification();
      await loading.dismiss();
      return { registred: true, error: null }
    } catch (err) {
      await loading.dismiss();
      return { registred: false, error: err }
    }
  }

  /**
   *
   *
   * @private
   * @returns {*}  
   */
  private async _loading( ){
    const loading = await this.loadingController.create();
		await loading.present();
    return loading
  }
}
