import { Bodies, Body, Composite, Vector, World } from "matter-js";
import { getCircleRadius, randomNumInRange } from "./helperfunc";
import * as PIXI from "pixi.js";
export class Ball {
  body: Body;
  color: number;
  raduis: number;
  circleSprite: PIXI.Sprite;
  constructor(xPosition: number, yPosition: number, color: number) {
    this.raduis = getCircleRadius();
    this.body = Bodies.circle(xPosition, yPosition, this.raduis, {
      restitution: 0.8, // bounce 80%
      frictionAir: 0.001, // default 0.1
    });
    this.color = color;
  }
  applyRandomForce() {
    const force: Vector = {
      x: randomNumInRange(-0.5, 0.5),
      y: randomNumInRange(-0.5, 0.5),
    };
    Body.applyForce(this.body, this.body.position, force);
  }
  appendToWorld(world: World) {
    Composite.add(world, this.body);
  }
  buildGraph(renderer: PIXI.Renderer | PIXI.AbstractRenderer) {
    let initCircle = new PIXI.Graphics()
      .beginFill(this.color)
      .drawCircle(this.body.position.x, this.body.position.y, this.raduis)
      .endFill();
    const generatedTexture = renderer.generateTexture(initCircle);
    const circleSprite = new PIXI.Sprite(generatedTexture);
    circleSprite.anchor.set(0.5);
    circleSprite.containsPoint;
    circleSprite.position.x = this.body.position.x;
    circleSprite.position.y = this.body.position.y;
    initCircle.destroy();
    this.circleSprite = circleSprite;
    // console.log(this.body.position.x, this.body.position.y, this.raduis);
  }
  destroy() {}
}
