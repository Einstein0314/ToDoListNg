import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Task } from 'src/app/models/Task';


@Component({
  selector: 'app-share-task',
  templateUrl: './share-task.component.html',
  styleUrls: ['./share-task.component.css']
})
export class ShareTaskComponent implements OnInit {

  //return a event object: any
  //specified it as Task object
  @Output() addEmitter = new EventEmitter<Task>();
  @Output() reoderEmitter = new EventEmitter<Task>();
  @Output() deleteEmitter = new EventEmitter<Task>();
  @Output() updateEmitter = new EventEmitter<Task>();
  //property name
  //exclaimation mark tell task must be valued
  //so first execute ngOnInit would not go wrong
  @Input('task') task!: Task;
  //or <Task>{} assign empty value to it
  isSubTask: boolean = true;

  constructor() { }

  //最一開始跑的 所以不能在這之前使用未宣告的變數
  ngOnInit(): void {
    if(this.task === undefined)
    {
      this.task = new Task();
      this.isSubTask = false;
    }
  }

  changeState(type: string)
  {
    switch(type)
    {
      case "title":
        this.task.isEdit = !this.task.isEdit;
        break;
      case "star":
        this.task.isStar = !this.task.isStar;
        this.reorder('star');
        break;
      case "pencil":
        this.task.isPencil = !this.task.isPencil;
        break;
    }
  }

  cancel()
  {
    this.task = new Task();
  }

  add()
  {
    //emit 'task' to parent cmoponent
    this.task.isPencil = false;
    this.task.isEdit = false;
    this.addEmitter.emit(this.task);
    this.task = new Task();
  }

  reorder(type: string)
  {
    if(this.isSubTask)
      this.reoderEmitter.emit(this.task);
  }

  save()
  {
    this.updateEmitter.emit(this.task);
  }

  del()
  {
    this.deleteEmitter.emit(this.task);
  }
}
