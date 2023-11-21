import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { IPeople } from '../../core/models/people.interface';
import { MatGridListModule } from '@angular/material/grid-list';
import { Observable, take } from 'rxjs';
import { AppState } from '../../core/reducers/reducer';
import { Store } from '@ngrx/store';
import { isWinner } from '../../core/state/people/people.selector';


@Component({
  selector: 'app-actor',
  standalone: true,
  imports: [CommonModule,MatCardModule, MatGridListModule],
  templateUrl: './actor.component.html',
  styleUrl: './actor.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActorComponent {
  @Input({required:true}) character!:IPeople | null;

  constructor(private store:Store<AppState>){
  }

  checkWinner(propertyName:string): Observable<boolean>{
    return this.store.select(isWinner({propertyName, characterName:this.character?.name}));
  }

}
