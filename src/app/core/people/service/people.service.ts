import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, first, of, map, tap } from 'rxjs';
import { IPeople } from '../interfaces/people.interface';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PeopleService {

  constructor(private httpClient: HttpClient) { }

  getPeopleByName(name:string): Observable<IPeople[]>{
    return this.httpClient.get<IPeople[]>(environment.apiURL+`people/?search=${name}`).pipe(
      first(),
      map((data:any)=> data.results),
      catchError(()=> of([])));
  }

  getPeopleById(id:number): Observable<IPeople>{
    return this.httpClient.get<IPeople>(environment.apiURL+`people/${id}`).pipe(
      first(),
      map((data:IPeople)=> data),
      catchError(()=> of()));
  }

  searchByLink(link:string): Observable<any>{
    return this.httpClient.get<any>(link).pipe(catchError(err=>of(null)));
  }
}
