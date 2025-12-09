// Confetis

//
// 1. Configuración Inicial
window.oncontextmenu = function () {
  return false;
};

const canvasConfeti = document.getElementById("canvas1"); //Lienzo
const ctxConfeti = canvasConfeti.getContext("2d"); // Funciones

let ancho = (canvasConfeti.width = window.innerWidth);
let alto = (canvasConfeti.height = window.innerHeight);

let confetis = [];

const coloresConfeti = [
  "rgba(236, 225, 175, 1)",
  "rgba(105, 156, 185, 1)",
  "rgba(243, 179, 224, 1)",
  "rgba(248, 93, 116, 1)",
  "rgba(68, 38, 204, 1)",
  "rgba(34, 168, 52, 1)",
  "rgba(179, 81, 24, 1)",
];

//
// 2. Crear Confeti
//
function crearConfeti() {
  const cantidad = 100;
  for (let i = 0; i < cantidad; i++) {
    confetis.push({
      x: Math.random() * ancho, // Posición Horizontal Aleatoria
      y: Math.random() * -alto, // Posición Vertical Aleatoria (Desde arriba por el negativo)
      r: Math.random() * 5 + 2, // Radio Aleatorio (2 y 7 Pixeles)
      color: coloresConfeti[Math.floor(Math.random() * coloresConfeti.length)],
      velocidadY: Math.random() * 2 + 1, // Velocidad Aleatoria (1 y 3 Pixeles/Frame)
    });
  }
}

//
// 3. Dibujar y Mover Confeti
//
function animarConfeti() {
  ctxConfeti.fillStyle = "rgba(255, 255, 255, 1)"; // Fondo Rosa Pastel
  ctxConfeti.fillRect(0, 0, ancho, alto);

  for (let i = 0; i < confetis.length; i++) {
    let confetiActual = confetis[i];

    ctxConfeti.beginPath(); // Empezamos Una Nueva Figura
    ctxConfeti.arc(
      confetiActual.x,
      confetiActual.y,
      confetiActual.r,
      0,
      Math.PI * 2
    ); // Dibujamos Un Círculo
    ctxConfeti.fillStyle = confetiActual.color; // Color
    ctxConfeti.fill(); // Rellenamos El Círculo

    // Movimiento (Caída Libre)
    confetiActual.y += confetiActual.velocidadY;

    // Si Termina De Caer, Aparece Arriba Nuevamente
    if (confetiActual.y > alto) {
      confetiActual.y = -10;
      confetiActual.x = Math.random() * ancho;
    }
  }

  // Animación Continua (Llama de nuevo a la función)
  requestAnimationFrame(animarConfeti);
}

crearConfeti();

// Esperar 1 segundo antes de iniciar el confeti
setTimeout(() => {
  animarConfeti();
}, 1500);