import { StateType } from 'typesafe-actions';

declare module 'typesafe-actions' {
  export type Store = import('./ApplicationStore').ApplicationStore;
  export type RootAction = import('./ApplicationAction').ApplicationAction;
  export type RootState = StateType<
    ReturnType<typeof import('./rootStore').rootReducer>
  >;
  interface Types {
    RootAction: RootAction;
  }
}
