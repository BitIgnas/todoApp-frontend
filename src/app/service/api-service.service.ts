import { shareReplay, tap } from 'rxjs/operators';
import { Itodo } from './../model/itodo';
import { User } from './../model/user';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Todo } from '../model/todo';
import { map, share } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

   refreshNeeded$ = new Subject<void>();

  getRefresh() {
    return this.refreshNeeded$;
  }

  constructor(private http: HttpClient) {

  }

  private baseUrl: String = "http://localhost:8080";

  public registerUser(user: User): Observable<User> {
      return this.http.post<User>(`${this.baseUrl}/api/user/`, user);
  }

  public loginUser(username: string, password: string): Observable<User> {
    let params = new HttpParams();

    params = params.append('username', username);
    params = params.append('password', password);

    return this.http.get<User>(`${this.baseUrl}/api/user/login`, { params: params });
  }

  public getAllUserTodos(userId: number | undefined): Observable<Todo[]> {
      return this.http.get<Todo[]>(`${this.baseUrl}/api/todo/user/${userId}`)
        .pipe(
          shareReplay()
        );
        
  }

  public addTodo(todo: Itodo, userId: number, priority: string): Observable<void> {
      return this.http.post<void>(`${this.baseUrl}/api/todo/${userId}/${priority}`, todo)
        .pipe(
          tap(() => {
            this.refreshNeeded$.next();
          })
      );
        
  }

  public deleteTodo(todoName: string, todoId: number, userId: number): Observable<void> {
    let params = new HttpParams();

    params = params.append('name', todoName);
    params = params.append('todoId', todoId);
    params = params.append('userId', userId);

    return this.http.delete<void>(`${this.baseUrl}/api/todo/delete`, { params: params})
      .pipe(
        tap(() => {
          this.refreshNeeded$.next();
        })
      );
  }

  public updateTodo(updateTodo: Todo): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/api/todo/`, updateTodo)
    .pipe(
      tap(() => {
        this.refreshNeeded$.next();
      })
    );
  }


  public getTodoById(todoId: number): Observable<Todo> {
    return this.http.get<Todo>(`${this.baseUrl}/api/todo/${todoId}`);
    
  }
}
  

