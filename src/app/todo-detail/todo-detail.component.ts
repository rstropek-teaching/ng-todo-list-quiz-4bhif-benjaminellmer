import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-todo-detail',
  templateUrl: './todo-detail.component.html',
  styleUrls: ['./todo-detail.component.css']
})
export class TodoDetailComponent implements OnInit {
  public todoID;
  public todo: IToDo;
  public updated = false;
  
  private baseURL: string = 'http://localhost:7000/api/';

  constructor(private http: HttpClient, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.todoID = this.route.snapshot.paramMap.get('id'); 
    this.http.get<IToDo>(this.baseURL + 'todos/' + this.todoID).subscribe(data => {
      this.todo = {
        id: data.id,
        assignedTo: data.assignedTo,
        description: data.description
      }
    });
  }

  update(){
    let body = {
      assignedTo: this.todo.assignedTo,
      description: this.todo.description
    }
    this.http.patch(this.baseURL + "todos/" + this.todoID, body).subscribe();
    this.updated = true;
  }

}
interface IToDo {
  id: number,
  description: string,
  assignedTo: string
}