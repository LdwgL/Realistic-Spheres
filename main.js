import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";
import { FontLoader } from "https://esm.sh/three/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "https://esm.sh/three/examples/jsm/geometries/TextGeometry.js";
import { color } from "three/examples/jsm/nodes/Nodes.js";
// Background texture
const hdrTextureURL = new URL(
  "/img/MR_INT-003_Kitchen_Pierre.hdr",
  import.meta.url
);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Sets the color of the background.
renderer.setClearColor(0xffffff);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

// Sets orbit control to move the camera around.
const orbit = new OrbitControls(camera, renderer.domElement);

// Camera positioning.
camera.position.set(6, 8, 14);
// Has to be done everytime we update the camera position.
orbit.update();

renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.8;
// Add background and loading
const loader = new RGBELoader();
loader.load(hdrTextureURL, function (texture) {
  texture.mapping = THREE.EquirectangularReflectionMapping;
  scene.background = texture;
  scene.environment = texture;

  // --- Spheres ----- //

  const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(1, 50, 50),
    new THREE.MeshStandardMaterial({
      roughness: 0,
      metalness: 0.5,
      color: 0xffea00,
    })
  );
  scene.add(sphere);
  sphere.position.x = 1.5;
});

const sphere2 = new THREE.Mesh(
  new THREE.SphereGeometry(1, 50, 50),
  new THREE.MeshStandardMaterial({
    roughness: 0,
    metalness: 0.5,
    color: 0x00ff00,
  })
);
scene.add(sphere2);
sphere2.position.x = -1.5;

const sphere3 = new THREE.Mesh(
  new THREE.SphereGeometry(1, 50, 50),
  new THREE.MeshStandardMaterial({
    roughness: 0,
    metalness: 0.5,
    color: 0xff0000,
  })
);

const fontLoader = new FontLoader();
fontLoader.load(
  "https://threejs.org/examples/fonts/helvetiker_regular.typeface.json",
  function (font) {
    const textGeometry = new TextGeometry(
      "Welcome, to my project ! \n Realistic Spheres\n make by LdwgL",
      {
        font: font,
        size: 2,
        height: 1,
        wireframe: true,
        curveSegments: 12,
        bevelEnabled: true,
        bevelThickness: 0.1,
        bevelSize: 0.01,
        bevelOffset: 0,
        bevelSegments: 5,
      }
    );

    const textMaterial = new THREE.MeshBasicMaterial();
    const textMesh = new THREE.Mesh(textGeometry, textMaterial);
    textMesh.position.set(0, 10, -20); // Adjust the position as needed
    scene.add(textMesh);
  }
);

scene.add(sphere3);
sphere3.position.x = 4.5;

// Creates a 12 by 12 grid helper.
const gridHelper = new THREE.GridHelper(12, 12);
// scene.add(gridHelper);

// Creates an axes helper with an axis length of 4.
const axesHelper = new THREE.AxesHelper(4);
// scene.add(axesHelper);

function animate() {
  renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);

window.addEventListener("resize", function () {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
