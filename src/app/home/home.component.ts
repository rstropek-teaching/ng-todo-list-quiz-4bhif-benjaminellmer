import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  ngOnInit() {

  }
  private baseURL: string = 'http://localhost:7000/api/';

  public people: Observable<IPerson[]>;
  public todos: Observable<IToDo[]>;
  public actualPerson: String = undefined;

  public description;
  public assignedTo;
  public created = false;

  constructor(private http: HttpClient) {
    this.people = http.get<IPerson[]>(this.baseURL + 'people');
    this.todos = http.get<IToDo[]>(this.baseURL + 'todos');
  }

  deleteEvent(id: number) {
    let url: string = this.baseURL + "todos/" + id;

    this.http.delete(url).subscribe();
  }

  createTodo(){
    let body = {
      "assignedTo": this.assignedTo,
      "description": this.description
    }
    this.http.post(this.baseURL + "todos",body).subscribe();

    this.description = "";
    this.assignedTo = "";

    this.created = true;
  }

}
interface IPerson {
  name: string;
}

interface IToDo {
  id: number,
  description: string,
  assignedTo: string
}