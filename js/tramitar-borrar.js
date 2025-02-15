import { actualizarTotal } from './carrito.js';

let lista = document.getElementById('lista-carrito');

export function tramitar () {
  if (localStorage.length === 0) {
    alert('El carrito está vacío. No hay nada que tramitar.');
    return;
  }

  if (confirm('¿Estás seguro de que quieres tramitar el pedido?')) {
    fetch('php/tramito_carrito.php', {
      method: 'POST',
      body: JSON.stringify({ carrito: localStorage }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((response) => response.json())
    .then((data) => {
      if (data.status === 'ok') {
        localStorage.clear();
        lista.innerHTML = '';
        actualizarTotal();
        let cantidades = document.querySelectorAll('.cantidades');
        cantidades.forEach((element) => {
          element.textContent = 0;
        });
        alert('Pedido tramitado con éxito.');
      } else {
        alert('Error al tramitar el pedido. Inténtalo de nuevo.');
      }
    })
    .catch((error) => {
      console.error('Error en la solicitud:', error);
      alert('Hubo un problema con el servidor.');
    });
  }  
}

export function borrar() {
  if (localStorage.length === 0) {
    alert('El carrito ya está vacío.');
    return;
  }

  if (confirm('¿Estás seguro de que quieres vaciar el carrito?')) {
    localStorage.clear();
    lista.innerHTML = '';
    actualizarTotal();
    let cantidades = document.querySelectorAll('.cantidades');
    cantidades.forEach((element) => {
      element.textContent = 0;
    });
    alert('Carrito vaciado.');
  }
}
