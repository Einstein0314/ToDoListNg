export class Task{
  id: string = "";
  title: string = "Type Somthing Here...";
  date: string = "";
  time: string = "";
  file?: File;  //given optional. udefined or File
  comment: string = "";
  isFinished: boolean = false;
  isEdit: boolean = false;
  isStar: boolean = false;
  isPencil: boolean = false;
}
