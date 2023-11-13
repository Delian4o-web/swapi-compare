// @ts-nocheck
import { TestBed } from '@angular/core/testing';
import { Pipe, PipeTransform, Injectable, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Directive, Input } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { Component } from '@angular/core';
import { AppComponent } from './app.component';
import { PeopleService } from './core/services/people/people.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } 
    from '@angular/common/http/testing';
import { appReducer } from './core/reducers/reducer';
import { provideStore } from '@ngrx/store';
import { provideRouterStore } from '@ngrx/router-store';
import {provideStoreDevtools} from "@ngrx/store-devtools";
import { provideEffects } from '@ngrx/effects';
import { PeopleEffects } from './core/state/people/people.effects';
import { PeopleService } from './core/services/people/people.service';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';


@Injectable()
class MockPeopleService {}

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

describe('AppComponent', () => {
  let fixture;
  let component;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, ReactiveFormsModule,AppComponent ],
      declarations: [
    
        TranslatePipe, PhoneNumberPipe, SafeHtmlPipe,
        MyCustomDirective
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
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
    }).overrideComponent(AppComponent, {

      set: { providers: [{ provide: PeopleService, useClass: MockPeopleService }] }    
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
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
    component.store = component.store || {};
    spyOn(component.store, 'select');
    component.ngOnInit();
    // expect(component.store.select).toHaveBeenCalled();
  });

});
