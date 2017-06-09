import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {ServiceService} from '../../service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router,private serviceService:ServiceService) { 

    
  }

  ngOnInit() {this.serviceService.setTitle("Home");}
  
  addingUser(){
    this.router.navigateByUrl('/addUser');
  }


}

/*

What we do with Yonatan:
on SubmitProjectComponent.ts:

import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { AfterViewChecked, ElementRef, ViewChild, Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { ChangeDetectorRef } from "@angular/core";


@Component({
  selector: 'app-submit-project',
  templateUrl: './submit-project.component.html',
  styleUrls: ['./submit-project.component.css']
})
export class SubmitProjectComponent implements OnInit {
public projects: FirebaseListObservable<any>;
public newProject: string;
  constructor(private router: Router, public af: AngularFireDatabase)
   {
  this.projects = this.af.list('projects'); //= select * from projects 

    this.projects.push({game:{goal:'great'}}); //= select * from projects 
 this.projects.lift
    //this.newProject = '';
    }

  ngOnInit() {
  }

}





*/
