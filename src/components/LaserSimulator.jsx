import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

/* ---------------------------------------------------------------
   Helper functions
   --------------------------------------------------------------- */

function brushed(size, c1, c2, c3, count) {
  const c = document.createElement('canvas');
  c.width = c.height = size;
  const x = c.getContext('2d');
  const g = x.createLinearGradient(0, 0, size, size);
  g.addColorStop(0, c1); g.addColorStop(0.5, c2); g.addColorStop(1, c3);
  x.fillStyle = g;
  x.fillRect(0, 0, size, size);
  let seed = 5;
  for (let i = 0; i < count; i++) {
    seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
    const yy = (seed >>> 8) % size;
    seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
    const xx = (seed >>> 8) % size;
    const len = 60 + ((seed >>> 3) % (size / 2));
    x.fillStyle = (i % 2) ? `rgba(255,255,255,${0.04 + (seed % 9) / 100})` : `rgba(10,18,34,${0.04 + (seed % 7) / 100})`;
    x.fillRect(xx, yy, len, 1);
  }
  return c;
}

function canvasTex(c, renderer, srgb) {
  const t = new THREE.CanvasTexture(c);
  if (srgb) t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = renderer.capabilities.getMaxAnisotropy();
  return t;
}

function hashBit(i, j) {
  let h = (Math.imul(i + 31, 374761393) + Math.imul(j + 17, 668265263)) >>> 0;
  h = Math.imul(h ^ (h >>> 13), 1274126177) >>> 0;
  return (h >>> 16) & 1;
}

function roundedRectShape(w, h, r) {
  const s = new THREE.Shape();
  const x = -w / 2, y = -h / 2;
  s.moveTo(x + r, y);
  s.lineTo(x + w - r, y);
  s.quadraticCurveTo(x + w, y, x + w, y + r);
  s.lineTo(x + w, y + h - r);
  s.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  s.lineTo(x + r, y + h);
  s.quadraticCurveTo(x, y + h, x, y + h - r);
  s.lineTo(x, y + r);
  s.quadraticCurveTo(x, y, x + r, y);
  return s;
}

function radialTexture() {
  const c = document.createElement('canvas');
  c.width = c.height = 128;
  const x = c.getContext('2d');
  const g = x.createRadialGradient(64, 64, 0, 64, 64, 64);
  g.addColorStop(0, 'rgba(255,255,255,1)');
  g.addColorStop(0.18, 'rgba(235,244,255,0.9)');
  g.addColorStop(0.45, 'rgba(120,175,255,0.32)');
  g.addColorStop(1, 'rgba(60,120,255,0)');
  x.fillStyle = g;
  x.fillRect(0, 0, 128, 128);
  return new THREE.CanvasTexture(c);
}

/* ---------------------------------------------------------------
   Clean 3D Laser Simulator
   --------------------------------------------------------------- */

export default function LaserSimulator() {
  const stageRef = useRef(null);
  const canvasRef = useRef(null);
  const [glFailed, setGlFailed] = useState(false);

  useEffect(() => {
    const stage = stageRef.current;
    const canvas = canvasRef.current;
    if (!stage || !canvas) return;

    const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    let mounted = true;
    let animId = null;

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance'
      });
    } catch {
      setGlFailed(true);
      return;
    }

    const DPR = Math.min(Math.max(window.devicePixelRatio || 1, 1.5), 2);
    renderer.setPixelRatio(DPR);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 300);

    function put(mesh, x, y, z, shadows) {
      mesh.position.set(x, y, z);
      mesh.castShadow = shadows !== false;
      mesh.receiveShadow = true;
      scene.add(mesh);
      return mesh;
    }
    function box(w, h, d, mat, x, y, z) { return put(new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat), x, y, z); }
    function rbox(w, h, d, r, mat, x, y, z) {
      if (w < 0.8 || h < 0.8 || d < 0.8) return box(w, h, d, mat, x, y, z);
      const bs = Math.min(0.14, r * 0.6, w / 4, h / 4, d / 4);
      const geo = new THREE.ExtrudeGeometry(
        roundedRectShape(w - 2 * bs, h - 2 * bs, Math.max(0.02, r - bs)),
        { depth: d - 2 * bs, bevelEnabled: true, bevelThickness: bs, bevelSize: bs, bevelSegments: 3, curveSegments: 6 }
      );
      geo.translate(0, 0, -(d - 2 * bs) / 2);
      return put(new THREE.Mesh(geo, mat), x, y, z);
    }
    function cyl(rt, rb, h, mat, x, y, z, seg) {
      return put(new THREE.Mesh(new THREE.CylinderGeometry(rt, rb, h, seg || 32), mat), x, y, z);
    }

    // Environment
    try {
      const envScene = new THREE.Scene();
      const ec = document.createElement('canvas'); ec.width = 512; ec.height = 256;
      const ex = ec.getContext('2d');
      const eg = ex.createLinearGradient(0, 0, 0, 256);
      eg.addColorStop(0, '#c9d6ea'); eg.addColorStop(0.45, '#6f7f99');
      eg.addColorStop(0.55, '#3a465b'); eg.addColorStop(1, '#1b2230');
      ex.fillStyle = eg; ex.fillRect(0, 0, 512, 256);
      const et = new THREE.CanvasTexture(ec);
      et.mapping = THREE.EquirectangularReflectionMapping;
      et.colorSpace = THREE.SRGBColorSpace;
      envScene.add(new THREE.Mesh(new THREE.SphereGeometry(60, 32, 16), new THREE.MeshBasicMaterial({ map: et, side: THREE.BackSide })));
      function strip(w, h, px, py, pz, power) {
        const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ side: THREE.DoubleSide }));
        m.material.color.setRGB(power, power, power * 1.05);
        m.position.set(px, py, pz); m.lookAt(0, 0, 0);
        envScene.add(m);
      }
      strip(46, 5, 0, 38, 14, 5); strip(46, 5, 0, 38, -10, 4);
      strip(10, 26, -42, 10, 6, 2.4); strip(10, 26, 42, 10, 8, 1.8);
      const pmrem = new THREE.PMREMGenerator(renderer);
      const rt = pmrem.fromScene(envScene, 0.015);
      pmrem.dispose();
      scene.environment = rt.texture;
    } catch { /* direct lights fallback */ }
    scene.fog = new THREE.Fog(0x131a27, 60, 150);

    // Lights
    scene.add(new THREE.HemisphereLight(0xdbe6ff, 0x1c2433, 0.35));
    const key = new THREE.SpotLight(0xffffff, 1.8, 0, Math.PI / 5, 0.65, 0);
    key.position.set(16, 40, 24); key.target.position.set(0, 2, 0);
    key.castShadow = true; key.shadow.mapSize.set(2048, 2048);
    key.shadow.camera.near = 10; key.shadow.camera.far = 90;
    key.shadow.bias = -0.0003; key.shadow.radius = 4;
    scene.add(key); scene.add(key.target);
    const rim = new THREE.DirectionalLight(0x78a8ff, 0.75); rim.position.set(-24, 14, -20); scene.add(rim);
    const fill = new THREE.DirectionalLight(0xffffff, 0.4); fill.position.set(-16, 10, 18); scene.add(fill);

    // Materials
    function paint(color) {
      return new THREE.MeshPhysicalMaterial({ color, roughness: 0.42, metalness: 0.0, clearcoat: 0.7, clearcoatRoughness: 0.28 });
    }
    const mPaint = paint(0xe6ebf2);
    const mPaintBlue = paint(0x1558c0);
    const mDark = new THREE.MeshStandardMaterial({ color: 0x1d222c, roughness: 0.5, metalness: 0.65 });
    const mBlack = new THREE.MeshStandardMaterial({ color: 0x0c0e13, roughness: 0.7, metalness: 0.2 });
    const mRubber = new THREE.MeshStandardMaterial({ color: 0x07080b, roughness: 0.95, metalness: 0.0 });
    const tableTex = canvasTex(brushed(512, '#b8c1ce', '#d6dce6', '#aab4c2', 1400), renderer, true);
    const mAlu = new THREE.MeshStandardMaterial({ map: tableTex, roughness: 0.38, metalness: 0.9 });
    const mSteelSide = new THREE.MeshStandardMaterial({ color: 0xc4ccd8, roughness: 0.3, metalness: 0.95 });
    const mSlot = new THREE.MeshStandardMaterial({ color: 0x1a2030, roughness: 0.6, metalness: 0.5 });
    const mLens = new THREE.MeshStandardMaterial({ color: 0x070b16, roughness: 0.05, metalness: 0.9, emissive: 0x2a6fe0, emissiveIntensity: 0.2 });
    const mRed = new THREE.MeshStandardMaterial({ color: 0xc4161c, roughness: 0.35, metalness: 0.1 });
    const mYellow = new THREE.MeshStandardMaterial({ color: 0xe3b81a, roughness: 0.5, metalness: 0.2 });

    // Workshop floor
    (function () {
      const c = document.createElement('canvas'); c.width = c.height = 512;
      const x = c.getContext('2d');
      x.fillStyle = '#59627a'; x.fillRect(0, 0, 512, 512);
      let seed = 3;
      for (let i = 0; i < 5000; i++) {
        seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
        const px = (seed >>> 8) % 512;
        seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
        const py = (seed >>> 8) % 512;
        x.fillStyle = (i % 2) ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.07)';
        x.fillRect(px, py, 2, 2);
      }
      x.globalCompositeOperation = 'destination-in';
      const g = x.createRadialGradient(256, 256, 40, 256, 256, 256);
      g.addColorStop(0, 'rgba(0,0,0,1)'); g.addColorStop(0.7, 'rgba(0,0,0,0.55)'); g.addColorStop(1, 'rgba(0,0,0,0)');
      x.fillStyle = g; x.fillRect(0, 0, 512, 512);
      const floor = new THREE.Mesh(new THREE.PlaneGeometry(150, 150),
        new THREE.MeshStandardMaterial({ map: canvasTex(c, renderer, true), transparent: true, roughness: 0.82, metalness: 0.05 }));
      floor.rotation.x = -Math.PI / 2; floor.position.y = -6.62; floor.receiveShadow = true;
      scene.add(floor);
    })();

    // Machine assembly
    rbox(24, 6, 26, 0.7, mPaint, 0, -3.6, -1);
    rbox(24.4, 0.5, 26.4, 0.2, mDark, 0, -6.35, -1);
    box(0.05, 5.6, 0.06, mBlack, -11.2, -3.6, 12.03).castShadow = false;
    box(0.05, 5.6, 0.06, mBlack, 11.2, -3.6, 12.03).castShadow = false;
    box(23.2, 0.05, 0.06, mBlack, 0, -1.1, 12.03).castShadow = false;
    for (let v = 0; v < 9; v++) { box(0.06, 3.6, 0.2, mBlack, 12.02, -3.6, 1.5 + v * 0.7).castShadow = false; }
    box(22, 0.6, 16, mAlu, 0, -0.3, 0);
    for (let s = -3; s <= 3; s++) { box(21.6, 0.03, 0.34, mSlot, 0, 0.012, s * 2.2).castShadow = false; }
    rbox(3.6, 15.6, 3.6, 0.5, mPaint, 0, 7.2, -11);
    rbox(2.6, 11.2, 0.3, 0.2, mBlack, 0, 7.4, -9.15);
    rbox(3.7, 1.9, 12.6, 0.45, mPaint, 0, 14.2, -4.8);
    rbox(3.2, 1.3, 5.2, 0.35, mPaintBlue, 0, 15.7, -6.8);
    for (let f = 0; f < 6; f++) { box(2.4, 0.04, 0.12, mBlack, 0, 16.0, -4.9 - f * 0.55).castShadow = false; }

    // Galvo head
    rbox(4.4, 3.4, 4.4, 0.6, mDark, 0, 11.7, 0);
    rbox(2.4, 0.7, 0.14, 0.1, mPaintBlue, 0, 11.9, 2.24);
    cyl(1.05, 1.05, 2.4, mDark, 0, 8.8, 0);
    const knurl = put(new THREE.Mesh(new THREE.TorusGeometry(1.06, 0.1, 10, 40), mAlu), 0, 9.7, 0);
    knurl.rotation.x = Math.PI / 2;
    const ring = put(new THREE.Mesh(new THREE.TorusGeometry(0.98, 0.07, 10, 40), mAlu), 0, 7.66, 0, false);
    ring.rotation.x = Math.PI / 2;
    cyl(0.86, 0.86, 0.06, mLens, 0, 7.6, 0, 40).castShadow = false;
    const fan = put(new THREE.Mesh(new THREE.TorusGeometry(0.95, 0.07, 8, 32), mAlu), 2.24, 11.7, 0, false);
    fan.rotation.y = Math.PI / 2;
    const fanFace = cyl(0.9, 0.9, 0.04, mBlack, 2.22, 11.7, 0, 32);
    fanFace.rotation.z = Math.PI / 2;
    const pointer = cyl(0.1, 0.1, 0.08,
      new THREE.MeshStandardMaterial({ color: 0x300000, emissive: 0xff1a1a, emissiveIntensity: 1.2 }),
      0, 10.4, 2.22, 16);
    pointer.rotation.x = Math.PI / 2; pointer.castShadow = false;
    const cable = new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3([
      new THREE.Vector3(0.5, 12.2, -2.2), new THREE.Vector3(0.5, 12.2, -3.5),
      new THREE.Vector3(0.3, 12.9, -4.6), new THREE.Vector3(0.3, 13.3, -5.6)
    ]), 24, 0.13, 8, false), mRubber);
    put(cable, 0, 0, 0);

    // Screen
    const scrCanvas = document.createElement('canvas'); scrCanvas.width = 256; scrCanvas.height = 160;
    const scrTex = new THREE.CanvasTexture(scrCanvas); scrTex.colorSpace = THREE.SRGBColorSpace;
    const screen = new THREE.Mesh(new THREE.PlaneGeometry(2.3, 1.44),
      new THREE.MeshStandardMaterial({ color: 0x000000, emissive: 0xffffff, emissiveMap: scrTex, emissiveIntensity: 0.95, roughness: 0.2 }));
    screen.position.set(0, 7.4, -8.98); scene.add(screen);
    rbox(2.5, 1.62, 0.12, 0.1, mBlack, 0, 7.4, -9.04);
    const eStopBase = cyl(0.5, 0.5, 0.12, mYellow, 0.8, 5.6, -8.98, 24); eStopBase.rotation.x = Math.PI / 2;
    const eStop = cyl(0.36, 0.4, 0.3, mRed, 0.8, 5.6, -8.84, 24); eStop.rotation.x = Math.PI / 2;
    const keySw = cyl(0.22, 0.22, 0.14, mDark, -0.8, 5.6, -8.96, 20); keySw.rotation.x = Math.PI / 2;

    // Fixtures
    [[-6.8, -2.2], [-6.8, 2.2], [6.8, -2.2], [6.8, 2.2]].forEach(p => {
      box(1.0, 0.42, 0.9, mDark, p[0], 0.21, p[1]);
      box(0.5, 0.12, 0.6, mDark, p[0] + (p[0] < 0 ? 0.5 : -0.5), 0.46, p[1]);
    });

    // Cabinet branding
    (function () {
      const c = document.createElement('canvas'); c.width = 1024; c.height = 128;
      const x = c.getContext('2d');
      x.fillStyle = '#1558c0'; x.fillRect(0, 0, 1024, 128);
      x.fillStyle = '#ffffff';
      x.font = '700 64px "Barlow Condensed", "Arial Narrow", Arial, sans-serif';
      x.textAlign = 'center'; x.textBaseline = 'middle';
      if ('letterSpacing' in x) x.letterSpacing = '6px';
      x.fillText('FINE IMPRESSIONS AND CUTS', 512, 68);
      const s = new THREE.Mesh(new THREE.PlaneGeometry(14, 1.75),
        new THREE.MeshPhysicalMaterial({ map: canvasTex(c, renderer, true), roughness: 0.4, metalness: 0.05, clearcoat: 0.5 }));
      s.position.set(0, -3.6, 12.04); scene.add(s);
    })();

    // Plates & progressive burning texture
    const W = 1024, H = 640, STEP = 5, PLATE_W = 12, PLATE_D = 7.5;
    const MARK_SPEED = 2800;

    function mk() { const c = document.createElement('canvas'); c.width = W; c.height = H; return c; }
    const baseCanvas = mk(), baseOrm = mk();
    const dispCanvas = mk(), dispOrm = mk();
    const engCanvas = mk(), engOrm = mk();
    const maskCanvas = mk();
    const dctx = dispCanvas.getContext('2d');
    const octx = dispOrm.getContext('2d');

    const plateTex = canvasTex(dispCanvas, renderer, true);
    const ormTex = canvasTex(dispOrm, renderer, false);
    const mTop = new THREE.MeshStandardMaterial({ map: plateTex, roughnessMap: ormTex, metalnessMap: ormTex, roughness: 1, metalness: 1 });
    const plate = new THREE.Mesh(new THREE.BoxGeometry(PLATE_W, 0.3, PLATE_D),
      [mSteelSide, mSteelSide, mTop, mSteelSide, mSteelSide, mSteelSide]);
    put(plate, 0, 0.15, 0);

    function paintBase() {
      const b = baseCanvas.getContext('2d');
      b.drawImage(brushed(1024, '#aeb7c4', '#dde3ec', '#a2acba', 3200), 0, 0, W, H);
      const o = baseOrm.getContext('2d');
      o.fillStyle = 'rgb(0,72,236)'; o.fillRect(0, 0, W, H);
      let seed = 21;
      for (let i = 0; i < 1800; i++) {
        seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
        const y = (seed >>> 8) % H;
        seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
        const x0 = (seed >>> 8) % W;
        o.fillStyle = `rgba(0,${60 + (seed % 50)},236,0.5)`;
        o.fillRect(x0, y, 60 + ((seed >>> 4) % 300), 1);
      }
    }

    function drawArt(ctx, fillColor) {
      ctx.fillStyle = fillColor;
      ctx.textAlign = 'left'; ctx.textBaseline = 'alphabetic';
      const disp = '"Barlow Condensed", "Arial Narrow", Arial, sans-serif';
      const mono = '"JetBrains Mono", ui-monospace, Menlo, Consolas, monospace';
      let size1 = 118;
      ctx.font = `700 ${size1}px ${disp}`;
      let w1 = ctx.measureText('FINE IMPRESSIONS').width;
      if (w1 > 880) { size1 = Math.floor(size1 * 880 / w1); ctx.font = `700 ${size1}px ${disp}`; }
      ctx.fillText('FINE IMPRESSIONS', 70, 190);
      ctx.font = `600 78px ${disp}`; ctx.fillText('AND CUTS', 70, 278);
      ctx.fillRect(70, 306, 880, 6);
      ctx.font = `500 32px ${mono}`; ctx.fillText('SN 000124', 70, 552);
      ctx.fillText('SS 304  120 x 75 MM', 70, 596);
      const n = 17, cell = 13, x0 = 730, y0 = 360;
      for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
          let on;
          if (i === 0 || j === n - 1) on = true;
          else if (j === 0) on = (i % 2 === 0);
          else if (i === n - 1) on = (j % 2 === 1);
          else on = hashBit(i, j) === 1;
          if (on) ctx.fillRect(x0 + i * cell, y0 + j * cell, cell, cell);
        }
      }
    }

    let segs = [];
    function buildJob() {
      const m = maskCanvas.getContext('2d');
      m.clearRect(0, 0, W, H); drawArt(m, '#ffffff');
      const e = engCanvas.getContext('2d');
      e.clearRect(0, 0, W, H);
      e.save(); e.translate(0, 1.2); drawArt(e, 'rgba(255,255,255,0.28)'); e.restore();
      drawArt(e, '#141926');
      const eo = engOrm.getContext('2d');
      eo.clearRect(0, 0, W, H); drawArt(eo, 'rgb(0,208,120)');
      const data = m.getImageData(0, 0, W, H).data;
      segs = [];
      const has = new Uint8Array(W);
      for (let by = 0; by < H; by += STEP) {
        has.fill(0); let any = false;
        for (let y = by; y < Math.min(by + STEP, H); y++) {
          for (let x = 0; x < W; x++) {
            if (data[(y * W + x) * 4 + 3] > 60) { has[x] = 1; any = true; }
          }
        }
        if (!any) continue;
        let start = -1, last = -1;
        for (let xx = 0; xx < W; xx++) {
          if (has[xx]) {
            if (start < 0) start = xx;
            else if (xx - last > 28) { segs.push({ y: by, x0: Math.max(0, start - 2), x1: Math.min(W, last + 3) }); start = xx; }
            last = xx;
          }
        }
        if (start >= 0) segs.push({ y: by, x0: Math.max(0, start - 2), x1: Math.min(W, last + 3) });
      }
    }

    function buildProps() {
      const fc = mk(), fo = mk();
      const a = fc.getContext('2d'), b = fo.getContext('2d');
      a.drawImage(baseCanvas, 0, 0); a.drawImage(engCanvas, 0, 0);
      b.drawImage(baseOrm, 0, 0); b.drawImage(engOrm, 0, 0);
      const ft = canvasTex(fc, renderer, true), fot = canvasTex(fo, renderer, false);
      const mFin = new THREE.MeshStandardMaterial({ map: ft, roughnessMap: fot, metalnessMap: fot, roughness: 1, metalness: 1 });
      [[16.2, 0.16, 2.6, 0.32], [16.5, 0.48, 2.4, 0.12]].forEach(p => {
        const m = new THREE.Mesh(new THREE.BoxGeometry(PLATE_W, 0.3, PLATE_D),
          [mSteelSide, mSteelSide, mFin, mSteelSide, mSteelSide, mSteelSide]);
        m.scale.set(0.55, 0.55, 0.55); m.rotation.y = p[3];
        put(m, p[0], -6.62 + p[1], p[2]);
      });
    }

    // Laser beam & particles
    const lensTip = new THREE.Vector3(0, 7.55, 0);
    const cylGeo = new THREE.CylinderGeometry(1, 1, 1, 8, 1, true);
    const beam = new THREE.Group();
    const core = new THREE.Mesh(cylGeo, new THREE.MeshBasicMaterial({ color: 0xcfe2ff, transparent: true, opacity: 0.32, depthWrite: false }));
    core.scale.set(0.012, 1, 0.012);
    const haze = new THREE.Mesh(cylGeo, new THREE.MeshBasicMaterial({ color: 0x6aa6ff, transparent: true, opacity: 0.08, blending: THREE.AdditiveBlending, depthWrite: false }));
    haze.scale.set(0.07, 1, 0.07);
    beam.add(core); beam.add(haze); beam.visible = false; scene.add(beam);

    const glowTex = radialTexture();
    const hitSprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: glowTex, blending: THREE.AdditiveBlending, transparent: true, depthWrite: false }));
    hitSprite.visible = false; scene.add(hitSprite);
    const hitLight = new THREE.PointLight(0x9cc4ff, 1.3, 7, 1);
    hitLight.visible = false; scene.add(hitLight);

    // Sparks
    const NS = 140;
    const sPos = new Float32Array(NS * 3), sVel = new Float32Array(NS * 3), sLife = new Float32Array(NS);
    for (let q = 0; q < NS; q++) sPos[q * 3 + 1] = -100;
    const sGeo = new THREE.BufferGeometry();
    sGeo.setAttribute('position', new THREE.BufferAttribute(sPos, 3));
    const sparks = new THREE.Points(sGeo, new THREE.PointsMaterial({
      size: 0.055, color: 0xffe9c8, transparent: true, opacity: 0.95, blending: THREE.AdditiveBlending, depthWrite: false
    }));
    sparks.frustumCulled = false; scene.add(sparks);
    let sNext = 0;
    function emitSpark(px, py, pz) {
      const i = sNext; sNext = (sNext + 1) % NS;
      sPos[i * 3] = px; sPos[i * 3 + 1] = py; sPos[i * 3 + 2] = pz;
      const a = Math.random() * Math.PI * 2, sp = 0.5 + Math.random() * 1.6;
      sVel[i * 3] = Math.cos(a) * sp;
      sVel[i * 3 + 1] = 1.6 + Math.random() * 2.8;
      sVel[i * 3 + 2] = Math.sin(a) * sp;
      sLife[i] = 0.18 + Math.random() * 0.3;
    }

    // Smoke
    const NM = 70;
    const mPos = new Float32Array(NM * 3), mVel = new Float32Array(NM * 3);
    const mAge = new Float32Array(NM), mSmLife = new Float32Array(NM);
    const mSize = new Float32Array(NM), mAlpha = new Float32Array(NM);
    for (let w = 0; w < NM; w++) { mPos[w * 3 + 1] = -100; mSmLife[w] = 0; }
    const mGeo = new THREE.BufferGeometry();
    mGeo.setAttribute('position', new THREE.BufferAttribute(mPos, 3));
    mGeo.setAttribute('aSize', new THREE.BufferAttribute(mSize, 1));
    mGeo.setAttribute('aAlpha', new THREE.BufferAttribute(mAlpha, 1));
    const smokeMat = new THREE.ShaderMaterial({
      uniforms: { uScale: { value: 600 } }, transparent: true, depthWrite: false,
      vertexShader: `attribute float aSize; attribute float aAlpha; varying float vAlpha; uniform float uScale;
        void main(){ vAlpha=aAlpha; vec4 mv=modelViewMatrix*vec4(position,1.0); gl_PointSize=aSize*uScale/(-mv.z); gl_Position=projectionMatrix*mv; }`,
      fragmentShader: `varying float vAlpha; void main(){ float d=length(gl_PointCoord-0.5); float a=smoothstep(0.5,0.0,d)*vAlpha; gl_FragColor=vec4(0.80,0.84,0.90,a); }`
    });
    const smoke = new THREE.Points(mGeo, smokeMat);
    smoke.frustumCulled = false; scene.add(smoke);
    let mNext = 0;
    function emitSmoke(px, py, pz) {
      const i = mNext; mNext = (mNext + 1) % NM;
      mPos[i * 3] = px + (Math.random() - 0.5) * 0.15; mPos[i * 3 + 1] = py; mPos[i * 3 + 2] = pz + (Math.random() - 0.5) * 0.15;
      mVel[i * 3] = (Math.random() - 0.5) * 0.25; mVel[i * 3 + 1] = 0.55 + Math.random() * 0.4; mVel[i * 3 + 2] = (Math.random() - 0.5) * 0.25;
      mAge[i] = 0; mSmLife[i] = 1.6 + Math.random() * 1.2;
    }

    function updateParticles(dt) {
      for (let i = 0; i < NS; i++) {
        if (sLife[i] > 0) {
          sLife[i] -= dt;
          if (sLife[i] <= 0) { sPos[i * 3 + 1] = -100; continue; }
          sVel[i * 3 + 1] -= 14 * dt;
          sPos[i * 3] += sVel[i * 3] * dt; sPos[i * 3 + 1] += sVel[i * 3 + 1] * dt; sPos[i * 3 + 2] += sVel[i * 3 + 2] * dt;
          if (sPos[i * 3 + 1] < 0.3) { sPos[i * 3 + 1] = 0.3; sVel[i * 3 + 1] *= -0.2; }
        }
      }
      for (let j = 0; j < NM; j++) {
        if (mSmLife[j] > 0) {
          mAge[j] += dt;
          const t = mAge[j] / mSmLife[j];
          if (t >= 1) { mSmLife[j] = 0; mPos[j * 3 + 1] = -100; mAlpha[j] = 0; continue; }
          mPos[j * 3] += mVel[j * 3] * dt; mPos[j * 3 + 1] += mVel[j * 3 + 1] * dt; mPos[j * 3 + 2] += mVel[j * 3 + 2] * dt;
          mSize[j] = 0.3 + t * 1.3; mAlpha[j] = Math.sin(Math.PI * t) * 0.13;
        }
      }
      sGeo.attributes.position.needsUpdate = true;
      mGeo.attributes.position.needsUpdate = true;
      mGeo.attributes.aSize.needsUpdate = true;
      mGeo.attributes.aAlpha.needsUpdate = true;
    }

    const UP = new THREE.Vector3(0, 1, 0);
    const tgt = new THREE.Vector3();
    const dir = new THREE.Vector3();
    let lensGlow = 0.2;

    function placeBeam(on, cx, cy) {
      beam.visible = on; hitSprite.visible = on; hitLight.visible = on;
      lensGlow += ((on ? 0.9 : 0.2) - lensGlow) * 0.2;
      mLens.emissiveIntensity = lensGlow;
      if (!on) return;
      tgt.set((cx / W - 0.5) * PLATE_W, 0.31, (cy / H - 0.5) * PLATE_D);
      dir.subVectors(tgt, lensTip);
      const len = dir.length(); dir.normalize();
      beam.position.copy(lensTip).addScaledVector(dir, len / 2);
      beam.quaternion.setFromUnitVectors(UP, dir);
      beam.scale.set(1, len, 1);
      const flicker = 0.85 + Math.random() * 0.3;
      hitSprite.position.set(tgt.x, tgt.y + 0.1, tgt.z);
      hitSprite.scale.set(0.9 * flicker, 0.9 * flicker, 1);
      hitLight.position.set(tgt.x, tgt.y + 0.7, tgt.z);
      hitLight.intensity = 1.0 + Math.random() * 0.5;
      if (Math.random() < 0.7) emitSpark(tgt.x, tgt.y + 0.04, tgt.z);
      if (Math.random() < 0.35) emitSmoke(tgt.x, tgt.y + 0.1, tgt.z);
    }

    let phase = 'mark', segIndex = 0, mode = 'mark', px = 0;
    let jumpT = 0, jumpDur = 0.03;
    const jumpFrom = { x: 0, y: 0 }, jumpTo = { x: 0, y: 0 };
    let headX = W / 2, headY = H / 2, beamOn = false, phaseT = 0;

    function resetPlate() {
      dctx.drawImage(baseCanvas, 0, 0); octx.drawImage(baseOrm, 0, 0);
      plateTex.needsUpdate = true; ormTex.needsUpdate = true;
    }
    function startJob() {
      resetPlate();
      segIndex = 0; mode = 'mark'; phase = 'mark'; phaseT = 0;
      px = segs[0].x0; headX = px; headY = segs[0].y + STEP / 2;
    }
    function reveal(y, xa, xb) {
      const a = Math.floor(xa), b = Math.ceil(xb);
      if (b <= a) return;
      dctx.drawImage(engCanvas, a, y, b - a, STEP, a, y, b - a, STEP);
      octx.drawImage(engOrm, a, y, b - a, STEP, a, y, b - a, STEP);
      plateTex.needsUpdate = true; ormTex.needsUpdate = true;
    }
    function nextSegment() {
      const from = segs[segIndex]; segIndex++;
      if (segIndex >= segs.length) { phase = 'hold'; phaseT = 0; beamOn = false; headX = W / 2; headY = H / 2; return; }
      const to = segs[segIndex];
      jumpFrom.x = from.x1; jumpFrom.y = from.y + STEP / 2;
      jumpTo.x = to.x0; jumpTo.y = to.y + STEP / 2;
      const dist = Math.hypot(jumpTo.x - jumpFrom.x, jumpTo.y - jumpFrom.y);
      jumpDur = Math.max(0.012, dist / 9000); jumpT = 0; mode = 'jump';
    }
    function advance(dt) {
      let guard = 0;
      while (dt > 0 && phase === 'mark' && guard++ < 4000) {
        const seg = segs[segIndex];
        if (mode === 'jump') {
          const use = Math.min(dt, jumpDur - jumpT); jumpT += use; dt -= use;
          const k = Math.min(1, jumpT / jumpDur);
          headX = jumpFrom.x + (jumpTo.x - jumpFrom.x) * k;
          headY = jumpFrom.y + (jumpTo.y - jumpFrom.y) * k;
          beamOn = false;
          if (jumpT >= jumpDur - 1e-9) { mode = 'mark'; px = seg.x0; }
        } else {
          const remaining = seg.x1 - px;
          const move = MARK_SPEED * dt;
          beamOn = true; headY = seg.y + STEP / 2;
          if (move >= remaining) {
            reveal(seg.y, px, seg.x1); dt -= remaining / MARK_SPEED;
            headX = seg.x1; px = seg.x1; nextSegment();
          } else {
            reveal(seg.y, px, px + move); px += move; headX = px; dt = 0;
          }
        }
      }
    }
    function stepPhases(dt) {
      if (phase === 'mark') { advance(dt); return; }
      beamOn = false; phaseT += dt;
      if (phase === 'hold' && phaseT > 3.5) { phase = 'clear'; phaseT = 0; }
      else if (phase === 'clear' && phaseT > 0.8) { startJob(); }
    }

    // Camera view with balanced overview for widescreen/mobile
    const cam = { theta: 0.48, phi: 1.15, radius: 36 };
    const camTarget = new THREE.Vector3(0, 3.2, -0.5);

    // Entry zoom-in cinematic animation (moves smoothly from zoom-out to zoom-in on page load)
    let introStartTime = null;
    let userInteracted = false;

    // Mouse parallax tracking for interactive movement across the full screen
    const mouseOffset = { x: 0, y: 0, targetX: 0, targetY: 0 };
    function onWindowMouseMove(e) {
      if (reduceMotion) return;
      const nx = (e.clientX / window.innerWidth) * 2 - 1; // -1 to +1
      const ny = (e.clientY / window.innerHeight) * 2 - 1;
      mouseOffset.targetX = nx * 0.35;
      mouseOffset.targetY = ny * 0.18;
    }
    window.addEventListener('mousemove', onWindowMouseMove, { passive: true });

    // Scroll parallax tracking
    let scrollProgress = 0;
    function onWindowScroll() {
      if (reduceMotion) return;
      scrollProgress = Math.min(window.scrollY / (window.innerHeight || 1), 1.5);
    }
    window.addEventListener('scroll', onWindowScroll, { passive: true });

    const pointers = {};
    let pinchDist = 0;
    function onPointerDown(e) {
      userInteracted = true;
      canvas.setPointerCapture(e.pointerId);
      pointers[e.pointerId] = { x: e.clientX, y: e.clientY };
      const ids = Object.keys(pointers);
      if (ids.length === 2) {
        const a = pointers[ids[0]], b = pointers[ids[1]];
        pinchDist = Math.hypot(a.x - b.x, a.y - b.y);
      }
    }
    function onPointerMove(e) {
      const p = pointers[e.pointerId]; if (!p) return;
      const ids = Object.keys(pointers);
      if (ids.length === 1) {
        cam.theta -= (e.clientX - p.x) * 0.005;
        cam.phi = Math.max(0.35, Math.min(1.48, cam.phi - (e.clientY - p.y) * 0.005));
        p.x = e.clientX; p.y = e.clientY;
      } else if (ids.length === 2) {
        p.x = e.clientX; p.y = e.clientY;
        const a = pointers[ids[0]], b = pointers[ids[1]];
        const d = Math.hypot(a.x - b.x, a.y - b.y);
        if (pinchDist > 0) cam.radius = Math.max(12, Math.min(50, cam.radius * pinchDist / d));
        pinchDist = d;
      }
    }
    function onPointerEnd(e) { delete pointers[e.pointerId]; pinchDist = 0; }
    function onWheel(e) {
      userInteracted = true;
      e.preventDefault();
      cam.radius = Math.max(12, Math.min(50, cam.radius * Math.exp(e.deltaY * 0.0012)));
    }
    canvas.addEventListener('pointerdown', onPointerDown);
    canvas.addEventListener('pointermove', onPointerMove);
    canvas.addEventListener('pointerup', onPointerEnd);
    canvas.addEventListener('pointercancel', onPointerEnd);
    canvas.addEventListener('wheel', onWheel, { passive: false });

    function resize() {
      const r = stage.getBoundingClientRect();
      const vw = Math.max(100, Math.floor(r.width));
      const vh = Math.max(100, Math.floor(r.height));
      renderer.setSize(vw, vh, false);
      camera.aspect = vw / vh;

      // Shift 3D machine design to the right so viewers can clearly see it beside the hero box card
      if (vw >= 960) {
        const xOffset = -Math.round(vw * 0.22);
        camera.setViewOffset(vw, vh, xOffset, 0, vw, vh);
      } else if (vw >= 720) {
        const xOffset = -Math.round(vw * 0.14);
        camera.setViewOffset(vw, vh, xOffset, 0, vw, vh);
      } else {
        camera.clearViewOffset();
      }

      camera.updateProjectionMatrix();
      smokeMat.uniforms.uScale.value = (vh * DPR) / (2 * Math.tan(camera.fov * Math.PI / 360));
    }
    let ro;
    if (window.ResizeObserver) { ro = new ResizeObserver(resize); ro.observe(stage); }
    window.addEventListener('resize', resize);
    resize();

    function placeCamera(now) {
      // Smoothly interpolate mouse movement
      mouseOffset.x += (mouseOffset.targetX - mouseOffset.x) * 0.05;
      mouseOffset.y += (mouseOffset.targetY - mouseOffset.y) * 0.05;

      // Entry cinematic zoom-in transition on entering website
      if (introStartTime === null) introStartTime = now;
      let zoomMultiplier = 1;
      let angleIntroOffset = 0;

      if (!reduceMotion && !userInteracted) {
        const introElapsed = (now - introStartTime) / 1000;
        const introDuration = 2.4; // 2.4s cinematic swoop
        if (introElapsed < introDuration) {
          const t = introElapsed / introDuration;
          // Smooth quintic ease-out: deceleration from wide perspective
          const easeOut = 1 - Math.pow(1 - t, 4);
          // Starts at 2.2x zoomed out smoothly down to 1.0x normal zoom
          zoomMultiplier = 1 + (1 - easeOut) * 1.25;
          // Subtle camera angle swoop as it glides into place
          angleIntroOffset = (1 - easeOut) * 0.16;
        }
      }

      // Continuous ambient orbit & floating movement
      const breatheTime = now * 0.0006;
      const ambientTheta = Math.sin(breatheTime * 0.8) * 0.22 + Math.cos(breatheTime * 0.35) * 0.08;
      const ambientPhi = Math.sin(breatheTime * 0.6) * 0.08;
      const ambientHeight = Math.sin(breatheTime * 0.7) * 0.8;

      // Scroll shifts camera slightly as user browses down
      const scrollShift = scrollProgress * 0.35;

      const currentTheta = cam.theta + ambientTheta + mouseOffset.x + scrollShift + angleIntroOffset;
      const currentPhi = Math.max(0.35, Math.min(1.48, cam.phi + ambientPhi + mouseOffset.y - angleIntroOffset * 0.4));

      const fit = Math.max(1, 1.25 / camera.aspect);
      const r = cam.radius * fit * zoomMultiplier;

      const dynamicTargetY = camTarget.y + ambientHeight;

      camera.position.set(
        camTarget.x + r * Math.sin(currentPhi) * Math.sin(currentTheta),
        dynamicTargetY + r * Math.cos(currentPhi),
        camTarget.z + r * Math.sin(currentPhi) * Math.cos(currentTheta)
      );
      camera.lookAt(camTarget.x, dynamicTargetY, camTarget.z);
    }

    function begin() {
      if (!mounted) return;
      paintBase(); buildJob(); buildProps(); startJob();
      for (let i = 0; i < 360; i++) stepPhases(1 / 60);
      plateTex.needsUpdate = true; ormTex.needsUpdate = true;

      let last = performance.now();
      function frame(now) {
        if (!mounted) return;
        const dt = Math.min(0.05, (now - last) / 1000); last = now;
        stepPhases(dt);
        updateParticles(dt);
        placeBeam(beamOn, headX, headY);
        placeCamera(now);
        renderer.render(scene, camera);
        animId = requestAnimationFrame(frame);
      }
      animId = requestAnimationFrame(frame);
    }

    const fontsReady = document.fonts
      ? Promise.race([
          Promise.all([
            document.fonts.load('700 118px "Barlow Condensed"'),
            document.fonts.load('600 78px "Barlow Condensed"'),
            document.fonts.load('500 32px "JetBrains Mono"')
          ]),
          new Promise(res => setTimeout(res, 1800))
        ])
      : Promise.resolve();
    fontsReady.then(begin, begin);

    return () => {
      mounted = false;
      if (animId) cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', onWindowMouseMove);
      window.removeEventListener('scroll', onWindowScroll);
      canvas.removeEventListener('pointerdown', onPointerDown);
      canvas.removeEventListener('pointermove', onPointerMove);
      canvas.removeEventListener('pointerup', onPointerEnd);
      canvas.removeEventListener('pointercancel', onPointerEnd);
      canvas.removeEventListener('wheel', onWheel);
      if (ro) ro.disconnect();
      window.removeEventListener('resize', resize);
      renderer.dispose();
    };
  }, []);

  return (
    <div className="plate-3d-stage" ref={stageRef}>
      {glFailed ? (
        <div className="sim-nogl">
          <p>3D hardware acceleration unavailable.</p>
        </div>
      ) : (
        <canvas
          ref={canvasRef}
          aria-label="3D view of a fibre laser marking machine"
          className="plate-3d-canvas"
        />
      )}
    </div>
  );
}
