import { RefreshService } from './../../service/refresh.service';
import { Itodo } from './../../model/itodo';
import { Router } from '@angular/router';
import { Iuser } from './../../model/iuser';
import { ApiServiceService } from 'src/app/service/api-service.service';
import { Component, OnInit } from '@angular/core';
import { UserSharingServiceService } from 'src/app/service/user-sharing-service.service';
import { pipe, Observable } from 'rxjs';
import { User } from 'src/app/model/user';
import { Todo } from 'src/app/model/todo';
import { dashCaseToCamelCase } from '@angular/compiler/src/util';
import { filter, finalize, map, shareReplay, switchMap } from "rxjs/operators"; 
import { CustomTodo } from 'src/app/model/custom-todo';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {

  loggedUser!: Iuser;
  logged: boolean = false;
  showForm: boolean = false;
  showEditForm: boolean = false;
  todoId: number;
 
  highPriorityTodos$: Observable<Todo[]>;
  mediumPriorityTodos$: Observable<Todo[]>;
  lowPriorityTodos$: Observable<Todo[]>;

  todo: Itodo = new Itodo('', '', '');
  tempTodo: CustomTodo = new CustomTodo(null, '','','');

  constructor(
      private apiService: ApiServiceService,
      private userSharing: UserSharingServiceService,
      private router: Router,
      private refreshService: RefreshService
     ) { }

  ngOnInit(): void {
    this.userSharing.getUser().subscribe(
      data => { 
        this.loggedUser = data;
        this.logged = true;
      }

    );

    this.apiService.refreshNeeded$
      .subscribe(() => {
        this.displayTodos();
      });

    this.displayTodos();
  }


  displayTodos() {

    this.refreshService.loadingOn();

    let todos$ = this.refreshService.refresh
        .pipe(switchMap(_ => this.apiService.getAllUserTodos(this.loggedUser.id)),
        finalize(() => this.refreshService.loadingOff),
        shareReplay()
    );
        

    this.highPriorityTodos$ = todos$
        .pipe(
          map(todos => todos.filter(todo => todo.priority == "HIGH")),
          shareReplay()
    );

    this.mediumPriorityTodos$ = todos$
        .pipe(
          map(todos => todos.filter(todo => todo.priority == "MEDIUM")),
          shareReplay()
    );

    this.lowPriorityTodos$ = todos$
        .pipe(
          map(todos => todos.filter(todo => todo.priority == "LOW")),
          shareReplay()
    );
  }

  displayForm() {
    if(this.showEditForm == false) {
      this.showForm = true;
    } else {
      this.showEditForm = false;
      this.showForm = true;
    }
  }

  showEdit(todoId: number) {
    this.showEditForm = true;
    this.todoId = todoId;

    if(this.showForm == false) {
      this.showEditForm = true;
    } else {
      this.showEditForm = true;
      this.showForm = false;
    }

    this.apiService.getTodoById(todoId)
      .subscribe(todo => {
        this.tempTodo = todo;
      });
  }

  closeAddForm() {
    this.showForm = false;
  }

  closeEditForm() {
    this.showEditForm = false;
  }

  onSubmit() {
    this.apiService.addTodo(this.todo, this.loggedUser.id, this.todo.priority)
        .subscribe();
        this.refreshService.refresh.next(false);

  }

  logOut() {
    this.router.navigate(['home']);
  }

  deleteTodo(todoName: string, todoId: number) {
    this.apiService.deleteTodo(todoName, todoId, this.loggedUser.id)
      .subscribe();
      this.refreshService.refresh.next(false);
  }

  onEditFormSubmit() {

     this.apiService.updateTodo(this.tempTodo)
      .subscribe(data => {
          this.showEditForm = false;
      }
    )
  }
}
