import { Task } from 'src/app/models/Task';
import { Component } from '@angular/core';
import { FirebaseService } from './services/firebase.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ToDoListMobile';
  constructor(private _service: FirebaseService){
    //firebase's datas load in
    // _service.getCollection<Task>('Task').then(tasks=>{

    // });
  }
}
