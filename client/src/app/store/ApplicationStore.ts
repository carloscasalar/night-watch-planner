import { Store } from 'redux';
import { RootState, RootAction } from 'typesafe-actions';

export type ApplicationStore = Store<RootState, RootAction>;
