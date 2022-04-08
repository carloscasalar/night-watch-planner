import { createAsyncAction } from 'typesafe-actions';
import { HttpRequest } from '../../../common/http/HttpRequest';

interface CharacterDefinition {
  name: string;
  senses: string[];
  requiredSleepTime: number;
}

interface PlanRequestPayload {
  maxTotalTimeSpent: number;
  party: CharacterDefinition[];
}

interface ScoreDefinition {
  initScore: number;
  hardScore: number;
  mediumScore: number;
  softScore: number;
  feasible: boolean;
}

interface WatchDefinition {
  sleepingCharacters: string[];
  watchfulCharacters: string[];
  length: number;
}

export interface PlanResponsePayload {
  totalTime: number;
  score: ScoreDefinition;
  watches: WatchDefinition[];
}

interface ErrorPayload {
  message: string;
}

export const asyncFetchPlanActions = createAsyncAction(
  'PLAN/FETCH_REQUEST',
  'PLAN/FETCH_SUCCESS',
  'PLAN/FETCH_ERROR',
  'PLAN/FETCH_CANCEL',
)<HttpRequest<PlanRequestPayload>, PlanResponsePayload, ErrorPayload, string>();
