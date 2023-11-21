import { Injectable } from '@angular/core';
import { catchError, forkJoin, map, of, switchMap } from 'rxjs';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { PeopleService } from '../../services/people/people.service';
import { PeopleAPIActions, PeoplePageActions } from "./actions";
import { IPeople } from "../../models/people.interface";

@Injectable()
export class PeopleEffects {
    constructor(
        private readonly actions$: Actions,
        private readonly peopleService: PeopleService
    ) {
    }

    searchCharacters = createEffect(() => {
        return this.actions$.pipe(
            ofType(PeoplePageActions.searchCharacterByName),
            switchMap(({characterName, listName}) => {
                return this.peopleService.getPeopleByName(characterName).pipe(
                    map((characters) => PeopleAPIActions.searchCharacterByNameSuccess({characters, listName})),
                    catchError((error) => of(PeopleAPIActions.searchCharacterByNameFailure({
                        characters: [],
                        listName: ''
                    })))
                );
            })
        );
    });

    loadCharacterDetails$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(PeoplePageActions.loadCharacterDetails),
            switchMap(({character, listName}) => {
                const fetchRemaining = {
                    film: !!character.films.length ? this.peopleService.searchByLink(character.films[0]) : of(null),
                    specie: !!character.species.length ? this.peopleService.searchByLink(character.species[0]) : of(null),
                    vehicle: !!character.vehicles.length ? this.peopleService.searchByLink(character.vehicles[0]) : of(null),
                    starship: !!character.starships.length ? this.peopleService.searchByLink(character.starships[0]) : of(null),
                    home: !!character.homeworld.length ? this.peopleService.searchByLink(character.homeworld) : of(null),
                };
                return forkJoin(fetchRemaining).pipe(map(data => PeopleAPIActions.loadCharacterDetailsSuccess({
                        characterDetails: {...character, ...data},
                        listName
                    })),
                    catchError((error) => of(PeopleAPIActions.loadCharacterDetailsFailure({
                        characterDetails: {} as IPeople,
                        listName: ''
                    })))
                )
            })
        );
    });
}
