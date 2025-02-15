import { productos } from './productos.js';
import { tramitar, borrar } from './tramitar-borrar.js';

let botonTramitar = document.getElementById('tramitar');
let botonBorrar = document.getElementById('borrar');

fetch('php/productos.php')
  .then((response) => {
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }
    return response.json();
  })
  .then((data) => {
    productos(data);
  })
  .catch((error) => {
    console.log(error);
  });

botonBorrar.addEventListener('click', borrar);
botonTramitar.addEventListener('click', tramitar);
