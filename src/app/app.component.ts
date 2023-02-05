import { DatePipe } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Subject } from 'rxjs';
import { Eclairage } from './models';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [DatePipe]
})
export class AppComponent  {
  @ViewChild('color') colorInput: any;
  @ViewChild('output') output: any;
  dtTrigger: Subject<any> = new Subject();
  data:Eclairage= {};
  db;
  datePipe;
  global:any = null;
  // Mode 1 == manuelle TRUE
  // Mode 0 == Auto TRUE
  isManuelle = false;
  gobal = null;
  buttons = [
    {id:1,label: 'LED 1', selected: false},
    {id:2 ,label: 'LED 2', selected: false},
    {id:3 ,label: 'LED 3', selected: false}
  ];

  lastObject = null;
  

  constructor(db: AngularFireDatabase,datePipe: DatePipe){
    this.db = db;
    this.datePipe=datePipe;
     this.db.object('globalTest').valueChanges().subscribe(value=>{
      this.global = value;          
      
  });
}

  hexToRgb = (h:any)=> {
    var r = parseInt(this.cutHex(h).substring(0, 2), 16),
      g = parseInt(this.cutHex(h).substring(2, 4), 16),
      b = parseInt(this.cutHex(h).substring(4, 6), 16);
      console.log("rouge",r);
      console.log("vert",g);
      console.log("bleu",b);
    return "rgb(" + r + "," + g + "," + b + ")";
  }

  cutHex = (h:any)=> {
    return h.charAt(0) == "#" ? h.substring(1, 7) : h;
  }

  onInputChange(event: any){
    console.log(event.target.value)
    const str = this.hexToRgb(event.target.value);
    const numbers = str.match(/\d+/g);
   

    if(numbers != null){
      this.data.r = Number(numbers[0]);
      this.data.g =  Number(numbers[1]);
      this.data.b = Number(numbers[2]);
      this.data.date_allumage = this.datePipe.transform(new Date(), 'yyyy-MM-dd hh:mm:ss') as string;
      this.data.date_eteinte = "";        
    }else{
      console.error("numbers is null")
    }
   
    
    console.log(this.hexToRgb(event.target.value))
   
  }

  getLightnessOfRGB = (rgbString: any)=> {
    // First convert to an array of integers by removing the whitespace, taking the 3rd char to the 2nd last then splitting by ','
    const rgbIntArray = rgbString
      .replace(/ /g, "")
      .slice(4, -1)
      .split(",")
      .map((e:any) => parseInt(e));

    // Get the highest and lowest out of red green and blue
    const highest = Math.max(...rgbIntArray);
    const lowest = Math.min(...rgbIntArray);
    // Return the average divided by 255
    return (highest + lowest) / 2 / 255;
  }

  onManuelleClick = ()=>{
    this.isManuelle = true;
    this.reset()
    console.log("entre ici: ",this.isManuelle )
  }

  onAutoClick = () => {
    this.isManuelle = false;
    this.reset();

  }
  
  selectButton = (button: any) => {
    console.log("button selected: ", button);
    button.selected = !button.selected ;
   


  }

  onSendClick = () =>{
    // Send: les leds, la couleur
   
    this.data.led = this.getLeds()
    if(this.data.led != 0){
      if(this.isManuelle){// C'est auto
        this.data.mode = 1;
        this.data.date_allumage = this.datePipe.transform(new Date(), 'yyyy-MM-dd hh:mm:ss') as string;
        this.data.date_eteinte = "";
      }else{
        this.data.mode = 0;
        this.data.date_allumage = this.datePipe.transform(new Date(), 'yyyy-MM-dd hh:mm:ss') as string;
        this.data.date_eteinte = "";
      }
      // this.db.list('eclairage', ref => ref.orderByChild('date_allumage').equalTo(this.global.date_allumage))
      // .snapshotChanges().subscribe(objects => {
      //   const objectToUpdate = objects[0];
      //   console.log("debug objectToUpdate:", objectToUpdate);
      //   const res = this.db.object('/eclairage/' + objectToUpdate.key).set({ ...objectToUpdate, date_eteinte: this.datePipe.transform(new Date(), 'yyyy-MM-dd hh:mm:ss') as string });

      //   console.log("debug res: ", res)
      // });
      
      // Send new Data
      const itemRef = this.db.list('eclairage');
      itemRef.push(this.data);
      const itemRef1 = this.db.object('globalTest');
      itemRef1.set(this.data);
      
     // Update prev data

     this.db.list("/eclairage").snapshotChanges().subscribe(data => {
      let lastObject = data[data.length - 2];
      let lastObjectKey = lastObject.key;
      let payload:any = lastObject.payload.val();
      console.log("payload: ", payload);
      if(lastObjectKey!= null)
        this.db.list("eclairage").set(lastObjectKey, { ...payload, date_eteinte: this.datePipe.transform(new Date(), 'yyyy-MM-dd hh:mm:ss') as string });

    });

    

      // update last object
      console.log("data: ", this.data);
    } else {
      alert("Choisir minimum une led")
    }
    

  }

  reset = () => {
    this.buttons.forEach(btn => {
      btn.selected = false;
    });
  }

  getLeds = ()=> {
    let led = ""
    this.buttons.forEach(btn=>{
      if(btn.selected){
        led = led+btn.id;
      }
    })
    return led!=""? parseInt(led):0;
  }

  
}

