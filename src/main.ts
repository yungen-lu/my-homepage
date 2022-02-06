import Hammer from "hammerjs";
import { KawaseBlurFilter } from "@pixi/filter-kawase-blur";
import { ColorPalette } from "./color";
import {
  Bodies,
  Composite,
  Engine,
  Events,
  IRunnerOptions,
  IEngineDefinition,
  Runner,
} from "matter-js";
import * as PIXI from "pixi.js";
import { Ball } from "./ball";
if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
  document.documentElement.classList.add("dark");
} else {
  document.documentElement.classList.remove("dark");
}

//
const GRAVITY_X_VALUE: number = 0;
const GRAVITY_Y_VALUE: number = 0;
const EDGE_OFFSET: number = 30;
interface STATE {
  clicked: boolean;
  ballCount: number;
  arrayOfBalls: Ball[];
}
const state: STATE = {
  clicked: false,
  ballCount: 0,
  arrayOfBalls: [],
};
const colorPalette = setupColor();
const { engine, runner } = setupPhysicsEngine();
const { renderer, stage } = setupPixi();

Events.on(runner, "afterUpdate", () => {
  for (const ball of state.arrayOfBalls) {
    ball.circleSprite.position.x = ball.body.position.x;
    ball.circleSprite.position.y = ball.body.position.y;
  }
  renderer.render(stage);
});
const toggleText = document.querySelector<HTMLSpanElement>("#title");
const toggleControl = new Hammer(toggleText);
const targetArea = document.querySelector<HTMLCanvasElement>("#target-area");
delete Hammer.defaults.cssProps.userSelect;
const targetControl = new Hammer(targetArea);
toggleControl.on("tap", () => {
  if (document.documentElement.classList.contains("dark")) {
    document.documentElement.classList.remove("dark");
  } else {
    document.documentElement.classList.add("dark");
  }
});
targetControl.on("tap", (event) => {
  if (state.clicked === false) {
    init();
    state.clicked = true;
  }
  let xPosition = event.center.x;
  let yPosition = event.center.y;
  let ball = new Ball(
    xPosition,
    yPosition,
    colorPalette.selectOneRandomColor()
  );
  ball.appendToWorld(engine.world);
  ball.buildGraph(renderer);
  state.arrayOfBalls.push(ball);
  stage.addChild(ball.circleSprite);
  ball.applyRandomForce();
});
function setupColor() {
  const colorPalette = new ColorPalette();
  document.documentElement.style.setProperty(
    "--starting-color",
    colorPalette.startingColor
  );
  document.documentElement.style.setProperty(
    "--middle-color",
    colorPalette.middleColor
  );
  document.documentElement.style.setProperty(
    "--ending-color",
    colorPalette.endingColor
  );
  document
    .querySelector("#title")
    .classList.add(colorPalette.gradientDirection);
  return colorPalette;
}
window.onresize = re;
function re() {
  renderer.resize(window.innerWidth, window.innerHeight);
}
function setupPhysicsEngine() {
  let runnerOpts: IRunnerOptions = {
    enabled: false,
  };
  let engineOpts: IEngineDefinition = {
    gravity: {
      x: GRAVITY_X_VALUE,
      y: GRAVITY_Y_VALUE,
    },
  };
  return {
    engine: Engine.create(engineOpts),
    runner: Runner.create(runnerOpts),
  };
}
function setupPixi() {
  const canvas = document.querySelector<HTMLCanvasElement>("#main-canvas");
  if (canvas === null) throw Error("can't select canvas element");
  const renderer = PIXI.autoDetectRenderer({
    view: canvas,
    width: window.innerWidth,
    height: window.innerHeight,
    backgroundAlpha: 0,
  });
  const stage = new PIXI.Container();
  stage.filters = [new KawaseBlurFilter(10, 20, true)];
  return { renderer, stage };
}
function init() {
  runner.enabled = true;
  Runner.start(runner, engine);
  setBorder();
}
function setBorder() {
  const edgeOffset: number = EDGE_OFFSET;
  let ground = Bodies.rectangle(
    window.innerWidth / 2,
    window.innerHeight + edgeOffset,
    window.innerWidth,
    1,
    { isStatic: true, restitution: 1 }
  );
  let leftWall = Bodies.rectangle(
    0 - edgeOffset,
    window.innerHeight / 2,
    1,
    window.innerHeight,
    { isStatic: true, restitution: 1 }
  );
  let rightWall = Bodies.rectangle(
    window.innerWidth + edgeOffset,
    window.innerHeight / 2,
    1,
    window.innerHeight,
    { isStatic: true, restitution: 1 }
  );
  let celling = Bodies.rectangle(
    window.innerWidth / 2,
    0 - edgeOffset,
    window.innerWidth,
    1,
    { isStatic: true, restitution: 1 }
  );
  Composite.add(engine.world, [ground, leftWall, rightWall, celling]);
}
