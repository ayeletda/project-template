import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { AfterViewChecked, ElementRef, ViewChild, Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2/database';
import { ChangeDetectorRef } from "@angular/core";
import { ServiceService } from '../../service.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  public UserName:string;
  public Community:string;
  public TenPartnersAccount:string;
  public Password:String;
  public GoogleAccount:String;
  public FacebookAccount:String;
  public TwitterAccount:String;
  public Permission:String;
  users: FirebaseListObservable<any>;

 // projects: FirebaseListObservable<any>;
 // projectsValues_Arr: any;
 // public messages: FirebaseListObservable<any>;


  constructor(private router: Router,private serviceService:ServiceService,public af: AngularFireDatabase) {
    this.UserName="";
    this.TenPartnersAccount="";
    this.Password="";
    this.GoogleAccount="";
    this.FacebookAccount="";
    this.TwitterAccount="";

    this.users = this.af.list('users');
    
    

  }

  ngOnInit() {
    this.serviceService.setTitle("Add user");
  }


  sendUser(){

    if(this.UserName!="")
    {
    this.users.update(this.UserName ,{mail: this.TenPartnersAccount ,Password:this.Password,
    facebook: this.FacebookAccount,google: this.GoogleAccount,twitter: this.TwitterAccount,associatedCommunity: this.Community ,permission: this.Permission});

    alert("user save");
    
    this.UserName="";
    this.Permission="";
    this.TenPartnersAccount="";
    this.Password="";
    this.FacebookAccount="";
    this.GoogleAccount="";
    this.TwitterAccount="";
    this.Community="";
  }
  
  alert("something's missing");


  }


  sendProject()
  {
/*    console.log("hrhr "+ this.Name + this.Description+this.Purpose);

    if(this.Name==""||this.Description==""||this.Purpose=="")
        alert("something's missing");

    else {
      this.projects.update(this.Name ,{name: this.Name, description: this.Description,purpose: this.Purpose,associatedCommunities: "NULL"});
      this.Name = '';
      this.Description="";
      this.Purpose="";
       alert("your project send!");
      }
*/
  }
}
