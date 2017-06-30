import { NgModule } from '@angular/core';
import { Login } from './login';

@NgModule({
  declarations: [
    Login,
  ],
 
  exports: [
    Login
  ]
})
export class LoginModule {}
