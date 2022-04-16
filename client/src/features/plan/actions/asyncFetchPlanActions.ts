import { createAsyncAction } from 'typesafe-actions';
import { HttpRequest } from '../../../common/http/HttpRequest';
import { Character } from '../../character/schema';

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
  watchesSummary: WatchDefinition[];
}

interface ErrorPayload {
  message: string;
}

const toCharacterDefinition = ({
  id,
  requiredSleepTime,
}: Character): CharacterDefinition => ({
  name: id,
  requiredSleepTime,
  senses: ['Normal'],
});

export const asyncFetchPlanActions = createAsyncAction(
  'PLAN/FETCH_REQUEST',
  'PLAN/FETCH_SUCCESS',
  'PLAN/FETCH_ERROR',
  'PLAN/FETCH_CANCEL',
)<HttpRequest<PlanRequestPayload>, PlanResponsePayload, ErrorPayload, string>();

export const fetchPlanRequest = (
  maxTotalTimeSpent: number,
  party: Character[],
) =>
  asyncFetchPlanActions.request({
    url: 'http://localhost:3000/v1/optimize',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    payload: { party: party.map(toCharacterDefinition), maxTotalTimeSpent },
  });
