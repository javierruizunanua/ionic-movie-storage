import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class GamecrudService {

  constructor(private firestore: AngularFirestore) { }

  create_Game(record) {
    return this.firestore.collection('games').add(record);
  }
  
  read_Games() {
    return this.firestore.collection('games').snapshotChanges();
  }
  
  update_Game(recordID, record) {
    this.firestore.doc('games/' + recordID).update(record);
  }
  
  delete_Game(record_id) {
    this.firestore.doc('games/' + record_id).delete();
  }

  empty() {
    if(this.firestore.collection.length != 0) {
      return false;
    } else {
      return true;
    }
  }

}
