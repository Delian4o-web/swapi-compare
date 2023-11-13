import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../layout/header/header.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSelectModule } from '@angular/material/select';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Observable, debounceTime, take } from 'rxjs';
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
export class HomeComponent implements OnInit {
actorA= new FormControl();
actorACtrl = new FormControl();
filteredAActors$ !: Observable<IPeople[]>;
actorOneDetail$ !: Observable<IPeople>;
actorOneName = 'People A';

actorB= new FormControl();
actorBCtrl = new FormControl();
filteredBActors$ !: Observable<IPeople[]>;
actorTwoDetail$ !: Observable<IPeople>;
actorTwoName = 'People B';

constructor(private store: Store<AppState>){

}

ngOnInit(): void {
  this.actorACtrl.valueChanges.pipe(debounceTime(500)).subscribe(data=>{
    if(!data) return;
    this.store.dispatch(searchPeopleByNameAction({name:data, listName:'actorOneList'}));
    this.filteredAActors$= this.store.select(selectFirstCharacterList);
    this.actorOneDetail$ = this.store.select(selectFirstCharacter);
  })

  this.actorBCtrl.valueChanges.pipe(debounceTime(500)).subscribe(data=>{
    if(!data) return;
    this.store.dispatch(searchPeopleByNameAction({name:data, listName:'actorTwoList'}));
    this.filteredBActors$= this.store.select(selectSecondCharacterList);
    this.actorTwoDetail$ = this.store.select(selectSecondCharacter);
  })
}

setPerson(actor:IPeople,listName:string){
  this.store.dispatch(setPeopleData({selectedPeople:actor, listName:listName}))
}
}
