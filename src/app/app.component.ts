import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {MatGridListModule} from '@angular/material/grid-list';
import { HeaderComponent } from './layout/header/header.component';
import { PeopleService } from './core/people/service/people.service';
import { HttpClientModule } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { AppState } from './core/reducers/reducer';
import { Observable } from 'rxjs';
import { IPeople } from './core/people/interfaces/people.interface';
import { isOpened } from './core/spinner/selector/spinner.selector';
import { hide, show } from './core/spinner/actions/spinner.actions';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule,HttpClientModule,MatProgressSpinnerModule, RouterOutlet, MatGridListModule, HeaderComponent],
  providers:[PeopleService],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isLoading$!:Observable<boolean>;

  title = 'starwars';
  peoples$!:Observable<IPeople[]>;
  constructor(private people:PeopleService,private store:Store<AppState>){

  }
  ngOnInit(): void {
    this.isLoading$ = this.store.select(isOpened);
  

  }

}
