import { Component } from '@angular/core';
import {FormControl,FormGroup} from "@angular/forms"
import { HttpClient } from '@angular/common/http';
import { Validators } from '@angular/forms';
@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrl: './registration-form.component.css'
})
export class RegistrationFormComponent {

userArray:any=[];
userForm:FormGroup=new FormGroup({
  id:new FormControl(''),
  name:new FormControl('',[Validators.required,Validators.minLength(10)]),
  userName:new FormControl(''),
  email:new FormControl('')
})
constructor(private http: HttpClient){
this.getAllUser();
}

getAllUser(){
  this.http.get('https://jsonplaceholder.typicode.com/users').subscribe((res:any)=>
  {
  this.userArray=res;
  })
}
onEdit(id:number){
  this.http.get('https://jsonplaceholder.typicode.com/users'+ id).subscribe((res:any)=>
  {
    this.userForm=new FormGroup({
      id:new FormControl(res.id),
      name:new FormControl(res.name),
      userName:new FormControl(res.username),
      email:new FormControl(res.email)
    })
  })

}
//a
OnSaveUser(){
  debugger;
const obj=this.userForm.value;
this.http.post('https://jsonplaceholder.typicode.com/users',obj).subscribe((res:any)=>
  {
alert('user created');
console.log(obj);
  })
}

}
