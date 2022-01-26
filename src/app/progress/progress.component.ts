import { Task } from 'src/app/models/Task';
import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.css']
})
export class ProgressComponent implements OnInit {
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
