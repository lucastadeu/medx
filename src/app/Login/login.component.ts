import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  usuario: any = {
    login: 'Tadeu',
    pw: '123'
  }
    
  constructor() { }

  ngOnInit() {
  }

  onSubmit(form){
    console.log(form);
  }

  
  
}
