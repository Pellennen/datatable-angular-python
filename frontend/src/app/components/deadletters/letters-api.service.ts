import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {catchError} from 'rxjs/operators';

import {API_URL} from '../../env';
import {Letter} from './letter.model'


@Injectable()
export class LettersApiService {

  constructor(private http: HttpClient) {
  }

  private static _handleError(err: HttpErrorResponse | any) {
    return Observable.throw(err.message || 'Error: Unable to complete request.');
  }

  // GET list of public, future events
  getLetterTables() {
    return this.http
      .get<Letter[]>(`${API_URL}/dead_letter`)
      .pipe(catchError(LettersApiService._handleError));
  }
  deleteLetter(deadletterId: number) {
    return this.http
      .delete(`${API_URL}/dead_letter/${deadletterId}`);
  }
}
