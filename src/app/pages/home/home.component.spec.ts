// @ts-nocheck
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Pipe, PipeTransform, Injectable, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Directive, Input, Output } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Observable, of as observableOf, throwError } from 'rxjs';

import { Component } from '@angular/core';
import { HomeComponent } from './home.component';
import { Store } from '@ngrx/store';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } 
    from '@angular/common/http/testing';
import { appReducer } from '../../core/reducers/reducer';
import { provideStore } from '@ngrx/store';
import { provideRouterStore } from '@ngrx/router-store';
import {provideStoreDevtools} from "@ngrx/store-devtools";
import { provideEffects } from '@ngrx/effects';
import { PeopleEffects } from '../../core/state/people/people.effects';
import { PeopleService } from '../../core/services/people/people.service';
import { provideRouter } from '@angular/router';
import { routes } from '../../app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';


@Directive({ selector: '[myCustom]' })
class MyCustomDirective {
  @Input() myCustom;
}

@Pipe({name: 'translate'})
class TranslatePipe implements PipeTransform {
  transform(value) { return value; }
}

@Pipe({name: 'phoneNumber'})
class PhoneNumberPipe implements PipeTransform {
  transform(value) { return value; }
}

@Pipe({name: 'safeHtml'})
class SafeHtmlPipe implements PipeTransform {
  transform(value) { return value; }
}

describe('HomeComponent', () => {
  let fixture;
  let component;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, ReactiveFormsModule, HomeComponent ],
      declarations: [
        TranslatePipe, PhoneNumberPipe, SafeHtmlPipe,
        MyCustomDirective
      ],
      schemas: [  ],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        {provide: PeopleService, useClass: PeopleService},
        provideStore(appReducer),
        provideRouterStore(),
        provideStoreDevtools(),
        provideEffects([PeopleEffects]),
        provideRouter(routes), provideAnimations()
      ]
    }).overrideComponent(HomeComponent, {

    }).compileComponents();
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.debugElement.componentInstance;
  });

  afterEach(() => {
    component.ngOnDestroy = function() {};
    fixture.destroy();
  });

  it('should run #constructor()', async () => {
    expect(component).toBeTruthy();
  });

  it('should run #ngOnInit()', async () => {
    component.actorACtrl = component.actorACtrl || {};
    component.actorACtrl.valueChanges = observableOf({});
    component.store = component.store || {};
    spyOn(component.store, 'dispatch');
    spyOn(component.store, 'select');
    component.actorBCtrl = component.actorBCtrl || {};
    component.actorBCtrl.valueChanges = observableOf({});
    component.ngOnInit();
    expect(component.store.dispatch).toHaveBeenCalled();
    expect(component.store.select).toHaveBeenCalled();
  });

  it('should run #setPerson()', async () => {
    component.store = component.store || {};
    spyOn(component.store, 'dispatch');
    component.setPerson({}, {});
    expect(component.store.dispatch).toHaveBeenCalled();
  });

});
