export interface IHttpResponse {
  statusCode: number;
  message: string;
  timestamp: string;
  path: string;
  data: Object;
}
