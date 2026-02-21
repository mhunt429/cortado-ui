export interface BaseApiResponse<T> {
  statusCode: number;
  data: T;
  errors: string[];
}
