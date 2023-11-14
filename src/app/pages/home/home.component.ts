import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../layout/header/header.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSelectModule } from '@angular/material/select';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Observable, debounceTime, take, Subject, takeUntil, filter } from 'rxjs';
import { AppState } from '../../core/reducers/reducer';
import { Store } from '@ngrx/store';
import { searchPeopleByNameAction, setPeopleData } from '../../core/state/people/actions/people.page.actions';
import {
  selectFirstCharacterList,
  selectFirstCharacter,
  selectSecondCharacter,
  selectSecondCharacterList
} from '../../core/state/people/people.selector';
import { IPeople } from '../../core/models/people.interface';
import { ActorComponent } from '../actor/actor.component';

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
export class HomeComponent implements OnInit, OnDestroy {
private _destroy = new Subject();

actorA= new FormControl();
actorACtrl = new FormControl();
firstCharacterList$ !: Observable<IPeople[]>;
firstCharacterDetails$ !: Observable<IPeople>;
actorOneName = 'Person A';

actorB= new FormControl();
actorBCtrl = new FormControl();
secondCharacterList$ !: Observable<IPeople[]>;
secondCharacterDetails$ !: Observable<IPeople>;
actorTwoName = 'Person B';

constructor(private store: Store<AppState>){

}

ngOnInit(): void {
  this.actorACtrl.valueChanges.pipe(debounceTime(500), takeUntil(this._destroy)).subscribe(data=>{
    if(!data) return;
    this.store.dispatch(searchPeopleByNameAction({name:data, listName:'actorOneList'}));
    this.firstCharacterList$= this.store.select(selectFirstCharacterList);
    this.firstCharacterDetails$ = this.store.select(selectFirstCharacter);
    this.store.select(selectFirstCharacter).pipe(takeUntil(this._destroy), filter(x => !!x)).subscribe((personObj: IPeople) => this.actorOneName = personObj.name);
  })

  this.actorBCtrl.valueChanges.pipe(debounceTime(500), takeUntil(this._destroy)).subscribe(data=>{
    if(!data) return;
    this.store.dispatch(searchPeopleByNameAction({name:data, listName:'actorTwoList'}));
    this.secondCharacterList$= this.store.select(selectSecondCharacterList);
    this.secondCharacterDetails$ = this.store.select(selectSecondCharacter);
    this.store.select(selectSecondCharacter).pipe(takeUntil(this._destroy), filter(x => !!x)).subscribe((personObj: IPeople) => this.actorTwoName = personObj.name);
  })
}

ngOnDestroy(): void {
    this._destroy.next('');
    this._destroy.complete();
}

setPerson(actor:IPeople,listName:string){
  this.store.dispatch(setPeopleData({selectedPeople:actor, listName:listName}))
}
}
