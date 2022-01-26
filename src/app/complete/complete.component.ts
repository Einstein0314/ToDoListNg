import { Task } from 'src/app/models/Task';
import { FirebaseService } from './../services/firebase.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-complete',
  templateUrl: './complete.component.html',
  styleUrls: ['./complete.component.css']
})
export class CompleteComponent implements OnInit {
  datas: any[] = [];
  constructor(private _service: FirebaseService) {
    _service.getCollection<Task>('Task').then(tasks=>{
      this.datas = tasks;
    });
  }

  ngOnInit(): void {
  }

  del(task: Task | any)
  {
    //delete from firebase
    if(confirm('Do you want to delete this task?')){
      this._service.delDoc<Task>('Task', task);
      this.datas = this.datas.filter(x => x.id != task.id);
    }
  }

  update(task: Task | any)
  {
    //when press save or star, pencil, title
    this._service.updateDoc<Task>('Task', task);
  }
}
