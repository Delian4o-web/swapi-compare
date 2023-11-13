import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../layout/header/header.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSelectModule } from '@angular/material/select';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { BehaviorSubject, Observable, debounce, debounceTime, tap } from 'rxjs';
import { AppState } from '../../core/reducers/reducer';
import { Store } from '@ngrx/store';
import { searchPeopleByNameAction, setPeopleData } from '../../core/people/actions/people.actions';
import { getSearchPeopleResultFirst, getSearchPeopleResultSecond, getSelectedPeopleA, getSelectedPeopleB } from '../../core/people/selector/people.selector';
import { IPeople } from '../../core/people/interfaces/people.interface';
import { ActorComponent } from '../actor/actor.component';
import { show } from '../../core/spinner/actions/spinner.actions';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HeaderComponent, MatGridListModule,
    MatSelectModule,
    NgxMatSelectSearchModule,
    ReactiveFormsModule,
    ActorComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
actorA= new FormControl();
actorACtrl = new FormControl();
filteredAActors$ !: Observable<IPeople[]>;
actorOneDetail$ !: Observable<IPeople>;

actorB= new FormControl();
actorBCtrl = new FormControl();
filteredBActors$ !: Observable<IPeople[]>;
actorTwoDetail$ !: Observable<IPeople>;

constructor(private store: Store<AppState>){
  
}

ngOnInit(): void {
  this.actorACtrl.valueChanges.pipe(debounceTime(500)).subscribe(data=>{
    if(!data) return;
    this.store.dispatch(show());
    this.store.dispatch(searchPeopleByNameAction({name:data, listName:'actorOneList'}));
    this.filteredAActors$= this.store.select(getSearchPeopleResultFirst);
    this.actorOneDetail$ = this.store.select(getSelectedPeopleA);
  })

  this.actorBCtrl.valueChanges.pipe(debounceTime(500)).subscribe(data=>{
    if(!data) return;
    this.store.dispatch(show())
    this.store.dispatch(searchPeopleByNameAction({name:data, listName:'actorTwoList'}));
    this.filteredBActors$= this.store.select(getSearchPeopleResultSecond);
    this.actorTwoDetail$ = this.store.select(getSelectedPeopleB);
  })
}

setPerson(actor:IPeople,listName:string){
  this.store.dispatch(show());
  this.store.dispatch(setPeopleData({selectedPeople:actor, listName:listName}))
}
}
