<h1>Breakout Game - README</h1>

Desarrollado por: Diego de la Vega Saishio - A01420632

<h2>Descripción</h2>

Este es un juego clásico de Breakout desarrollado con JavaScript y HTML Canvas. El objetivo es destruir todos los bloques en la pantalla usando una pelota que rebota en una paleta controlada por el jugador.

<h2>Cómo ejecutar el juego</h2>

<ol>
  <li>Abre el archivo breakout.html en tu navegador web</li>
  <li>El juego comenzará automáticamente con la pelota posicionada sobre la paleta</li>
</ol>

<h2>Controles</h2>

<ol>
  <li>Flecha izquierda o a: Mover la paleta hacia la izquierda</li>
  <li>Flecha derecha o d: Mover la paleta hacia la derecha</li>
  <li>r: Lanzar la pelota cuando está sobre la paleta</li>
</ol>

<h2>Reglas del juego</h2>

<ul>
  <li><b>Objetivo</b>: Destruir todos los bloques de la pantalla para avanzar al siguiente nivel</li>
  <li><b>Vidas</b>: Comienzas con 3 vidas</li>
  <li><b>Pérdida de vida</b>: Si la pelota toca la parte inferior de la pantalla, pierdes una vida</li>
  <li><b>Game Over</b>: Si pierdes todas tus vidas, el juego termina</li>
  <li><b>Niveles</b>: Cada vez que elimines todos los bloques, avanzarás al siguiente nivel</li>
  <li><b>Dificultad</b>: En cada nivel nuevo se aumenta el número de filas de bloques</li>
</ul>

<h2>Puntuación</h2>

<ul>
  <li>Cada bloque destruido aumenta tu contador de bloques destruidos</li>
  <li>La puntuación se mantiene entre niveles, pero se reinicia si pierdes todas tus vidas</li>
</ul>

<h2>Estructura de archivos</h2>

<ul>
  <li>breakout.html: Archivo principal HTML para ejecutar el juego</li>
  <li>breakout.js: Lógica principal del juego</li>
  <li>clasesB.js: Clases base para los objetos del juego</li>
  <li>stylesB.css: Estilos para la interfaz</li>
</ul>




