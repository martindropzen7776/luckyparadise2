import * as THREE from 'three';
import { gsap } from 'gsap';

// Game links configuration
const gameLinks = [
  'https://whatsapp.com/channel/0029Vaqa7F6002T8UOkUH82Y',
  'https://whatsapp.com/channel/0029VaqYJyP2v1InW4NZuQ3n'
];

// Initialize Three.js background
const initBackground = () => {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ alpha: true });
  
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.getElementById('background-animation').appendChild(renderer.domElement);

  const particles = new THREE.BufferGeometry();
  const particleCount = 1000;
  const posArray = new Float32Array(particleCount * 3);

  for(let i = 0; i < particleCount * 3; i++) {
    posArray[i] = (Math.random() - 0.5) * 5;
  }

  particles.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
  const material = new THREE.PointsMaterial({
    size: 0.005,
    color: 0xa855f7,
    transparent: true,
    opacity: 0.8,
    blending: THREE.AdditiveBlending
  });

  const particleSystem = new THREE.Points(particles, material);
  scene.add(particleSystem);
  camera.position.z = 2;

  const animate = () => {
    requestAnimationFrame(animate);
    particleSystem.rotation.x += 0.0001;
    particleSystem.rotation.y += 0.0001;
    renderer.render(scene, camera);
  };

  animate();

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
};

// Initialize button interactions
const initButton = () => {
  const button = document.getElementById('play-button');
  const buttonGlow = document.querySelector('.button-glow');

  button.addEventListener('click', () => {
    gsap.to(button, {
      scale: 0.95,
      duration: 0.1,
      onComplete: () => {
        gsap.to(button, {
          scale: 1,
          duration: 0.1,
          onComplete: () => {
            const randomLink = gameLinks[Math.floor(Math.random() * gameLinks.length)];
            window.location.href = randomLink;
          }
        });
      }
    });
  });

  button.addEventListener('mouseenter', () => {
    gsap.to(buttonGlow, {
      opacity: 1,
      scale: 1.2,
      duration: 0.3
    });
  });

  button.addEventListener('mouseleave', () => {
    gsap.to(buttonGlow, {
      opacity: 0,
      scale: 1,
      duration: 0.3
    });
  });
};

// Initialize everything when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  initBackground();
  initButton();
});