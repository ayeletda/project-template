/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { MyProjectsComponent } from './my-projects.component'; 
import { ProjectForUpdateComponent } from '../.././projectForUpdate/projectForUpdate.component'; 


describe('MyProjectsComponent', () =>
{
  let component: MyProjectsComponent;
  let fixture: ComponentFixture<MyProjectsComponent>;

  beforeEach(async(() => 
  {
    TestBed.configureTestingModule(
    {
      declarations: [ MyProjectsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() =>
  {
    fixture = TestBed.createComponent(MyProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => 
  {
    expect(component).toBeTruthy();
  });  
});