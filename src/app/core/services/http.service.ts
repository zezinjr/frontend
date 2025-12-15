import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse, HttpUserEvent} from "@angular/common/http";
import {catchError, from, Observable, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HttpService<T> {

  constructor(private http: HttpClient) {
  }

  public getAll(url: string): Observable<T[]> {
    return this.http.get(url).pipe(
        tap(response => response as HttpUserEvent<T[]>),
        catchError(() => from([]))
    );
  }

  public getBy(url: string): Observable<T> {
    return this.http.get(url).pipe(
        tap(response => response as unknown as HttpUserEvent<T>),
        catchError(() => from([]))
    );
  }
}
