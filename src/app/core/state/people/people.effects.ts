import { Injectable } from '@angular/core';
import { catchError, exhaustMap, forkJoin, map, of } from 'rxjs';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { PeopleService } from '../../services/people/people.service';
import { PeopleAPIActions, PeoplePageActions } from "./actions";

@Injectable()
export class PeopleEffects {
    constructor(
        private readonly actions$: Actions,
        private readonly peopleService: PeopleService
    ) {
    }

    readonly loadPeopleByName$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(PeoplePageActions.searchPeopleByNameAction),
            exhaustMap(({name, listName}) => {
                return this.peopleService.getPeopleByName(name).pipe(
                    map((peoples) => PeopleAPIActions.peopleLoadedSuccess({people: peoples, listName: listName})),
                    catchError((error) => of(PeopleAPIActions.peopleLoadedFailure({error})))
                );
            })
        );
    });

    readonly loadSpecificPeople$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(PeoplePageActions.setPeopleData),
            exhaustMap(({selectedPeople, listName}) => {
                const fetchRemaining = {
                    film: !!selectedPeople.films.length ? this.peopleService.searchByLink(selectedPeople.films[0]) : of(null),
                    specie: !!selectedPeople.species.length ? this.peopleService.searchByLink(selectedPeople.species[0]) : of(null),
                    vehicle: !!selectedPeople.vehicles.length ? this.peopleService.searchByLink(selectedPeople.vehicles[0]) : of(null),
                    starship: !!selectedPeople.starships.length ? this.peopleService.searchByLink(selectedPeople.starships[0]) : of(null),
                    home: !!selectedPeople.homeworld.length ? this.peopleService.searchByLink(selectedPeople.homeworld) : of(null),
                };
                return forkJoin(fetchRemaining).pipe(map(data => PeopleAPIActions.individualLoadedSuccess({
                        selectedPeople: {...selectedPeople, ...data},
                        listName: listName
                    })),
                    catchError((error) => of(PeopleAPIActions.individualLoadedFailure({
                        selectedPeople: {...selectedPeople},
                        listName: listName
                    })))
                )
            })
        );
    });
}
