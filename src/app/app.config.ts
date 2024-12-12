import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import {AngularFireModule} from "@angular/fire/compat"
//import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {getFirestore, provideFirestore} from '@angular/fire/firestore'
import { provideFirebaseApp, getApp, initializeApp } from '@angular/fire/app';
import { provideHttpClient } from '@angular/common/http';
import { LoginPageComponent } from './login-page/login-page.component';
import { MainDisplayComponent } from './main-display/main-display.component';
// const firebaseConfig = {
//   apiKey: "AIzaSyBveq5t7kHdmoPfDvDiwMotfIALqaCDoEo",
//   authDomain: "budget-tracker-b4a7b.firebaseapp.com",
//   projectId: "budget-tracker-b4a7b",
//   storageBucket: "budget-tracker-b4a7b.appspot.com",
//   messagingSenderId: "366737850645",
//   appId: "1:366737850645:web:efc7ece776d143adeea91c",
//   measurementId: "G-3G5PXBJRD0"
// };
export const appConfig: ApplicationConfig = {
  providers: [

    // //provideZoneChangeDetection({ eventCoalescing: true }), 
     provideHttpClient(),
     provideRouter([
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: LoginPageComponent },
      { path: 'main', component: MainDisplayComponent }
    ]),
    // //provideRouter(routes), 
    // provideClientHydration(),
     provideAnimationsAsync(),
    // provideFirebaseApp(() => initializeApp(firebaseConfig)), 
    // provideFirestore(() => getFirestore())
 


]
};
