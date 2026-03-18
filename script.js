/* ================= COUNTDOWN ================= */

const eventDate = new Date("March 23, 2026 00:00:00").getTime();

function updateCountdown() {
  const now = new Date().getTime();
  const gap = eventDate - now;

  if (gap <= 0) {
    document.getElementById("days").innerText = "00";
    document.getElementById("hours").innerText = "00";
    document.getElementById("mins").innerText = "00";
    document.getElementById("secs").innerText = "00";
    return;
  }

  const days = Math.floor(gap / (1000 * 60 * 60 * 24));
  const hours = Math.floor((gap / (1000 * 60 * 60)) % 24);
  const mins = Math.floor((gap / (1000 * 60)) % 60);
  const secs = Math.floor((gap / 1000) % 60);

  document.getElementById("days").innerText = String(days).padStart(2, '0');
  document.getElementById("hours").innerText = String(hours).padStart(2, '0');
  document.getElementById("mins").innerText = String(mins).padStart(2, '0');
  document.getElementById("secs").innerText = String(secs).padStart(2, '0');
}

setInterval(updateCountdown, 1000);
updateCountdown();

/* ================= PARTICLES ================= */

const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

/* ✅ Responsive canvas */
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

let particles = [];

/* 🔥 Create particles */
function createParticles() {
  particles = [];
  for (let i = 0; i < 150; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 3,
      speedY: Math.random() * 1 + 0.5,
      speedX: (Math.random() - 0.5) * 0.5,
      color: Math.random() > 0.5 ? "orange" : "blue"
    });
  }
}
createParticles();

/* 🔥 Draw particles */
function drawParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach(p => {
    ctx.fillStyle = p.color;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fill();

    /* movement */
    p.y -= p.speedY;
    p.x += p.speedX;

    /* reset */
    if (p.y < 0) {
      p.y = canvas.height;
      p.x = Math.random() * canvas.width;
    }
  });

  requestAnimationFrame(drawParticles);
}
drawParticles();

/* ================= LIGHTNING FLASH ================= */

/* ⚡ Sync with CSS lightning */
setInterval(() => {
  document.body.style.filter = "brightness(1.2)";
  setTimeout(() => {
    document.body.style.filter = "brightness(1)";
  }, 120);
}, 6000);

/* ================= OPTIONAL: MOUSE GLOW ================= */

document.addEventListener("mousemove", (e) => {
  const glow = document.createElement("div");
  glow.style.position = "fixed";
  glow.style.left = e.clientX + "px";
  glow.style.top = e.clientY + "px";
  glow.style.width = "5px";
  glow.style.height = "5px";
  glow.style.background = "orange";
  glow.style.borderRadius = "50%";
  glow.style.pointerEvents = "none";
  glow.style.boxShadow = "0 0 15px orange";
  glow.style.zIndex = "999";

  document.body.appendChild(glow);

  setTimeout(() => {
    glow.remove();
  }, 300);
});
/* ================= 3D PARALLAX EFFECT ================= */

const bg = document.querySelector(".parallax-bg");

document.addEventListener("mousemove", (e) => {
  const x = (window.innerWidth / 2 - e.clientX) / 30;
  const y = (window.innerHeight / 2 - e.clientY) / 30;

  bg.style.transform = `translate(${x}px, ${y}px) scale(1.05)`;
});
/* ================= 3D GALAXY (THREE.JS) ================= */

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById("three-bg").appendChild(renderer.domElement);

/* 🌌 Create stars */
const starsGeometry = new THREE.BufferGeometry();
const starsCount = 3000;

const positions = new Float32Array(starsCount * 3);

for (let i = 0; i < starsCount * 3; i++) {
  positions[i] = (Math.random() - 0.5) * 2000;
}

starsGeometry.setAttribute(
  "position",
  new THREE.BufferAttribute(positions, 3)
);

const starsMaterial = new THREE.PointsMaterial({
  color: 0xffffff,
  size: 1.5
});

const stars = new THREE.Points(starsGeometry, starsMaterial);
scene.add(stars);

camera.position.z = 5;

/* 🌌 Animate galaxy */
function animateGalaxy() {
  requestAnimationFrame(animateGalaxy);

  stars.rotation.y += 0.0005;
  stars.rotation.x += 0.0002;

  renderer.render(scene, camera);
}

animateGalaxy();

/* 🎮 Mouse interaction */
document.addEventListener("mousemove", (e) => {
  const x = (e.clientX / window.innerWidth - 0.5) * 2;
  const y = (e.clientY / window.innerHeight - 0.5) * 2;

  camera.position.x = x * 5;
  camera.position.y = -y * 5;
});

/* 📱 Resize fix */
window.addEventListener("resize", () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});