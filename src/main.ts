import "../css/styles.css"
import { Engine, Runner } from "matter-js"
import { addRender, setBorder, checkBallCount } from "./functions";
import { Ball } from "./balls"
import * as PIXI from "pixi.js"
import { KawaseBlurFilter } from '@pixi/filter-kawase-blur';

// create engine

const engine = Engine.create();
engine.gravity.y = 0;
const world = engine.world;
// run engine
Runner.run(engine)
//
const arrayOfBalls: Ball[] = [];
const pixiApp = new PIXI.Application({
  view: document.querySelector<HTMLCanvasElement>('#ball-canvas')!,
  resizeTo: window,
  backgroundAlpha: 0
})
//
pixiApp.stage.filters = [new KawaseBlurFilter(30, 10, true)];

setBorder(world, pixiApp);
window.addEventListener('click', (e) => {
  checkBallCount(arrayOfBalls, world, pixiApp);
  addRender(arrayOfBalls, world, pixiApp, e)

})
window.addEventListener('touchstart', (e) => {
  checkBallCount(arrayOfBalls, world, pixiApp);
  addRender(arrayOfBalls, world, pixiApp, e)

})

