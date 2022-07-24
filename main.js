import './style.css';
import * as THREE from 'three';
import Typed from 'typed.js';

import plutoImg from './assets/pluto.jpg';
import ringImg from './assets/ring.jpg';
import earthImg from './assets/earth.jpg';
import earthEdge from './assets/earth_edge.jpg';
import marsImg from './assets/mars.jpg';
import marsEdge from './assets/mars_edge.jpg';

import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import imgUrl from './assets/mail.png'

document.getElementById('mail-button').src = imgUrl

 
 
 /**************************   SETUP   ***************************************/
 const scene = new THREE.Scene();
 const clock = new THREE.Clock();
 
 const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
 camera.position.setZ(0);

 const renderer = new THREE.WebGLRenderer({
     canvas: document.querySelector('#bg'),
     antialias: true,
    });
renderer.autoClear = false;
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x000000, 0.0);


    
/***************************  OBJECTS  ****************************************/
// Cube
/* 
'./assets/airplane.png',
'./assets/astronomy.png',
'./assets/music.png',
'./assets/football.png',
'./assets/coding.png',
'./assets/controller.png', 
*/

const jupiterTexture = new THREE.TextureLoader().load(plutoImg);
const jupiter = new THREE.Mesh(
    new THREE.IcosahedronGeometry(1, 100),
    new THREE.MeshBasicMaterial({color: 0xff4800, map: jupiterTexture})
);
jupiter.position.setX(3.5).setY(1.7).setZ(-5);
jupiter.rotation.x += 0.9;
scene.add(jupiter);

/* const textureLoader = new TextureLoader();
const cubeGeo = new THREE.BoxGeometry(1, 1, 1);
const cubeTexture = [
    new THREE.MeshStandardMaterial({
        map: textureLoader.load("./assets/me_pic.jpg")
    }),
    new THREE.MeshStandardMaterial({
        map: textureLoader.load("./assets/me_pic.jpg")
    }),
    new THREE.MeshStandardMaterial({
        map: textureLoader.load("./assets/me_pic.jpg")
    }),
    new THREE.MeshStandardMaterial({
        map: textureLoader.load("./assets/me_pic.jpg")
    }),
    new THREE.MeshStandardMaterial({
        map: textureLoader.load("./assets/me_pic.jpg")
    }),
    new THREE.MeshStandardMaterial({
        map: textureLoader.load("./assets/me_pic.jpg")
    }),

];
const cube = new THREE.Mesh(cubeGeo, cubeTexture);
cube.position.setX(2).setY(1.7).setZ(-5);
scene.add(cube); */
// plane
/* const planeGeo = new THREE.PlaneGeometry(1, 1, 2, 2);
const myPic = new THREE.TextureLoader().load('./assets/me_pic.jpg');
const planeMat = new THREE.MeshStandardMaterial({map: myPic});
const plane = new THREE.Mesh(planeGeo, planeMat);
plane.position.setX(2).setY(1.7).setZ(-5);
scene.add(plane); */

// torus
const torusGeo =  new THREE.TorusGeometry( 2, 0.1, 10, 40);
const ringTexture = new THREE.TextureLoader().load(ringImg);
const torusMat = new THREE.MeshStandardMaterial({map: ringTexture, wireframe: true});
const torus = new THREE.Mesh( torusGeo, torusMat );
torus.position.setX(3.5).setY(1.7).setZ(-5);
torus.rotation.x = -10;
scene.add(torus);

// Earth
const earthTexture = new THREE.TextureLoader().load(earthImg);
const eart_edge = new THREE.TextureLoader().load(earthEdge);
const earth = new THREE.Mesh(
    new THREE.SphereGeometry(5, 1000, 1000),
    new THREE.MeshStandardMaterial({
        map: earthTexture,
        bumpMap: eart_edge,
})
);
earth.position.z = 30;
earth.position.x = -20;
earth.position.y = -5
scene.add(earth);

//Mars
const marsTexture = new THREE.TextureLoader().load(marsImg);
const mars_edge = new THREE.TextureLoader().load(marsEdge);
const mars = new THREE.Mesh(
    new THREE.SphereGeometry(2.5, 500, 500),
    new THREE.MeshStandardMaterial({
        map: marsTexture,
        bumpMap: mars_edge,
    })
)
mars.position.z = 60;
mars.position.x = 5;
mars.position.y = 5
scene.add(mars);

/*****position correction******/
if(window.innerWidth < 1000){
    torus.position.setX(0.5);
    jupiter.position.setX(0.5);
}


/**************************  LIGHT  ****************************************/
// Light
const pointLight = new THREE.PointLight(0x343c66, 5);
pointLight.position.setX(2).setY(1.7).setZ(-5);
const ambientLight = new THREE.AmbientLight(0Xffffff, 0.2);
scene.add(ambientLight, pointLight);

// bloom
const renderScene = new RenderPass(scene, camera);
const bloomPass = new UnrealBloomPass(
  new THREE.Vector2(window.innerWidth, window.innerHeight),
  0,
  0.4,
  0
);
bloomPass.threshold = 0;
bloomPass.strength = 0.7; //intensity of glow
bloomPass.radius = 0;
const bloomComposer = new EffectComposer(renderer);
bloomComposer.setSize(window.innerWidth, window.innerHeight);
bloomComposer.renderToScreen = true;
bloomComposer.addPass(renderScene);
bloomComposer.addPass(bloomPass);


/*************************   CAMERA   **************************************/
function moveCamera(){
    const t = document.body.getBoundingClientRect().top;
    camera.position.z = t * -0.10;
    camera.position.x = t * -0.0002;
    camera.position.y = t * -0.0002;
}
document.body.onscroll = moveCamera;

/* // Helper
const lightHelper = new THREE.PointLightHelper(pointLight)
const gridHelper = new THREE.GridHelper(200, 50);
scene.add(lightHelper, gridHelper) */

// Background img

/**************************** ANIMATION ***************************************/
function animate() {
    requestAnimationFrame(animate);
    const time = clock.getElapsedTime();
    /* cube.rotation.z = Math.cos(time) * 0.06;
    cube.rotation.x = Math.cos(time) * 0.005;
    cube.rotation.y += 0.005; */
    torus.translateX(Math.cos(time) * 0.001);
    torus.translateY(Math.sin(time) * 0.0005);
    earth.rotation.y += 0.01;
    mars.rotation.y += 0.002;
    jupiter.rotation.y += 0.01;
    renderer.render(scene, camera);
    bloomComposer.render();
}

function addStar() {
    const geoSphere = new THREE.SphereGeometry(0.25, 24, 24);
    const matSphere = new THREE.MeshStandardMaterial({color: 0xffffff});
    const star = new THREE.Mesh( geoSphere, matSphere);
    
    const [x, y , z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(500));
    star.position.set(x, y, z);
    scene.add(star);
}

document.addEventListener('scroll', () => {
    let pos = window.scrollY - 100;
    document.getElementById("line1").style.left = `${pos*1.5}px`;
    document.getElementById("line2").style.right = `${pos*2 - 1200}px`;
    document.getElementById("scroll-clue").style.opacity = -(pos/60) + 1;

    let scroll = Math.min(Math.max(0, window.scrollY - 2800), 630);
    document.getElementById("myjourney").style.marginLeft = `${100 - (scroll/5)}vw`;

    if(scroll == 630){
        const journ = document.getElementsByClassName("journey-content");
        for(let i = 0; i < journ.length; i++){
            journ[i].style.opacity = '1';
        }
    }
});



document.addEventListener('mouseup', () => {
    document.onmousemove = null;
});

//resize listner
window.addEventListener(
    "resize",
    () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      bloomComposer.setSize(window.innerWidth, window.innerHeight);
      if(window.innerWidth < 1000){
        jupiter.position.setX(0.5);
        torus.position.setX(0.5);
      }else{
        jupiter.position.setX(3.5);
        torus.position.setX(3.5);
      }
    },
    false
  );

new Typed(".type-text", {
    strings: ['welcome to my website', "I'm software engineering student 💻🎓^1000"],
    typeSpeed: 40,
    backSpeed: 30,
    loop: true,
    
});

renderer.render(scene, camera);
Array(1000).fill().forEach(addStar);
animate();
        
        