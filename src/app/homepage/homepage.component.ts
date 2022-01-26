import { Task } from 'src/app/models/Task';
import { FirebaseService } from './../services/firebase.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  //用sessionStorage存資料, 用來做畫面即時渲染(不能用share,因為import的data不能改)
  //之後再更新資料庫(async)
  //不好用
  datas: any[] = [];
  constructor(private _service: FirebaseService) {
    this._service.getCollection<Task>('Task').then(tasks => {
      this.datas = tasks;
      this.reorder({data: this.datas, type: 'star'});
      this.reorder({data: this.datas, type: 'finished'});
    });
  }

  ngOnInit(): void {

  }

  add(task: Task | any)
  {
    //create a new memory and a pointer to ponit to it
    this._service.addDoc<Task>('Task', task);
    const data: Task = Object.assign({}, task);
    this.datas.push(data);
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

  reorder(obj: any)
  {
    let tmp = obj.data;
    switch(obj.type)
    {
      case 'star':
        this.reorderByStar();
        break;
      case 'finished':
        this.reorderByfinish();
        break;
    }
  }
  reorderByStar()
  {
    //two pointers
    let i=this.datas.length-1, j=this.datas.length-1;
    while(i>=0 && i<=j)
    {
      if(!this.datas[i].isStar)
      {
        i--;
      }else
      {
        let tmp = this.datas[j];
        this.datas[j] = this.datas[i];
        this.datas[i] = tmp;
        j--;
        i--;
      }
    }
  }

  //有問題
  reorderByfinish()
  {
    //two pointers
    let i=0, j=0;
    while(i<=this.datas.length-1 && i>=j)
    {
      if(!this.datas[i].isFinished)
      {
        i++;
      }else
      {
        let tmp = this.datas[j];
        this.datas[j] = this.datas[i];
        this.datas[i] = tmp;
        j++;
        i++;
      }
    }
  }
}
