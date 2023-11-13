import { createAction, props } from "@ngrx/store";
import { IPeople } from "../../../models/people.interface";

export const peopleLoadedSuccess = createAction(
    '[People API] People Loaded Successfully',
    props<{ people: IPeople[], listName:string }>()
);

export const peopleLoadedFailure = createAction(
    '[People API] Failed to Load People',
    props<{ error: Error }>()
);

export const individualLoadedSuccess = createAction(
    '[People API] Individual People Loaded Successfully',
    props<{ selectedPeople: IPeople, listName:string }>()
);


export const individualLoadedFailure = createAction(
    '[People API] Individual People Loaded Successfully',
    props<{ selectedPeople: IPeople, listName:string }>()
);
