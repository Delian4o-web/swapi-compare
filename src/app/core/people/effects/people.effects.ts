import { Injectable } from '@angular/core';
import { catchError, exhaustMap, filter, forkJoin, map, mergeMap, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { individualLoadedFailure, individualLoadedSuccess, peopleLoadedFailure, peopleLoadedSuccess, searchPeopleByNameAction, setPeopleData } from '../actions/people.actions';
import { PeopleService } from '../service/people.service';
import { hide, show } from '../../spinner/actions/spinner.actions';



@Injectable()
export class PeopleEffects {
  readonly loadPeopleByName$ = createEffect(() => {
    
    return this.actions$.pipe(
      ofType(searchPeopleByNameAction),
      exhaustMap(({name,listName}) => {
        return this.peopleService.getPeopleByName(name).pipe(
          map((peoples) =>{
            this.store.dispatch(hide())
          return peopleLoadedSuccess({ people:peoples, listName:listName })
          }),
          catchError((error) =>{
            this.store.dispatch(hide())
          return of(peopleLoadedFailure({ error }))
          })
        );
      })
    );
  });


  readonly loadSpecificPeople$ = createEffect(() => {
 
    return this.actions$.pipe(
      ofType(setPeopleData),
      exhaustMap(({selectedPeople,listName}) => {
        const fetchRemaining = {
            film: !!selectedPeople.films.length ? this.peopleService.searchByLink(selectedPeople.films[0]):of(null),
            specie:!!selectedPeople.species.length ? this.peopleService.searchByLink(selectedPeople.species[0]):of(null),
            vehicle:!!selectedPeople.vehicles.length ? this.peopleService.searchByLink(selectedPeople.vehicles[0]):of(null),
            starship:!!selectedPeople.starships.length ? this.peopleService.searchByLink(selectedPeople.starships[0]):of(null),
            home:!!selectedPeople.homeworld.length ? this.peopleService.searchByLink(selectedPeople.homeworld):of(null),
        };
        return forkJoin(fetchRemaining).pipe(map(data=>{
            this.store.dispatch(hide());
            return individualLoadedSuccess({selectedPeople:{...selectedPeople,...data}, listName:listName})}),
        catchError((error) =>{
            this.store.dispatch(hide())
          return of(individualLoadedFailure({selectedPeople:{...selectedPeople}, listName:listName}))
          })
        )
      })
    );
  });




  constructor(
    private readonly actions$: Actions,
    private readonly store: Store,
    private readonly peopleService: PeopleService
  ) {}
}