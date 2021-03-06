import {Router} from '@angular/router';
import * as firebase from 'firebase/app';
import {AngularFireAuth} from 'angularfire2/auth';
import {AfterViewChecked, ElementRef, ViewChild, Component, OnInit} from '@angular/core';
import {AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2/database';
import {ChangeDetectorRef, Input} from "@angular/core";
import {ServiceService} from '../../service.service';

@Component(
    {
        selector: 'app-board',
        templateUrl: './board.component.html',
        styleUrls: ['./board.component.css']
    })

//====================  Board class  ============================================================

export class BoardComponent implements OnInit 
{
    @Input() path;
    @ViewChild('scrollMe') myScrollContainer: ElementRef;

    //page's title
    title: string;

    //user's details
    user;

    //project's details
    currentProject: any;
    currentI: any;
    projectPath: any;
    cost: number;
    date: Date;
    purpose: string;
    description: string;

    savedDate: string;
    newMessage: string;
    projectUpdate: FirebaseObjectObservable<any>;

    //determined according to customer
    maxVotingNum: number;

    // pointers of object or list in firebase
    projects: FirebaseListObservable<any>;
    projectsAssociatedCommunities_Arr: any;
    projectsValues_Arr: any;
    needViewMore: boolean;
    usersVotingList: FirebaseListObservable<any>;
    pointerToProjectObjectInAF: FirebaseObjectObservable<any>;

    //flags
    doesNeedPop: boolean;
    noProjects: boolean;
    projectSelected: boolean;
    firstTimeOfScoller: boolean;
    incorrectValues: boolean;
    alert: boolean;

    //====================  constructor  ============================================================

    constructor(private router: Router, private service: ServiceService, private af: AngularFireDatabase) 
    {
        this.title = "Submitted Projects";

        //initializes with defult values
        this.newMessage = '';
        this.savedDate = '';
        this.currentProject = '';
        this.projectPath = '';
        this.projectSelected = false;
        this.firstTimeOfScoller = true;
        this.doesNeedPop = false;
        this.noProjects = true;
        this.maxVotingNum = 10;
        this.incorrectValues = false;
        this.alert = false;

        //function (in servic.component.ts) that returns a pointer to user object that listen to firebase and initializes the variabels: userId, userCommunity, name, email 
        this.user = this.service.getUser();

        //initialize arrays
        this.projects = this.af.list('projects');

        let temp2 = this.projects.subscribe((snapshots) => {
            this.projectsAssociatedCommunities_Arr = [];
            this.projectsValues_Arr = [];

            snapshots.forEach(snapshot => {
                this.projectsAssociatedCommunities_Arr.push(this.af.list('projects/' + snapshot.$key + '/associatedCommunities'));
                this.projectsValues_Arr.push(snapshot);
            });
        });

        //pushes subscribe to an array for freeing it (listener to firebase) when login-out
        this.service.allSubscribe.push(temp2);
    }

    //===================  ngOnInit  ============================================================

    ngOnInit() 
    {
    }

    //================  saveProjectPath  =========================================================

    saveProjectPath(project, i) 
    {
        this.projectPath = 'projects/' + this.projectsValues_Arr[i].$key + '/associatedCommunities/' + project.$key;
        this.noProjects = false;
        return true;
    }

    //===============  loadProjectDetails  =========================================================

    loadProjectDetails(project, i) 
    {
        this.currentProject = project;
        this.currentI = i;
        let projectPathH = 'projects/' + this.projectsValues_Arr[i].$key + '/associatedCommunities/' + project.$key;
        this.projectUpdate = this.af.object(projectPathH, {preserveSnapshot: true});
        this.projectSelected = true;

        this.cost = project.cost;
        this.date = project.date;
        this.purpose = this.projectsValues_Arr[i].purpose;
        this.description = this.projectsValues_Arr[i].description;
        this.needViewMore = false;
        this.usersVotingList = this.af.list('projects/' + this.projectsValues_Arr[i].$key + '/associatedCommunities/' + project.$key + "/votingList");
    }

    //==================  chooseProject  ============================================================

    chooseProject() 
    {
        this.doesNeedPop = true;
    }


    updateDetails(event) 
    {
        if (event.target.parentElement.checkValidity()) {
            event.target.parentElement.querySelectorAll('input:not([type="submit"]):valid').forEach(function (v) {
                v.style.border = '';
                v.nextElementSibling.nextElementSibling.textContent = '';
            });

            this.close();
            this.showAlert();
        } 
        else 
        {
            event.target.parentElement.querySelectorAll('input:not([type="submit"]):valid').forEach(function (v) {
                v.style.border = '';
                v.nextElementSibling.nextElementSibling.textContent = '';
            });

            event.target.parentElement.querySelectorAll(':invalid').forEach(function (v) {
                v.style.border = '1px solid red';
                v.nextElementSibling.nextElementSibling.textContent = v.dataset.msg;
            });
        }
    }

    submitIncorrectValues() {
        this.incorrectValues = false;
        this.showAlert();
    }


    showAlert() {

        this.alert = true;

    }

    submitAlert() {
        //updating project's details
        this.projectUpdate.update({'associatedUser': this.user.id});
        this.projectUpdate.update({'uploudDate': new Date().getTime()});
        this.projectUpdate.update({'date': this.date});
        this.projectUpdate.update({'cost': this.cost});
        this.projectUpdate.update({'for': '1'});
        this.projectUpdate.update({'avoid': this.maxVotingNum - 1});
        this.projectUpdate.update({'against': '0'});


        //updating voteStatus
        this.usersVotingList.update(this.user.id, {vote: "for"});

        this.projectSelected = false;

        this.close();
        this.closeAlert();
    }

    //===================== close  ============================================================

    close() {
        this.doesNeedPop = false;
        this.currentI = 1;
    }

    closeIncorrectValues() {
        this.incorrectValues = false;
        this.doesNeedPop = true;
    }

    closeAlert() {
        this.alert = false;


    }

    //===============   scrollToBottom  =========================================================

    scrollToBottom(): void {
        // if(this.firstTimeOfScoller == true)
        // {
        try {
            this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
        }
        catch (err) {
        }
        this.firstTimeOfScoller = false;
        //  }
        console.log("in scrollToBottom");

    }

    //===================   viewMore  =========================================================

    viewMore(bol) {
        this.needViewMore = bol;
    }
}


