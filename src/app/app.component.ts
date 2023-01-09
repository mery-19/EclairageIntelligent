import { AfterViewInit, Component, OnInit } from '@angular/core';

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

hexToRgb = (h:any)=> {
  var r = parseInt(this.cutHex(h).substring(0, 2), 16),
    g = parseInt(this.cutHex(h).substring(2, 4), 16),
    b = parseInt(this.cutHex(h).substring(4, 6), 16);
  return "rgb(" + r + "," + g + "," + b + ")";
}

cutHex = (h:any)=> {
  return h.charAt(0) == "#" ? h.substring(1, 7) : h;
}

onInputChange =(e:any) =>{
  this.output.textContent = this.getLightnessOfRGB(this.hexToRgb(e.target.value)).toFixed(4);
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
