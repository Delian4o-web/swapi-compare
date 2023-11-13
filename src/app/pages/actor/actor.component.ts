import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import { IPeople } from '../../core/models/people.interface';
import { MatGridListModule } from '@angular/material/grid-list';
import { Observable } from 'rxjs';
import { AppState } from '../../core/reducers/reducer';
import { Store, select } from '@ngrx/store';
import { getState, isWinner } from '../../core/state/people/people.selector';


@Component({
  selector: 'app-actor',
  standalone: true,
  imports: [CommonModule,MatCardModule, MatGridListModule],
  templateUrl: './actor.component.html',
  styleUrl: './actor.component.scss'
})
export class ActorComponent {
  @Input({required:true}) actor!:IPeople | null;
  @Input({required:true}) actorType!:string;

  constructor(private store:Store<AppState>){
    
  }

  checkWinner(name:string):Observable<boolean>{
    return this.store.select(isWinner({name:name, type:this.actorType}))
  }

}
