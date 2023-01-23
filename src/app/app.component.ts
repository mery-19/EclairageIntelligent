/*import { AfterViewInit, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  colorInput:any = document.getElementById("color");
  output:any = document.getElementById("output");

  ngAfterViewInit(): void {
    this.colorInput.addEventListener("input", this.onInputChange);
  }
  ngAfterViewInit(): void {
    this.colorInput.valueChanges.subscribe(this.onInputChange.bind(this));
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

onInputChange =(e:any) =>{
  console.log(this.colorInput.value);
  this.output.textContent = this.getLightnessOfRGB(this.hexToRgb(e.target.value)).toFixed(4);
  console.log("Onchange",this.output.textContent);
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

}
*/
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  {
  @ViewChild('color') colorInput: any;
  @ViewChild('output') output: any;
  dtTrigger: Subject<any> = new Subject();
  
  
 /* ngAfterViewInit(): void {
    this.colorInput.valueChanges.subscribe(this.onInputChange.bind(this));
  }
*/
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
    console.log("dsfghj")
    console.log(event.target.value)
    console.log(this.hexToRgb(event.target.value))
   
  }
 /* onInputChange =(event:any) =>{
    console.log("oui")
    console.log(event)
    console.log(this.colorInput.value);
    this.output.textContent = this.getLightnessOfRGB(this.hexToRgb(event.target.value)).toFixed(4);
    console.log("Onchange",this.output.textContent);
  }*/

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
  

}
