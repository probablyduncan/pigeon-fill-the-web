import * as THREE from 'three';
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { GLTFLoader } from 'three/examples/jsm/Addons.js';

(() => {
    const wrapperElement = document.getElementById("pigeon");
    if (!wrapperElement) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(20, 1, 0.01, 10);
    camera.position.z = Math.PI;
    camera.position.y = 0.1

    const birdcage = new THREE.Object3D();
    scene.add(birdcage);

    const light = new THREE.PointLight(0x00FF00, 150);
    light.position.set(0, -5, -1);
    scene.add(light);

    const loader = new GLTFLoader();
    let pigeonModel: THREE.Group<THREE.Object3DEventMap> | undefined;

    loader.load('./src/assets/pigeon.glb', (gltf) => {
        pigeonModel = gltf.scene;
        birdcage.add(pigeonModel);
        const boundingBox = new THREE.Box3().setFromObject(pigeonModel);
        const center = boundingBox.getCenter(new THREE.Vector3());
        pigeonModel.position.set(-center.x - 0.01, -center.y + 0.1, -center.z - 0.15);
        pigeonModel.rotation.set(0, Math.PI / 4, 0);
    });

    const renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
    });
    renderer.setPixelRatio(window.devicePixelRatio * 2);
    renderer.setSize(36, 36);
    wrapperElement.appendChild(renderer.domElement);

    ScrollTrigger.observe({
        target: window,
        type: "scroll",
        onChange: (self) => {
            console.log(self.velocityY);
            if (!pigeonModel) {
                return
            }
            birdcage.rotateX(self.deltaY / (document.body.scrollHeight / 80));
            // birdcage.rotateY(self.deltaY > 0 ? 0.01 : -0.01);

            // velocity = self.scrollY();
        }
    });

    
    // let rotation = Math.PI / 4;
    function animate() {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);

        window.scrollY;

        // if (velocity < 0.0001) velocity = 0;
        // velocity /= 1.1;
        // birdcage.rotateX(velocity / 10000)
    }
    animate();

})();