import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const clamp = (v, min = 0, max = 1) => Math.min(max, Math.max(min, v));
const smooth = (v) => { const t = clamp(v); return t * t * (3 - 2 * t); };

export default function CapsuleAssembly({ progress, reducedMotion }) {
  const mount = useRef(null);
  const progressRef = useRef(progress);
  progressRef.current = progress;

  useEffect(() => {
    const host = mount.current;
    if (!host) return;
    let renderer;
    try { renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' }); }
    catch { host.classList.add('webgl-fallback'); return; }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.7;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    host.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(34, 1, .1, 100);
    camera.position.set(10, 7, 12);
    camera.lookAt(0, 1.5, 0);
    const ambient = new THREE.HemisphereLight(0xe7f3f2, 0x544632, 2.5);
    scene.add(ambient);
    const sun = new THREE.DirectionalLight(0xffffff, 3.6);
    sun.position.set(-4, 10, 8); sun.castShadow = true;
    sun.shadow.mapSize.set(1024, 1024);
    sun.shadow.camera.left = -10; sun.shadow.camera.right = 10; sun.shadow.camera.top = 10; sun.shadow.camera.bottom = -10;
    sun.shadow.bias = -.0003; scene.add(sun);
    const rim = new THREE.DirectionalLight(0xa8d9cc, 2.4);
    rim.position.set(6, 5, -7); scene.add(rim);
    const root = new THREE.Group(); scene.add(root);

    const material = (color, opts = {}) => new THREE.MeshStandardMaterial({ color, roughness: .55, metalness: .1, transparent: true, ...opts });
    const steel = material(0x657370, { roughness: .3, metalness: .7 });
    const floorMat = material(0xb28859, { roughness: .7 });
    const cream = material(0xe6dfce, { roughness: .44, metalness: .18 });
    const dark = material(0x1a302d, { roughness: .32, metalness: .55 });
    const wood = material(0x916948, { roughness: .67 });
    const glass = material(0xa6d8d4, { roughness: .09, metalness: .18, opacity: .32, depthWrite: false, side: THREE.DoubleSide });
    const glow = new THREE.MeshStandardMaterial({ color: 0xffd89c, emissive: 0xf8a94b, emissiveIntensity: 1.8, transparent: true });
    const stages = Array.from({ length: 7 }, () => []);
    const add = (geometry, mat, stage, x, y, z, opts = {}) => {
      const mesh = new THREE.Mesh(geometry, mat.clone());
      mesh.position.set(x, y, z);
      mesh.castShadow = !opts.noShadow; mesh.receiveShadow = true;
      root.add(mesh); stages[stage].push({ mesh, targetY: y, baseOpacity: mesh.material.opacity });
      return mesh;
    };
    const box = (stage, x, y, z, w, h, d, mat) => add(new THREE.BoxGeometry(w, h, d), mat, stage, x, y, z);
    const rod = (stage, a, b, radius, mat) => {
      const start = new THREE.Vector3(...a), end = new THREE.Vector3(...b), delta = end.clone().sub(start);
      const mesh = add(new THREE.CylinderGeometry(radius, radius, delta.length(), 8), mat, stage, ...start.clone().add(end).multiplyScalar(.5).toArray());
      mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), delta.normalize());
    };
    // 20 ft × 10 ft × 8 ft: the long elevation is twice as wide as the depth.
    const W = 7.2, D = 3.6, Y = .55, H = 2.88, R = .85;
    const outline = (w, h, r, y = 0) => {
      const s = new THREE.Shape(), x = -w / 2, right = w / 2;
      s.moveTo(x + r, y); s.lineTo(right - r, y);
      s.quadraticCurveTo(right, y, right, y + r);
      s.lineTo(right, y + h - r);
      s.quadraticCurveTo(right, y + h, right - r, y + h);
      s.lineTo(x + r, y + h);
      s.quadraticCurveTo(x, y + h, x, y + h - r);
      s.lineTo(x, y + r); s.quadraticCurveTo(x, y, x + r, y);
      return s;
    };
    const face = (stage, w, h, radius, z, mat, inset = 0) => {
      const geometry = new THREE.ShapeGeometry(outline(w, h, radius, Y + inset), 16);
      return add(geometry, mat, stage, 0, 0, z, { noShadow: true });
    };
    const rimFace = (stage, w, h, radius, thickness, z, mat) => {
      const shape = outline(w, h, radius, Y);
      const inner = outline(w - 2 * thickness, h - 2 * thickness, radius - thickness, Y + thickness);
      const hole = new THREE.Path(inner.getPoints(16).reverse());
      shape.holes.push(hole);
      return add(new THREE.ShapeGeometry(shape, 16), mat, stage, 0, 0, z, { noShadow: true });
    };
    // Ground and foundation
    const ground = new THREE.Mesh(new THREE.PlaneGeometry(200, 200), new THREE.ShadowMaterial({ opacity: .15 }));
    ground.rotation.x = -Math.PI / 2; ground.position.y = -.035; ground.receiveShadow = true; scene.add(ground);
    for (const x of [-2.7, 0, 2.7]) for (const z of [-1.24, 1.24]) {
      box(0, x, .3, z, .24, .5, .24, steel);
      box(0, x, .045, z, .58, .09, .58, dark);
    }
    // Long rounded elevation, with matching structural curves at both ends.
    for (const y of [Y,Y+H]) {
      for (const z of [-D/2,D/2]) rod(1,[-W/2+R,y,z],[W/2-R,y,z],.055,steel);
    }
    for (const z of [-D/2,D/2]) {
      for (const x of [-W/2,W/2]) rod(1,[x,Y+R,z],[x,Y+H-R,z],.055,steel);
      for (const [cx,cy,start,end] of [[W/2-R,Y+R,-Math.PI/2,0],[W/2-R,Y+H-R,0,Math.PI/2],[-W/2+R,Y+H-R,Math.PI/2,Math.PI],[-W/2+R,Y+R,Math.PI,3*Math.PI/2]]) {
        const pts = Array.from({length:9},(_,i)=>new THREE.Vector3(cx+R*Math.cos(start+(end-start)*i/8),cy+R*Math.sin(start+(end-start)*i/8),z));
        add(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts),12,.055,8,false),steel,1,0,0,0);
      }
    }
    for (const x of [-2,0,2]) {
      for (const z of [-D/2,D/2]) rod(1,[x,Y,z],[x,Y+H,z],.034,steel);
    }
    for (const x of [-W/2+R,W/2-R]) for (const y of [Y,Y+H]) rod(1,[x,y,-D/2],[x,y,D/2],.05,steel);
    // Insulated floor and rear shell
    box(2,0,Y+.07,0,W-2*R,.14,D,floorMat);
    face(2,W,H,R,-D/2+.06,cream);
    // Glazing follows the rounded silhouette, with an uninterrupted side shell.
    face(3,W-.3,H-.3,R-.15,D/2-.01,glass,.15);
    rimFace(3,W,H,R,.15,D/2+.025,dark);
    for (const x of [-2,0,2]) rod(3,[x,Y+.15,D/2+.06],[x,Y+H-.15,D/2+.06],.032,dark);
    rod(3,[-W/2+R,Y+.65,D/2+.06],[W/2-R,Y+.65,D/2+.06],.027,dark);
    box(3,1.98,Y+1.42,D/2+.11,.035,.25,.06,steel);
    // Interior: cabinetry, sofa, bed, lighting
    box(4,-2,Y+.46,-1.08,1.4,.73,.65,wood);
    box(4,-2,Y+.85,-1.08,1.45,.08,.7,floorMat);
    box(4,1.7,Y+.43,-.9,1.55,.48,1.25,dark);
    box(4,1.7,Y+.74,-1.46,1.55,.42,.2,cream);
    box(4,1.7,Y+.72,-.9,1.4,.13,1.1,cream);
    box(4,-.25,Y+.41,.37,1.4,.16,.7,wood);
    box(4,-.25,Y+.24,.37,.08,.35,.08,steel);
    for (const x of [-2,0,2]) box(4,x,Y+H-.16,0,.8,.018,.035,glow);
    // Curved end shell and long roof, leaving the glazing visible.
    for (const side of [-1,1]) {
      const corner = new THREE.Shape();
      const cx = side * (W/2-R), cy = Y+H-R;
      corner.moveTo(cx,cy); corner.lineTo(side*W/2,cy);
      for(let i=1;i<=12;i++) {
        const angle = Math.PI/2*i/12;
        corner.lineTo(cx+side*R*Math.cos(angle),cy+R*Math.sin(angle));
      }
      corner.closePath();
      add(new THREE.ExtrudeGeometry(corner,{depth:D,bevelEnabled:false}),cream,5,0,0,-D/2);
    }
    box(5,0,Y+H+.03,0,W-2*R,.1,D+.12,cream);
    box(5,0,Y+H+.095,0,W-2*R,.025,D+.12,dark);
    // Deck and finishing details
    box(6,0,.25,D/2+1.06,5.3,.18,2.0,wood);
    for (let x=-2.55; x<2.6; x+=.37) box(6,x,.35,D/2+1.06,.012,.012,1.84,dark);
    box(6,0,.22,D/2+2.22,2.4,.12,.4,wood);
    box(6,0,.1,D/2+2.47,2.4,.12,.4,wood);
    const ring = new THREE.Mesh(new THREE.TorusGeometry(5.4,.012,4,80), new THREE.MeshBasicMaterial({ color: 0x9bbdb2, transparent: true, opacity: .35 }));
    ring.rotation.x = Math.PI/2; ring.position.y = -.01; scene.add(ring);

    const resize = () => {
      const w=host.clientWidth, h=host.clientHeight;
      if (!w || !h) return;
      renderer.setSize(w,h,false); camera.aspect=w/h;
      camera.fov = w < 560 ? 43 : 34;
      camera.position.set(w < 560 ? 13 : 11, 7, w < 560 ? 18 : 15);
      camera.updateProjectionMatrix();
    };
    const observer = new ResizeObserver(resize); observer.observe(host); resize();
    let frame;
    let shown = 0;
    function render() {
      const target = clamp(progressRef.current);
      shown += (target - shown) * (reducedMotion ? 1 : .12);
      const stageFloat = shown * 6.8;
      stages.forEach((group, i) => {
        const visibility = i === 0 ? 1 : smooth((stageFloat - (i-.3)) / .9);
        group.forEach(({mesh,targetY,baseOpacity}) => {
          mesh.visible = visibility > .002;
          mesh.material.opacity = baseOpacity * visibility;
          mesh.position.y = targetY + (1 - visibility) * (i === 5 ? 2.1 : i === 6 ? -1.1 : .8);
        });
      });
      root.rotation.y = -.2 + shown * .22;
      root.position.y = reducedMotion ? 0 : Math.sin(performance.now()*.0007)*.025;
      renderer.render(scene,camera);
      frame = requestAnimationFrame(render);
    }
    render();
    return () => {
      cancelAnimationFrame(frame); observer.disconnect();
      scene.traverse(obj => { if (obj.geometry) obj.geometry.dispose(); if (obj.material) { if (Array.isArray(obj.material)) obj.material.forEach(m=>m.dispose()); else obj.material.dispose(); } });
      renderer.dispose(); renderer.domElement.remove();
    };
  }, [reducedMotion]);
  return <div className="assembly-canvas" ref={mount} role="img" aria-label="Interactive 3D capsule assembled in stages as the page scrolls"><img className="fallback-image" src="/gallery-exterior2.jpg" alt="Capsule design concept"/></div>;
}
