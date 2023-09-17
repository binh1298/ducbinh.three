import "./style.css";
import * as THREE from "three";

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  1000
);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(sizes.width, sizes.height);

const textureLoader = new THREE.TextureLoader();
const matcapTexture = textureLoader.load("/matcaps/2.png");
const material = new THREE.MeshMatcapMaterial({ matcap: matcapTexture });

const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
const cube = new THREE.Mesh(cubeGeometry, material);
cube.position.x = -3;
scene.add(cube);

const planeGeometry = new THREE.PlaneGeometry(1, 1);
const plane = new THREE.Mesh(planeGeometry, material);
scene.add(plane);

const torusGeometry = new THREE.TorusGeometry(1);
const torus = new THREE.Mesh(torusGeometry, material);
torus.position.x = 3;
scene.add(torus);

document
  .querySelector<HTMLDivElement>("#app")!
  .appendChild(renderer.domElement);

window.addEventListener("resize", () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  renderer.setSize(sizes.width, sizes.height);
});

const clock = new THREE.Clock();

const rotate = (mesh: THREE.Mesh, elapsedTime: number) => {
  mesh.rotation.x = 0.4 * elapsedTime;
  mesh.rotation.y = 0.5 * elapsedTime;
  mesh.rotation.z = 0.6 * elapsedTime;
};

function animate() {
  console.log("hehe");
  const elapsedTime = clock.getElapsedTime();

  rotate(cube, elapsedTime);
  rotate(plane, elapsedTime);
  rotate(torus, elapsedTime);

  renderer.render(scene, camera);

  window.requestAnimationFrame(animate);
}

animate();
