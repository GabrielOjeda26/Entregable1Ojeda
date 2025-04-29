// Trabajo Practico N°1 Fernando Gabriel Ojeda


const buscarNombreProducto = document.getElementById("buscarNombreProducto");
const buscarCodigo = document.getElementById("buscarCodigo");
const cargarProducto = document.getElementById("cargarProducto");
const cambiarPrecio = document.getElementById("cambiarPrecio");
const eliminarProducto = document.getElementById("eliminarProducto");
const resultado = document.getElementById("resultado");


const productos = [
  { nombre: "Aceite natura x1,5L", codigo: 7729535 , precio: "$3000.00" },
  { nombre: "Aceite cocinero x1,5L", codigo: 7729170 , precio: "$2800.00" },
  { nombre: "Lavandina Ayudin x2L", codigo: 7729845 , precio: "$2000.00" },
  { nombre: "Arroz Tio Carlos largo fino x500g", codigo: 7729322 , precio: "$990.00" },
  { nombre: "Galletas surtidas diversion x500g", codigo: 7729489 , precio: "$2490.00" }
];


function mostrarProductos(productos) {
  let tabla = `
    <table class="tabla" border="1">
      <tr class="tr">
        <th class="th">Nombre artículo</th>
        <th class="th">Código</th>
        <th class="th">Precio</th>
      </tr>
  `;
  productos.forEach((producto) => {
    tabla += `
      <tr>
        <td>${producto.nombre}</td>
        <td>${producto.codigo}</td>
        <td>${producto.precio}</td>
      </tr>
    `;
  });
  tabla += `</table>`;
  resultado.innerHTML = tabla;
}


function buscarPorNombre(){
  buscarNombreProducto.addEventListener('click', () => {
    let nom = prompt("Ingrese el nombre del producto");
    let productosEncontrados = productos.filter(producto => producto.nombre.toLowerCase().includes(nom.toLowerCase()));
    if (productosEncontrados.length > 0) {
      mostrarProductos(productosEncontrados);
    } else {
      resultado.textContent = `No se encontró ningun producto con este nombre: ${nom}`;
    }
  });
}


function buscarPorCodigo(){
  buscarCodigo.addEventListener('click', () => {
    let cod = parseInt(prompt("Ingrese el codigo"));
    let productosEncontrados = productos.find(productos => productos.codigo === cod);
    if (productosEncontrados) {
      mostrarProductos([productosEncontrados]);
    } else {
      resultado.textContent = `No se encontró ningun producto con este codigo: ${cod}`;
    }
  });
}


function nuevoProducto(){
  cargarProducto.addEventListener('click', () => {
    let nom = prompt("Ingrese el nombre");
    let nuevoCodigo = parseInt(prompt("Ingrese el codigo del producto"));
    let nuevoPrecio = parseInt(prompt("Ingrese el precio del producto"));
    let productoNuevo = { nombre: nom, codigo: nuevoCodigo, precio: `$${nuevoPrecio}` };
    productos.push(productoNuevo);
    mostrarProductos([productoNuevo]);
  });
}


function cambioDePrecios() {
  cambiarPrecio.addEventListener('click', () => {
    let productosConCheckbox = productos.map((producto, index) => {
      return { ...producto, checkbox: `<input type="checkbox" id="producto-${index}" value="${index}">` };
    });
    let tabla = `
      <table class="tabla" border="1">
        <tr class="tr">
          <th class="th">Seleccionar</th>
          <th class="th">Nombre artículo</th>
          <th class="th">Código</th>
          <th class="th">Precio</th>
        </tr>
    `;
    productosConCheckbox.forEach((producto) => {
      tabla += `
        <tr>
          <td>${producto.checkbox}</td>
          <td>${producto.nombre}</td>
          <td>${producto.codigo}</td>
          <td>${producto.precio}</td>
        </tr>
      `;
    });
    tabla += `</table>`;
    resultado.innerHTML = tabla;

    let botonActualizar = document.createElement("button");
    botonActualizar.textContent = "Actualizar precios";
    botonActualizar.id = "boton-actualizar";
    botonActualizar.classList.add("boton-actualizar");

    let botonCancelar = document.createElement("button");
    botonCancelar.textContent = "Cancelar";
    botonCancelar.id = "boton-cancelar";
    botonCancelar.classList.add("boton-cancelar");

    let contenedorBotones = document.createElement("div");
    contenedorBotones.classList.add("contenedor-botones");
    contenedorBotones.style.textAlign = "center";
    contenedorBotones.appendChild(botonActualizar);
    contenedorBotones.appendChild(botonCancelar);

    resultado.appendChild(contenedorBotones);

    document.getElementById("boton-actualizar").addEventListener("click", () => {
      let seleccionados = [];
      productos.forEach((producto, index) => {
        let checkbox = document.getElementById(`producto-${index}`);
        if (checkbox.checked) {
          seleccionados.push(index);
        }
      });
      seleccionados.forEach(indice => {
        let tipo = prompt(`¿Qué desea hacer con el precio de ${productos[indice].nombre}? (1) Aumentar, (2) Disminuir`);
        let porcentaje = prompt(`Ingrese el porcentaje`);
        let precioActual = parseFloat(productos[indice].precio.replace("$", ""));
        let nuevoPrecio;
        if (tipo === "1") {
          nuevoPrecio = precioActual + (precioActual * parseFloat(porcentaje) / 100);
        } else if (tipo === "2") {
          nuevoPrecio = precioActual - (precioActual * parseFloat(porcentaje) / 100);
          if (nuevoPrecio < 0) {
            nuevoPrecio = 0;
          }
        } else {
          alert("Opción inválida");
          return;
        }
        productos[indice].precio = `$${nuevoPrecio.toFixed(2)}`;
      });
      resultado.textContent = "Precios actualizados";
      mostrarProductos(productos);
    });

    document.getElementById("boton-cancelar").addEventListener("click", () => {
      window.location.reload();
    });
  });
}


function eliminar() {
  eliminarProducto.addEventListener('click', () => {
    let productosConCheckbox = productos.map((producto, index) => {
      return { ...producto, checkbox: `<input type="checkbox" id="producto-${index}" value="${index}">` };
    });
    let tabla = `
      <table class="tabla" border="1">
        <tr class="tr">
          <th class="th">Seleccionar</th>
          <th class="th">Nombre artículo</th>
          <th class="th">Código</th>
          <th class="th">Precio</th>
        </tr>
    `;
    productosConCheckbox.forEach((producto) => {
      tabla += `
        <tr>
          <td>${producto.checkbox}</td>
          <td>${producto.nombre}</td>
          <td>${producto.codigo}</td>
          <td>${producto.precio}</td>
        </tr>
      `;
    });
    tabla += `</table>`;
    resultado.innerHTML = tabla;

    let botonEliminar = document.createElement("button");
    botonEliminar.textContent = "Eliminar";
    botonEliminar.id = "boton-eliminar";
    botonEliminar.classList.add("boton-eliminar");

    let botonCancelar = document.createElement("button");
    botonCancelar.textContent = "Cancelar";
    botonCancelar.id = "boton-cancelar";
    botonCancelar.classList.add("boton-cancelar");

    let contenedorBotones = document.createElement("div");
    contenedorBotones.classList.add("contenedor-botones");
    contenedorBotones.style.textAlign = "center";
    contenedorBotones.appendChild(botonEliminar);
    contenedorBotones.appendChild(botonCancelar);

    resultado.appendChild(contenedorBotones);

    document.getElementById("boton-eliminar").addEventListener("click", () => {
      let seleccionados = [];
      productos.forEach((producto, index) => {
        let checkbox = document.getElementById(`producto-${index}`);
        if (checkbox.checked) {
          seleccionados.push(index);
        }
      });
      seleccionados.sort((a, b) => b - a).forEach(indice => {
        productos.splice(indice, 1);
      });
      resultado.textContent = "Artículos eliminados";
      mostrarProductos(productos);
    });

    document.getElementById("boton-cancelar").addEventListener("click", () => {
      window.location.reload()
    });
  });
}


buscarPorNombre();
buscarPorCodigo();
nuevoProducto();
cambioDePrecios();
eliminar();