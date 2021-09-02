import hsl from "hsl-to-hex"
import * as PIXI from "pixi.js"
export class ColorPalette {
  hue: number;
  complimentaryHue1: number;
  complimentaryHue2: number;
  saturation: number;
  lightness: number;
  baseColor: string;
  complimentaryColor1: string;
  complimentaryColor2: string;
  colorChoices: string[];
  constructor() {
    this.setColors();
    this.setCustomProperties();
  }

  setColors() {
    // pick a random hue somewhere between 220 and 360
    this.hue = Math.floor(randomNumInRange(220, 360));
    this.complimentaryHue1 = this.hue + 30;
    this.complimentaryHue2 = this.hue + 60;
    // define a fixed saturation and lightness
    this.saturation = 95;
    this.lightness = 50;

    // define a base color
    this.baseColor = hsl(this.hue, this.saturation, this.lightness);
    // define a complimentary color, 30 degress away from the base
    this.complimentaryColor1 = hsl(
      this.complimentaryHue1,
      this.saturation,
      this.lightness
    );
    // define a second complimentary color, 60 degrees away from the base
    this.complimentaryColor2 = hsl(
      this.complimentaryHue2,
      this.saturation,
      this.lightness
    );

    // store the color choices in an array so that a random one can be picked later
    this.colorChoices = [
      this.baseColor,
      this.complimentaryColor1,
      this.complimentaryColor2,
    ];
  }

  randomColor(): number {
    // pick a random color
    // let test = Number(this.colorChoices[Math.floor(randomNumInRange(0, this.colorChoices.length))].replace(
    //   '#',
    //   '0x'
    // ));
    // console.log(test)
    // return test
    let randomNum = Math.floor(randomNumInRange(0, this.colorChoices.length))
    // console.log("randomNum", randomNum);
    let choosed = this.colorChoices[randomNum];
    // console.log("choosed", choosed, typeof (choosed))
    return PIXI.utils.string2hex(choosed)
  }

  setCustomProperties() {
    // set CSS custom properties so that the colors defined here can be used throughout the UI
    document.documentElement.style.setProperty('--hue', this.hue.toString());
    document.documentElement.style.setProperty(
      '--hue-complimentary1',
      this.complimentaryHue1.toString()
    );
    document.documentElement.style.setProperty(
      '--hue-complimentary2',
      this.complimentaryHue2.toString()
    );
  }
}
function randomNumInRange(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

