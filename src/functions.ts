import { Ball } from "./balls"
import { Bodies, World, Body } from "matter-js"
import debounce from "debounce"
import { ColorPalette } from "./colors"
import * as PIXI from "pixi.js"

const colorPalette = new ColorPalette();
export function addRender(arrayOfBalls: Ball[], world: World, pixiApp: PIXI.Application, e: MouseEvent) {
  const ball = new Ball(colorPalette.randomColor());
  ball.addPyshics(world, e.clientX, e.clientY);
  pixiApp.stage.addChild(ball.graphics);
  arrayOfBalls.push(ball);
  console.log(ball)
  pixiApp.ticker.add(ball.render, ball);
  // pixiApp.ticker.add(() => {
  //   ball.render();
  // })
}
function renderWrapper(this: Ball) {
  this.render();
}
export function setBorder(world: World) {
  const E: number = 20;
  let ground = Bodies.rectangle(window.innerWidth / 2, window.innerHeight + E, window.innerWidth, 1, { isStatic: true, restitution: 1 });
  let leftWall = Bodies.rectangle(0 - E, window.innerHeight / 2, 1, window.innerHeight, { isStatic: true, restitution: 1 });
  let rightWall = Bodies.rectangle(window.innerWidth + E, window.innerHeight / 2, 1, window.innerHeight, { isStatic: true, restitution: 1 });
  let celling = Bodies.rectangle(window.innerWidth / 2, 0 - E, window.innerWidth, 1, { isStatic: true, restitution: 1 });
  World.add(world, [ground, leftWall, rightWall, celling]);
  window.addEventListener('resize', debounce(() => {
    Body.setPosition(ground, { x: window.innerWidth / 2, y: window.innerHeight + E });
    Body.setPosition(leftWall, { x: 0 - E, y: window.innerHeight / 2 });
    Body.setPosition(rightWall, { x: window.innerWidth + E, y: window.innerHeight / 2 });
    Body.setPosition(celling, { x: window.innerWidth / 2, y: 0 - E });
  }, 250))

}
export function checkBallCount(arrayOfBalls: Ball[], world: World, pixiApp: PIXI.Application) {
  const maxBallCount: number = 3;
  while (arrayOfBalls.length > maxBallCount) {
    console.log("maxed!");
    let removedBall = arrayOfBalls.shift();
    if (removedBall) {
      console.log("ball shifted")
      removedBall.destroy(world, pixiApp)
      // World.remove(world, removedBall.body);
      // removedBall.graphics.destroy();
      // pixiApp.ticker.remove(() => { removedBall!.render() })
      // pixiApp.ticker.destroy()
    }
  }
  console.log(arrayOfBalls.length)
}
