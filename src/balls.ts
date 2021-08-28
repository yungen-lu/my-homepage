import { randomNumInRange } from "./util"
import { World, Bodies, Composite } from "matter-js"
import * as PIXI from "pixi.js"
export class Ball {
  render(this: Ball) {
    // this.graphics.x = this.body.position.x;
    // this.graphics.y = this.body.position.y;
    this.graphics.scale.set(this.scale);
    this.graphics.clear();
    this.graphics.beginFill(this.color);
    this.graphics.drawCircle(this.body.position.x, this.body.position.y, this.raduis);
    this.graphics.endFill();
  }
  addPyshics(world: World, posX: number, posY: number): void {
    const smallRaduis = this.raduis * 8 / 10
    this.body = Bodies.circle(posX, posY, smallRaduis);
    this.body.force.x = randomNumInRange(-0.5, 0.5);
    this.body.force.y = randomNumInRange(-0.5, 0.5);
    this.body.frictionAir = 0;
    this.body.restitution = 0.8;
    Composite.add(world, this.body)

  }
  destroy(world: World, pixiApp: PIXI.Application) {
    pixiApp.ticker.remove(this.render, this)
    World.remove(world, this.body);
    this.graphics.destroy();
    // pixiApp.ticker.destroy()

  }
  raduis: number;
  scale: number;
  graphics: PIXI.Graphics;
  inc: number;
  body: any;
  color: number;
  constructor(color: number) {
    this.color = color;
    this.raduis = randomNumInRange(window.innerHeight / 7, window.innerHeight / 4);
    this.scale = 1;
    this.inc = 0.002;
    this.graphics = new PIXI.Graphics();
    this.graphics.alpha = 1;
  }
}
