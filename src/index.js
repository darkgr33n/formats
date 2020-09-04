import "./style.css";
import { gsap } from 'gsap/index';
const appDiv = document.getElementById('app');
appDiv.innerHTML = `<div class="box1"></div><div class="box2"></div>`;

const box1 = document.querySelector('.box1');
const box2 = document.querySelector('.box2');

// New style tween
gsap.to(box1, { duration: 3, x: 250, repeat: 10, yoyo: true});