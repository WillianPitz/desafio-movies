import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IntervalResponse, MoviesByYearResponse, StudiosResponse, YarsWithMultipleWinners } from '../types';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  baseUrl = 'https://tools.texoit.com/backend-java/api/movies'

  constructor(private http: HttpClient) { }

  getYearsWithMultipleWinners(): Observable<YarsWithMultipleWinners> {
    return this.http.get<YarsWithMultipleWinners>(`${this.baseUrl}?projection=years-with-multiple-winners`);
  }

  getTopThreeStudiosWithWinners(): Observable<StudiosResponse> {
    return this.http.get<StudiosResponse>(`${this.baseUrl}?projection=studios-with-win-count`);
  }

  getProducersIntervalBetweenWins(): Observable<IntervalResponse> {
    return this.http.get<IntervalResponse>(`${this.baseUrl}?projection=max-min-win-interval-for-producers`);
  }

  getMoviesByYear(year: number): Observable<MoviesByYearResponse[]> {
    return this.http.get<MoviesByYearResponse[]>(`${this.baseUrl}?winner=true&year=${year}`);
  }

  getAllMovies(page: string, size: string, winner?: string, year?: string): Observable<MoviesByYearResponse[]> {
    return this.http.get<MoviesByYearResponse[]>(`${this.baseUrl}?page=${page}&size=${size}&winner=${winner}&year=${year}`);
  }
}
