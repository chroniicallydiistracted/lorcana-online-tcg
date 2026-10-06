import { Engine } from '@babylonjs/core/Engines/engine.js';
import type { AbstractEngine } from '@babylonjs/core/Engines/abstractEngine.js';
import { Scene } from '@babylonjs/core/scene.js';
import { ArcRotateCamera } from '@babylonjs/core/Cameras/arcRotateCamera.js';
import { HemisphericLight } from '@babylonjs/core/Lights/hemisphericLight.js';
import { Vector3 } from '@babylonjs/core/Maths/math.vector.js';
import { Color3, Color4 } from '@babylonjs/core/Maths/math.color.js';
import { MeshBuilder } from '@babylonjs/core/Meshes/meshBuilder.js';
import { StandardMaterial } from '@babylonjs/core/Materials/standardMaterial.js';

export interface RenderOptions {
  createEngine?: (canvas: HTMLCanvasElement) => AbstractEngine;
  observeResize?: (callback: () => void) => () => void;
}
export function mountSanityScene(canvas: HTMLCanvasElement, options: RenderOptions = {}) {
  const engine = (options.createEngine ?? (element => new Engine(element, true, { preserveDrawingBuffer: false, stencil: true })))(canvas);
  let scene: Scene | undefined;
  let unobserve = () => {};
  let disposed = false;
  let frames = 0;
  const render = () => { if (!disposed) { scene?.render(); frames++; } };
  const dispose = () => {
    if (disposed) return;
    disposed = true;
    unobserve();
    engine.stopRenderLoop(render);
    scene?.dispose();
    engine.dispose();
  };
  try {
    scene = new Scene(engine);
    scene.clearColor = new Color4(0.055, 0.08, 0.10, 1);
    new ArcRotateCamera('fixed-camera', -Math.PI / 2, 0.5, 10, Vector3.Zero(), scene);
    new HemisphericLight('soft-light', new Vector3(0, 1, 0), scene);
    const table = MeshBuilder.CreateGround('neutral-table', { width: 7, height: 4.5 }, scene);
    const tabletop = new StandardMaterial('table-material', scene);
    tabletop.diffuseColor = new Color3(0.12, 0.18, 0.19);
    table.material = tabletop;
    for (let i = 0; i < 3; i++) {
      const card = MeshBuilder.CreateBox(`synthetic-card-${i + 1}`, { width: 1.1, height: 0.035, depth: 1.6 }, scene);
      card.position.set((i - 1) * 1.5, 0.045, 0);
      const material = new StandardMaterial(`synthetic-material-${i + 1}`, scene);
      material.diffuseColor = new Color3(0.25 + i * 0.12, 0.42, 0.46);
      card.material = material;
    }
    unobserve = (options.observeResize ?? (callback => {
      const observer = new ResizeObserver(callback);
      observer.observe(canvas);
      return () => observer.disconnect();
    }))(() => { if (!disposed) engine.resize(); });
    engine.resize();
    engine.runRenderLoop(render);
    return { scene, dispose, get frames() { return frames; } };
  } catch (error) { dispose(); throw error; }
}
