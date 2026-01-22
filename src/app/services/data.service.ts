import { Injectable } from '@angular/core';
import { inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { ICharacter } from '../interface/ICharacters';
import { ICollection } from '../interface/ICollection';
@Injectable({
  providedIn: 'root'
})
export class DataService {
http = inject(HttpClient);


  getList(): Observable<ICharacter> {
    return this.http.get<ICharacter>(`${environment.apiUrl}/character`);
  }

  setLocalStorage(collection:ICollection[]){
    localStorage.setItem('@collection', JSON.stringify(collection));
  }

  getLocalStorage():ICollection[]{
    return JSON.parse(localStorage.getItem('@collection') || '[]');
  }
}
