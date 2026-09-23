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
    const W = 5.8, D = 3.5, Y = .78, H = 2.75;
    // Ground and foundation
    const ground = new THREE.Mesh(new THREE.PlaneGeometry(200, 200), new THREE.ShadowMaterial({ opacity: .15 }));
    ground.rotation.x = -Math.PI / 2; ground.position.y = -.035; ground.receiveShadow = true; scene.add(ground);
    box(0, 0, .14, 0, 7.15, .28, 4.85, dark);
    for (const x of [-2.35, 2.35]) for (const z of [-1.24, 1.24]) {
      box(0, x, .45, z, .16, .68, .16, steel);
      box(0, x, .09, z, .38, .08, .38, steel);
    }
    // Structural frame
    for (const x of [-W/2, W/2]) for (const z of [-D/2, D/2]) rod(1, [x,Y,z],[x,Y+H,z], .055, steel);
    for (const y of [Y,Y+H]) {
      for (const z of [-D/2,D/2]) rod(1,[-W/2,y,z],[W/2,y,z],.055,steel);
      for (const x of [-W/2,W/2]) rod(1,[x,y,-D/2],[x,y,D/2],.055,steel);
    }
    for (const x of [-1.45,0,1.45]) {
      rod(1,[x,Y,-D/2],[x,Y+H,-D/2],.035,steel);
      rod(1,[x,Y,D/2],[x,Y+H,D/2],.035,steel);
    }
    // Insulated floor and rear shell
    box(2,0,Y+.08,0,W,.16,D,floorMat);
    for (let x=-2.5; x<2.8; x+=.52) box(2,x,Y+.167,0,.018,.018,D-.22,wood);
    box(2,0,Y+H/2,-D/2,W-.1,H-.12,.12,cream);
    box(2,-W/2,Y+H/2,0,.12,H-.12,D-.12,cream);
    box(2,W/2,Y+H/2,0,.12,H-.12,D-.12,cream);
    // Front glazing with dark mullions
    box(3,0,Y+H/2,D/2-.01,W-.18,H-.2,.035,glass);
    for (const x of [-1.45,0,1.45]) rod(3,[x,Y,D/2+.045],[x,Y+H,D/2+.045],.036,dark);
    rod(3,[-W/2,Y+.66,D/2+.04],[W/2,Y+.66,D/2+.04],.03,dark);
    box(3,2.2,Y+H/2,D/2+.08,.025,H-.25,.055,dark);
    box(3,2.06,Y+1.35,D/2+.11,.035,.24,.06,steel);
    // Interior: cabinetry, sofa, bed, lighting
    box(4,-1.76,Y+.46,-1.08,1.55,.73,.65,wood);
    box(4,-1.76,Y+.85,-1.08,1.6,.08,.7,floorMat);
    box(4,1.65,Y+.43,-.9,1.55,.48,1.25,dark);
    box(4,1.65,Y+.74,-1.46,1.55,.42,.2,cream);
    box(4,1.65,Y+.72,-.9,1.4,.13,1.1,cream);
    box(4,-.25,Y+.41,.37,1.4,.16,.7,wood);
    box(4,-.25,Y+.24,.37,.08,.35,.08,steel);
    for (const x of [-1.5,0,1.5]) box(4,x,Y+H-.16,0,.8,.018,.035,glow);
    // Roof and upper trim
    box(5,0,Y+H+.08,0,W+.27,.17,D+.27,cream);
    box(5,0,Y+H+.18,0,W+.12,.035,D+.12,dark);
    // Deck and finishing details
    box(6,0,.25,D/2+1.06,5.1,.18,2.0,wood);
    for (let x=-2.45; x<2.5; x+=.37) box(6,x,.35,D/2+1.06,.012,.012,1.84,dark);
    box(6,0,.22,D/2+2.22,2.4,.12,.4,wood);
    box(6,0,.1,D/2+2.47,2.4,.12,.4,wood);
    const ring = new THREE.Mesh(new THREE.TorusGeometry(5.0,.012,4,80), new THREE.MeshBasicMaterial({ color: 0x9bbdb2, transparent: true, opacity: .35 }));
    ring.rotation.x = Math.PI/2; ring.position.y = -.01; scene.add(ring);

    const resize = () => {
      const w=host.clientWidth, h=host.clientHeight;
      if (!w || !h) return;
      renderer.setSize(w,h,false); camera.aspect=w/h;
      camera.fov = w < 560 ? 43 : 34;
      camera.position.set(w < 560 ? 12 : 10, 7, w < 560 ? 15 : 12);
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
