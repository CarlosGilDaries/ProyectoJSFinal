let items = document.getElementById('items');
let lista = document.getElementById('lista-carrito');
let total = document.getElementById('total');

function botonCantidad(id) {
    let cantidad = document.getElementById(id); // Obtener el elemento que muestra la cantidad
    let nombreProducto = id.split("Cantidad")[0]; // Obtener el nombre del producto
    let precioElemento = document.getElementById("precio" + nombreProducto);
    let boton = document.createElement('button');
    boton.textContent = "X";

    // Aumentamos la cantidad
    cantidad.textContent = parseInt(cantidad.textContent) + 1;

    // Verificamos si ya existe en localStorage
    if (!localStorage.getItem(nombreProducto)) {
        // Si no existe, lo guardamos en localStorage
        localStorage.setItem(nombreProducto, cantidad.textContent);

        // Crear el elemento de la lista para el carrito
        let elementoLista = document.createElement('li');
        elementoLista.id = nombreProducto + "CantidadCarrito";
        elementoLista.textContent = nombreProducto + " - " + cantidad.textContent + " * " + precioElemento.textContent + " - ";
        
        // Añadir el botón de eliminar
        elementoLista.appendChild(boton);
        
        // Añadir el elemento a la lista
        lista.appendChild(elementoLista);

        // Agregar el evento para eliminar el elemento de la lista
        boton.addEventListener('click', function () {
            localStorage.removeItem(nombreProducto); // Eliminar de localStorage
            elementoLista.remove(); // Eliminar de la lista del carrito
            actualizarTotal(); // Actualizar el total después de eliminar el artículo
            cantidad.textContent = 0;
        });
    } else {
        // Si ya existe en localStorage, actualizamos la cantidad
        let cantidadGuardada = parseInt(localStorage.getItem(nombreProducto)) + 1;
        localStorage.setItem(nombreProducto, cantidadGuardada);

        // Actualizamos el texto del elemento de la lista
        let elementoLista = document.getElementById(nombreProducto + "CantidadCarrito");
        elementoLista.textContent = nombreProducto + " - " + cantidadGuardada + " * " + precioElemento.textContent + " - ";
        
        // Reagregamos el botón de eliminación para actualizarlo
        elementoLista.appendChild(boton);
        
        // Agregar el evento de eliminación para el producto en localStorage
        boton.addEventListener('click', function () {
            localStorage.removeItem(nombreProducto); // Eliminar del localStorage
            elementoLista.remove(); // Eliminar de la lista del carrito
            actualizarTotal(); // Actualizar el total después de eliminar el artículo
            cantidad.textContent = 0;
        });
    }

    actualizarTotal(); // Actualizar el total después de añadir un artículo
}
function productos(data) {
    data.forEach(element => {
        let producto = document.createElement('div');
        let divNombre = document.createElement('div');
        producto.className = 'producto';
        let nombre = document.createElement('p');
        nombre.className = 'nombre';
        let divImagenPrecio = document.createElement('div');
        //divImagenPrecio.className = 'divImagenPrecio';
        let imagen = document.createElement('img');
        imagen.className = 'card-image';
        let precio = document.createElement('span');
        precio.className = 'precio';
        precio.id = "precio" + element.nombre;
        let divCantidadBoton = document.createElement('div');
        divCantidadBoton.className = 'divCantidadBoton';
        let divCantidad = document.createElement('div');
        divCantidad.className = 'unidades';
        let cantidad = document.createElement('span');
        cantidad.id = element.nombre + "Cantidad"
        let sumar = document.createElement('button');
        sumar.id = element.nombre;
        sumar.className = 'sumarCantidad';

        items.appendChild(producto);
        producto.appendChild(divNombre);
        divNombre.appendChild(nombre);
        nombre.textContent = element.nombre;
        producto.appendChild(imagen);
        imagen.src = "img/" + element.foto;
        precio.textContent = element.precio + " €";
        producto.appendChild(precio);
        producto.appendChild(divCantidadBoton);
        divCantidadBoton.appendChild(divCantidad);
        divCantidad.appendChild(cantidad);
        cantidad.textContent = 0;
        divCantidadBoton.appendChild(sumar);
        sumar.textContent = "+";
    });
    let botones = document.querySelectorAll('.sumarCantidad');

    botones.forEach(element => {
        element.addEventListener('click', () => botonCantidad(element.id + "Cantidad"));
    });

    // Llamamos a la función para cargar los productos guardados en localStorage
    cargarCarrito();
}

function cargarCarrito() {
    // Recorrer el localStorage para generar la lista de productos en el carrito
    for (let i = 0; i < localStorage.length; i++) {
        let nombreProducto = localStorage.key(i); // Obtener el nombre del producto desde el localStorage
        let cantidad = localStorage.getItem(nombreProducto); // Obtener la cantidad guardada
        let precioElemento = document.getElementById("precio" + nombreProducto); // Obtener el precio del producto
        let boton = document.createElement('button');
        boton.textContent = "X";

        // Crear el elemento de la lista para el carrito
        let elementoLista = document.createElement('li');
        elementoLista.id = nombreProducto + "CantidadCarrito";
        elementoLista.textContent = nombreProducto + " - " + cantidad + " * " + precioElemento.textContent + " - ";
        
        // Añadir el botón de eliminar
        elementoLista.appendChild(boton);
        
        // Añadir el elemento a la lista
        lista.appendChild(elementoLista);

        // Agregar el evento de eliminar
        boton.addEventListener('click', function () {
            localStorage.removeItem(nombreProducto); // Eliminar de localStorage
            elementoLista.remove(); // Eliminar de la lista
            actualizarTotal(); // Actualizar el total después de eliminar un artículo
            cantidad.textContent = 0;
        });
    }
    actualizarTotal(); // Actualizar el total al cargar el carrito
}

function actualizarTotal() {
    let totalCarrito = 0;
    // Recorrer los elementos del carrito y calcular el total
    for (let i = 0; i < localStorage.length; i++) {
        let nombreProducto = localStorage.key(i);
        let cantidad = parseInt(localStorage.getItem(nombreProducto));
        let precioElemento = document.getElementById("precio" + nombreProducto);
        let precio = parseFloat(precioElemento.textContent.replace(' €', ''));
        totalCarrito += cantidad * precio;
    }
    total.textContent = totalCarrito.toFixed(2); // Mostrar el total con dos decimales
}

fetch('php/productos.php')
    .then(response => {
        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        productos(data);
    })
    .catch(error => {
        console.log(error);
    });


