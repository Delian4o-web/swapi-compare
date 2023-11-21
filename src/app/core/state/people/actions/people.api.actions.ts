import { createAction, props } from "@ngrx/store";
import { IPeople } from "../../../models/people.interface";

export const searchCharacterByNameSuccess = createAction(
    '[People API] Character Search Success',
    props<{ characters: IPeople[], listName:string }>()
);

export const searchCharacterByNameFailure = createAction(
    '[People API] Character Search Success',
    props<{ characters: IPeople[], listName:string }>()
);

export const loadCharacterDetailsFailure = createAction(
    '[People API] Load Character Details Unsuccessfully',
    props<{ characterDetails: IPeople, listName: string }>()
);

export const loadCharacterDetailsSuccess = createAction(
    '[People API] Load Character Details Success' ,
    props<{ characterDetails: IPeople, listName: string }>()
);
