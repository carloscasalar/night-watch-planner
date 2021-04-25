export interface HttpRequest<RequestPayload = unknown> {
  method: 'GET' | 'POST';
  url: string;
  payload?: RequestPayload;
  headers?: Record<string, string>;
}
