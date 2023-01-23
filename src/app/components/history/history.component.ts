import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import {map} from 'rxjs';
import { Eclairage } from 'src/app/models';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  private historyRef:AngularFireList<Eclairage>;
  private currentRef:AngularFireList<Eclairage>;
  public history?:Eclairage[];
  public current?:Eclairage|null;
  colorInput:any = document.getElementById("color");
  output:any = document.getElementById("output");
  displayTable: boolean = false;


  constructor(db: AngularFireDatabase) {this.historyRef=db.list<Eclairage>('/eclairage');
  this.currentRef=db.list<Eclairage>('/eclairage'); 

  }

  ngOnInit(){
    this.historyRef
    .snapshotChanges()
    .pipe(map((changes)=>changes.map((c)=>({...c.payload.val()}))))
    .subscribe((data)=>{
      this.history=data;
      this.current=data[data.length-1];
      console.log(this.history);
      this.displayTable = true;
      console.log(this.colorInput.value)
      console.log(this.output);
      console.log(this.calculateDiff(new Date('2023-01-05'), new Date('2023-01-06')));

    });

  }
 
  
 calculateDiff(date1:any, date2:any){
    date1= new Date(date1);
    date2= new Date(date2);
    return Math.floor((Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate()) - Date.UTC(date1.getFullYear(), date1.getMonth(), date1.getDate()) ) /(1000 * 60 * 60 * 24));
}

}
