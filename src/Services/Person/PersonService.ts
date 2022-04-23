import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { Person } from './Model';

@Injectable({
  providedIn: 'root',
})
export class PersonService {
  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  GetAll(): Observable<Person[]> {
    return this.http.get<Person[]>(
      `https://tekdi-challenges.appspot.com/api/People`
    );
  }

  Insert(Model: Person): Observable<Person> {
    return this.http.post<Person>(
      `https://tekdi-challenges.appspot.com/api/People`,
      Model
    );
  }

  Edit(Model: Person): Observable<Person> {
    return this.http.patch<Person>(
      `https://tekdi-challenges.appspot.com/api/People/`+Model.id,
      Model
    );
  }
}
