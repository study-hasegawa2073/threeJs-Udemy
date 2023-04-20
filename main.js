import * as THREE from 'three';
import style from './style.css';

let scene, camera, renderer, pointLight;

// シーンを作成
scene = new THREE.Scene();

// カメラを作成
camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 0, 500);

// レンダラーを作成
renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
renderer.render(scene, camera);

// ジオメトリを作成
const ballGeometry = new THREE.SphereGeometry(100, 64, 32);
// マテリアルを作成
const ballMaterial = new THREE.MeshPhysicalMaterial();
// メッシュ化
const ballMesh = new THREE.Mesh(ballGeometry, ballMaterial);
scene.add(ballMesh);

// 並行光源を作成
const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
directionalLight.position.set(1, 1, 1);
scene.add(directionalLight);

// ポイント光源を作成
pointLight = new THREE.PointLight(0xffffff, 2);
pointLight.position.set(-200, -200, -200);
scene.add(pointLight);

// ポイント光源の位置を特定するヘルパーを作成
let pointLightHelper = new THREE.PointLightHelper(pointLight, 30);
scene.add(pointLightHelper);

// ポイント光源を球の周りを巡回させる
function animate() {
  pointLight.position.set(
    200 * Math.sin(Date.now() / 500),
    200 * Math.sin(Date.now() / 1000),
    200 * Math.cos(Date.now() / 500)
  );
  // レンダリング
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}
animate();
