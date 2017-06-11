
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { AfterViewChecked, ElementRef, ViewChild, Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2/database';
import { ChangeDetectorRef } from "@angular/core";
import { ServiceService } from '../../service.service';

@Component(
    {
        selector: 'app-board',
        templateUrl: './board.component.html',
        styleUrls: ['./board.component.css']
    })

export class BoardComponent implements OnInit
{
    @ViewChild('scrollMe') private myScrollContainer: ElementRef;

    // variables
    private userId: string;
    private userCommunity: string;
    private name: string;
    private email: string;

    private currentProject: any;
    private projectPath: any;
    private projectSelected:boolean;
    private cost: number;
    private date: Date;
    private purpose: string;
    private description: string;

    private nominateProject: boolean;

    private try: boolean = false;
    private firstTimeOfScoller: boolean;

    private savedDate: string;
    private newMessage: string;
    private messages: FirebaseListObservable<any>;

    // pointers of object or list in firebase
    private user: FirebaseListObservable<any>; // pointer to user
    private projects: FirebaseListObservable<any>;
    private  projectsAssociatedCommunities_Arr: any;
    private  projectsValues_Arr: any;

//======================================================  constructor  ============================================================

    constructor (private router: Router, private service: ServiceService, public af: AngularFireDatabase)
    {
        this.userId = this.service.getCurrentID();
        this.user = this.af.list('users/' + this.userId); // the specific user
        this.name = this.service.getCurrentUser();
        this.email = this.service.getCurrentEmail();
        this.firstTimeOfScoller = true;
        this.nominateProject =false;

        this.user.subscribe((snapshots)=>
        {
            snapshots.forEach(snapshot =>
            {
                if (snapshot.$key == 'associatedCommunity')
                    this.userCommunity = snapshot.$value;
            });
        })

        this.projects = this.af.list('projects');

        this.projects.subscribe((snapshots)=>
        {
            this.projectsAssociatedCommunities_Arr = [];
            this.projectsValues_Arr = [];

            snapshots.forEach(snapshot =>
            {
                this.projectsAssociatedCommunities_Arr.push(this.af.list('projects/' + snapshot.$key + '/associatedCommunities'));
                this.projectsValues_Arr.push(snapshot);
            });
        })

        this.newMessage = '';
        this.savedDate='';
        this.currentProject = '';
        this.projectPath = '';
        this.projectSelected = false;
    }

//========================================================  ngOnInit  ============================================================

    ngOnInit()
    {
        this.scrollToBottom()
        this.service.setTitle("Submitted Projects");

        (<any>$("part1")).slick(
            {
                infinite: true,
                slidesToShow: 3,
                slidesToScroll: 3,
                arrows: false
            });
    }

//========================================================  saveProjectPath  =========================================================

    saveProjectPath(project, i)
    {
        this.projectPath = 'projects/' + this.projectsValues_Arr[i].$key + '/associatedCommunities/' + project.$key;
        return true;
    }

//======================================================  loadProjectDetails  =========================================================

    loadProjectDetails(project,i)
    {
        this.currentProject = project;
        this.messages = this.af.list('projects/' + this.projectsValues_Arr[i].$key + '/associatedCommunities/' + project.$key + '/messages');
        this.projectSelected = true;
        this.cost = project.cost;
        this.date = project.date;
        this.purpose = this.projectsValues_Arr[i].purpose;
        this.description = this.projectsValues_Arr[i].description;
    }
    chooseProject(project,i)
    {
       // this.projectsValues_Arr[i].associatedUser = this.userId;
       // project.projectUplodeDate = Date.now();
        this.nominateProject = true;
    }
    choosen(project,i)
    {
        this.nominateProject = false;
    }
//======================================================  isMe(email)  =========================================================
// helps to chanthis.usge the bubble's color

    isMe(email)
    {
        if (email == this.email)
            return true;
        return false;
    }

//======================================================  needToPrint  =========================================================
    // If need to print the date ahead

    needToPrint(date)
    {
        if (this.savedDate != date)
        {
            this.savedDate = date;
            //this.ref.detectChanges();

            return true;
        }
        //this.ref.detectChanges();
        return false;
    }

//=====================================================  sendMessage  =========================================================

    sendMessage()
    {
        if(!this.projectSelected)
            alert("You need to choose a project before leaving a message.")
        else if(this.newMessage!='' )
            this.messages.push({message: this.newMessage, name: this.name, email: this.email, date: new Date().toLocaleString()});

        this.newMessage = '';
    }

//======================================================   scrollToBottom  =========================================================

    scrollToBottom(): void
    {
        // if(this.firstTimeOfScoller == true)
        // {
        try
        {
            this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
        }
        catch(err) {}
        this.firstTimeOfScoller = false;
        //  }
        console.log("in scrollToBottom");

    }

    trackByFn(index, item)
    {
        this.scrollToBottom();
        console.log("in trackByFn");
    }
}


