import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

export interface RequestOptions {
  headers?: HttpHeaders | Record<string, string | string[]>;
  params?:
    | HttpParams
    | Record<string, string | number | boolean | readonly (string | number | boolean)[]>;
  responseType?: 'json' | 'text' | 'blob';
}

@Injectable({
  providedIn: 'root',
})
export class HttpClientService {
  public static API_BASE = '/api';
  private http = inject(HttpClient);

  public get$ = <T>(url: string, queryParams?: object, options = {}) =>
    this.http.get<T>(
      `${HttpClientService.API_BASE}${url}${this.serializeQueryParams(queryParams)}`,
      { ...options, withCredentials: true }
    );

  public getWithResponse$ = <T = unknown>(url: string, queryParams?: object) =>
    this.http.get<T>(
      `${HttpClientService.API_BASE}${url}${this.serializeQueryParams(queryParams)}`,
      { observe: 'response' }
    );

  public post$ = <T, U>(url: string, requestBody: U, options = {}) =>
    this.http.post<T>(`${HttpClientService.API_BASE}${url}`, requestBody, {
      ...options,
      withCredentials: true,
    });

  public put$ = <T, U>(url: string, requestBody: U, options = {}) =>
    this.http.put<T>(`${HttpClientService.API_BASE}${url}`, requestBody, {
      ...options,
      withCredentials: true,
    });

  public patch$ = <T = unknown>(url: string, requestBody: unknown, options = {}) =>
    this.http.patch<T>(`${HttpClientService.API_BASE}${url}`, requestBody, {
      ...options,
      withCredentials: true,
    });

  public delete$ = <T>(url: string, queryParams?: object, options = {}) =>
    this.http.delete<T>(
      `${HttpClientService.API_BASE}${url}${this.serializeQueryParams(queryParams)}`,
      { ...options, withCredentials: true }
    );

  private serializeQueryParams = (params: object | undefined | null) => {
    if (!params) {
      return '';
    }
    const p = params as Record<string, unknown>;
    const validatedParams: Record<string, string> = {};
    Object.keys(p).forEach((key) => {
      if (p[key] !== undefined) {
        validatedParams[key] = String(p[key]);
      }
    });
    return `?${new URLSearchParams(validatedParams).toString().replace(/%2C/g, ',')}`;
  };
}
