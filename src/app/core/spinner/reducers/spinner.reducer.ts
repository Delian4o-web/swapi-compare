import { createReducer, on } from '@ngrx/store';
import {show, hide} from "../actions/spinner.actions";
export const spinnerFeatureKey = 'spinner';

export const initialSpinnerState = false;

export const spinnerReducer = createReducer(
  initialSpinnerState,
  on(show, (state) => true),
  on(hide, (state) => false),
);
