import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable, share, subscribeOn } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

interface IdConstraint
{
  id: string;
}

//without rxjs
//https://blog.logrocket.com/creating-a-crud-firebase-documents-in-angular/
@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  constructor(private db: AngularFirestore) { }

  //subscribe will wait until the async func be exacuted
  //async func
  async getCollection<T>(ref: string): Promise<T[]>
  {
    return new Promise<T[]>(resolve=>{
      let items: T[] = [];
      this.db.collection<T>(ref).get().subscribe(ss => {
        ss.docs.forEach(doc=>{
          items.push(doc.data());
        });
        //放在裡面 等subscribe成功
        resolve(items);
      });
    });
  }

  //泛型約束 -> 使泛型能夠用屬性和方法
  async addDoc<T extends IdConstraint>(collectionName: string, item: T)
  {
    //use uuidv4 manually define id
    item.id = uuidv4();
    //must insert an javascript object
    await this.db.collection(collectionName).doc(item.id).set(Object.assign({}, item));
  }

  async delDoc<T extends IdConstraint>(collectionName: string, item: T)
  {
    await this.db.collection(collectionName).doc(item.id).delete();
  }

  async updateDoc<T extends IdConstraint>(collectionName: string, item: T)
  {
    //直接覆蓋
    await this.db.collection(collectionName).doc(item.id).set(item);
  }
}
