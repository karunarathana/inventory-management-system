import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { log } from 'console';
@Component({
  selector: 'app-welcome',
  imports: [CommonModule],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css'
})
export class WelcomeComponent {
  showWelcome  = false
  showdatanotfound = false;
  validLogin : boolean = false;
  constructor() {}
  ngOnInit(): void {
    if(this.validLogin){
       this.showWelcome = true;
    }else{
      this.showdatanotfound = true;
    }
    // console.log(localStorage.getItem('loggedUserName'));
    console.log('WelcomeComponent initialized');
  }
}
