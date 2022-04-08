export type HttpMethod = 'GET' | 'POST';

export interface HttpRequest<RequestPayload = unknown> {
  method: HttpMethod;
  url: string;
  payload?: RequestPayload;
  headers?: Record<string, string>;
}
