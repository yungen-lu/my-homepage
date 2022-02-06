// import { defaultColors } from "./defaultcolors";
import * as PIXI from "pixi.js";
import colors from "tailwindcss/colors";
import { randomNumInRange } from "./helperfunc";
export class ColorPalette {
  startingColor: string;
  middleColor: string;
  endingColor: string;
  gradientDirection: string;
  arrayOfChosenColors: string[];
  arrayOfgradientDirection: string[] = [
    "bg-gradient-to-t",
    "bg-gradient-to-tr",
    "bg-gradient-to-r",
    "bg-gradient-to-br",
    "bg-gradient-to-b",
    "bg-gradient-to-bl",
    "bg-gradient-to-l",
    "bg-gradient-to-tl",
  ];
  arrayOfColors: string[] = [
    "red",
    "orange",
    "amber",
    "yellow",
    "lime",
    "green",
    "emerald",
    "teal",
    "cyan",
    "sky",
    "blue",
    "indigo",
    "violet",
    "purple",
    "fuchsia",
    "pink",
    "rose",
  ];

  constructor() {
    this.startingColor = this.generateRandomColorPalette();
    this.middleColor = this.generateRandomColorPalette();
    this.endingColor = this.generateRandomColorPalette();
    this.gradientDirection = this.selectRandomKey(
      this.arrayOfgradientDirection
    );
    this.arrayOfChosenColors = [
      this.startingColor,
      this.middleColor,
      this.endingColor,
    ];
  }
  selectOneRandomColor() {
    const chosenColor = this.selectRandomKey(this.arrayOfChosenColors);
    return PIXI.utils.string2hex(chosenColor);
  }
  selectRandomKey(arrayOfString: string[]) {
    const index: number = Math.floor(Math.random() * arrayOfString.length);
    const selected: string = arrayOfString[index];
    // arrayOfString.splice(index, 1);
    return selected;
  }
  generateRandomColorPalette() {
    const colorKey = this.selectRandomKey(this.arrayOfColors);
    const opacityKey = (Math.floor(randomNumInRange(2, 6)) * 100).toString();
    console.log(colorKey, opacityKey);
    return colors[colorKey][opacityKey];
  }
}
