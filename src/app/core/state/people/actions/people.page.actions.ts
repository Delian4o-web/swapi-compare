import { createAction, props } from '@ngrx/store';
import { IPeople } from '../../../models/people.interface';

export const searchCharacterByName = createAction(
    '[People Page] Search Character By Name'
    , props<{ characterName: string, listName: string }>());

export const loadCharacterDetails = createAction(
    '[People Page] Load Character Details'
    , props<{ character: IPeople, listName: string }>());

