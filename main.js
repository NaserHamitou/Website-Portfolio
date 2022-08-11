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
import scrabbleHome from './assets/showcase/scrabble/menu-sb.png';
import scrabbleGame from  './assets/showcase/scrabble/game.png';
import scrabbleOnline from './assets/showcase/scrabble/online.png';
import nasworld from './assets/nasworld.png';
import nasempty from './assets/emptynas.png';
import nashome from './assets/nashome.png';
import angular from './assets/ang-icon2.png';
import aws from './assets/aws.png';
import mongo from './assets/mongo.png';
import socket from './assets/socket.png';
import react from './assets/react.png';
import hardhat from './assets/hardhat.png';
import firebase from './assets/firebase.png';
import solidity from './assets/solidity.png';
import robot from './assets/showcase/inf1900/inf1900.gif';
import robotusb from './assets/showcase/inf1900/robot-usb.png';
import clang from './assets/c-lang.png';
import chip from './assets/chip.png';
import sensor from './assets/sensor.png';
import linux from './assets/linux.png';
import robo1 from './assets/showcase/polystar/robotstar1.png';
import robo2 from './assets/showcase/polystar/robotstar2.png';
import robo3 from './assets/showcase/polystar/robotstar3.png';
import python from './assets/py-icon.png';
import opencv from './assets/open-cv.png';
import numPy from './assets/numPy.png';
import nodej from './assets/node.png';


document.getElementById('mail-button').src = imgUrl;
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
const jupiterTexture = new THREE.TextureLoader().load(plutoImg);
const jupiter = new THREE.Mesh(
    new THREE.IcosahedronGeometry(1, 10),
    new THREE.MeshBasicMaterial({color: 0xff4800, map: jupiterTexture})
);
jupiter.position.setX(3.5).setY(1.7).setZ(-5);
jupiter.rotation.x += 0.9;
scene.add(jupiter);


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
    new THREE.SphereGeometry(5, 30, 30),
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
    new THREE.SphereGeometry(2.5, 30, 30),
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

/**************************** ANIMATION ***************************************/
function animate() {
    requestAnimationFrame(animate);
    const time = clock.getElapsedTime();
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
    if(window.innerWidth < 820)
        document.getElementById("myjourney").style.marginLeft = `${100 - ((scroll-20)/5)}vw`;
    else
        document.getElementById("myjourney").style.marginLeft = `${100 - ((scroll-80)/5)}vw`;

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
    strings: ['welcome to my website 👋', "I'm a software engineering student 💻^1000"],
    typeSpeed: 40,
    backSpeed: 30,
    loop: true,
    
});

/*******Projects Descriptions********* */
let projectTitle = '';
let projectDescription = '';
let tryButton = '';
let gitLink = '';
let projectImgURLs = [];
let stackImgURLs = [];

const image = document.getElementById('project-img');
const projectElements = document.getElementsByClassName('project');

const setDescription = (git) => {
    document.getElementById('project-title').textContent = projectTitle;
    document.getElementById('description-paragraph').textContent = projectDescription;
    document.getElementById('try-link').href = tryButton;
    const gitButton = document.getElementById('git-link');
    if(git) {
        gitButton.href = gitLink;
        gitButton.style.display = 'block';
    }else{
        gitButton.style.display = 'none';
    }
    const stacks = document.getElementById('stack');
    for(let i = 0; i < stackImgURLs.length; i++){
        const image = document.createElement('img');
        image.src = stackImgURLs[i];
        image.alt = '';
        stacks.appendChild(image);
    }
    stacks.style.alignSelf = 'center';
}

const handleProject = (id) => {
    switch(id){
        case 'p1':
            projectTitle = 'Scrabble Online';
            projectDescription = 'This scrabble game was made for a school project. You can chose between multiplayer mode allowing you to play with friends and random people online or a single player mode against an AI with an easy and hard difficulty.';
            tryButton = 'http://polytechnique-montr-al.gitlab.io/log2990/20213/equipe-205/log2990-205/#/game-options';
            gitLink = 'https://github.com/NaserHamitou/Scrabble-Online';
            projectImgURLs = [scrabbleHome, scrabbleGame, scrabbleOnline];
            stackImgURLs = [angular, aws, mongo, socket, nodej];
            image.src = projectImgURLs[0];
            setDescription(true);
            break;
        case 'p2':
            projectTitle = 'Nas World NFT';
            projectDescription = 'Nas World is an NFT project allowing users to mint their own and unique randomly generated NFT. This web3 application was deployed on the ethereum network. For the purpose of making it avalaible for everyone, the transactions are done on a test networks which means its completely free!';
            tryButton = 'https://nasworld.netlify.app';
            gitLink = 'https://github.com/NaserHamitou/nft-project';
            projectImgURLs = [nasworld, nasempty, nashome];
            stackImgURLs = [solidity, react, hardhat, firebase];
            image.src = projectImgURLs[0];
            setDescription(true);
            break;
        case 'p3':
            projectTitle = 'Self Driving Car'
            projectDescription = 'Self driving robot capable of following a line while being able to turn and stop when facing obstacles. It can be controlled by a wireless infrared signals and can also play sounds. This robot was build from the ground up including the wires, the mechanical parts and the motherboard.'
            tryButton = 'https://cours.polymtl.ca/inf1900/';
            projectImgURLs = [robot, robotusb];
            stackImgURLs = [clang, chip, linux, sensor];
            image.src = projectImgURLs[0];
            setDescription(false);
            break;
        case 'p4':
            projectTitle = 'Robomaster Competition'
            projectDescription = 'International robotics competition between universities. I was part of the computer vision team where we worked on giving the robots the ability to detect different elements on the battleground.';
            tryButton = 'https://www.polystarmtl.com/comp%C3%A9tition-robomaster';
            projectImgURLs = [robo1, robo2, robo3];
            stackImgURLs = [python, opencv, numPy];
            image.src = projectImgURLs[0];
            setDescription(false);
            break;

    }
    document.getElementById('blanket').style.display = 'block';
    document.getElementById('projects-description').style.display = 'flex';
}

for(const project of projectElements) {
    project.addEventListener('click', ()=>{
        handleProject(project.id);
    });
}

let position = 0;
const buttonLeft = document.getElementById('switch-left');
const buttonRight = document.getElementById('switch-right');
const closeProject = document.getElementById('close-project');

closeProject.addEventListener("click", () => {
    document.getElementById('blanket').style.display = 'none';
    document.getElementById('projects-description').style.display = 'none';
    const stack = document.getElementById('stack');
    while(stack.firstChild){
        stack.removeChild(stack.lastChild);
    }
});

const rightButton = () => {
    console.log('right');
    image.src = projectImgURLs[0];

    if(position >= projectImgURLs.length - 1) {
        position = 0;
        image.src = projectImgURLs[position];
    }else {
        image.src = projectImgURLs[position + 1];
        position++;
    }
}

const leftButton = () => {
    console.log('left');
    if(position < 1){
        position = projectImgURLs.length - 1;
        image.src = projectImgURLs[position];
    } else {
        image.src = projectImgURLs[position - 1];
        position--;
    }
}

buttonLeft.addEventListener("click", leftButton, false);
buttonRight.addEventListener("click", rightButton, false);

renderer.render(scene, camera);
Array(1000).fill().forEach(addStar);
animate();
        
        