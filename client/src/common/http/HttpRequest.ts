import { ajax } from 'rxjs/ajax';

export type HttpMethod = 'GET' | 'POST';

export interface HttpRequest<RequestPayload = unknown> {
  method: HttpMethod;
  url: string;
  payload?: RequestPayload;
  headers?: Record<string, string>;
}

export const ajaxMethods: Record<HttpMethod, keyof typeof ajax> = {
  GET: 'get',
  POST: 'post',
};
