import { cargarCarrito } from './carrito.js';
import { botonCantidad } from './carrito.js';

let items = document.getElementById('items');

export function productos(data) {
  data.forEach((element) => {
    let producto = document.createElement('div');
    let divNombre = document.createElement('div');
    producto.className = 'producto';
    let nombre = document.createElement('p');
    nombre.className = 'nombre';
    let imagen = document.createElement('img');
    imagen.className = 'card-image';
    let precio = document.createElement('span');
    precio.className = 'precio';
    precio.id = 'precio' + element.nombre;
    let divCantidadBoton = document.createElement('div');
    divCantidadBoton.className = 'divCantidadBoton';
    let divCantidad = document.createElement('div');
    divCantidad.className = 'unidades';
    let cantidad = document.createElement('span');
    cantidad.id = element.nombre + 'Cantidad';
    cantidad.className = 'cantidades';
    let sumar = document.createElement('button');
    sumar.id = element.nombre;
    sumar.className = 'sumarCantidad';

    items.appendChild(producto);
    producto.appendChild(divNombre);
    divNombre.appendChild(nombre);
    nombre.textContent = element.nombre;
    producto.appendChild(imagen);
    imagen.src = 'img/' + element.foto;
    precio.textContent = element.precio + ' €';
    producto.appendChild(precio);
    producto.appendChild(divCantidadBoton);
    divCantidadBoton.appendChild(divCantidad);
    divCantidad.appendChild(cantidad);
    if (localStorage.getItem(element.nombre)) {
      cantidad.textContent = localStorage.getItem(element.nombre);
    } else {
      cantidad.textContent = 0;
    }
    divCantidadBoton.appendChild(sumar);
    sumar.textContent = '+';
  });
  let botones = document.querySelectorAll('.sumarCantidad');

  botones.forEach((element) => {
    element.addEventListener('click', () =>
      botonCantidad(element.id + 'Cantidad')
    );
  });

  // Llamamos a la función para cargar los productos guardados en localStorage
  cargarCarrito();
}
