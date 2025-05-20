// Trabajo Practico N°1 Fernando Gabriel Ojeda


const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
if (usuarios.length === 0) {
  const administrador = {
    nombre: "Gabriel",
    apellido: "Ojeda",
    fechaNacimiento: "26/05/2000",
    dni: "42712656",
    esAdministrador: true,
    usuario: "Gabi",
    contraseña: "1234"
  };
  usuarios.push(administrador);
  localStorage.setItem("usuarios", JSON.stringify(usuarios));
}


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


function verificarUsuario() {
  const usuarioLogueado = localStorage.getItem("usuarioLogueado");
  if (usuarioLogueado) {
    const usuario = JSON.parse(usuarioLogueado);
    if (usuario.esAdministrador) {
      mostrarContenidoAdministrador();
    } else {
      mostrarContenidoEmpleado();
    }
  } else {
    mostrarFormularioLogin();
  }
}


function mostrarFormularioLogin() {
  const formulario = `
    <div class="logo">
      <span class="titulo">Minimercado</span>
      <img class="img" src="./img/carrito-de-compras.png" alt="">
    </div>
    <form id="formulario-login">
      <div class="sesion">
        <label for="usuario" class="label">Usuario</label> Gabi(para ingresar como admin),coder(para ingresar como empleado)
        <input type="text" id="usuario" name="usuario" class="input">1234(para ingresar como admin y como empleado)
        <label for="contraseña" class="label">Contraseña</label>
        <input type="password" id="contraseña" name="contraseña" class="input">
        <div class="boton-actualizar">
          <button type="submit">Iniciar sesión</button>
        </div>
      </div>
    </form>
    <div class="crear-usuario">
      <button id="crear-usuario">Crear usuario</button>
    </div>
  `;
  document.body.innerHTML = formulario;
  document.getElementById("crear-usuario").addEventListener("click", mostrarFormularioCrearUsuario);
  document.getElementById("formulario-login").addEventListener("submit", verificarCredenciales);
}


function mostrarFormularioCrearUsuario() {
  const formulario = `
    <form id="formulario-crear-usuario" class="form">
      <div class="sesion">
        <label for="nombre" class="label">Nombre:</label>
        <input type="text" id="nombre" name="nombre" class="input"><br><br>
        <label for="apellido" class="label">Apellido:</label>
        <input type="text" id="apellido" name="apellido" class="input"><br><br>
        <label for="fecha-nacimiento" class="label">Fecha de nacimiento:</label>
        <input type="date" id="fecha-nacimiento" name="fecha-nacimiento" class="input"><br><br>
        <label for="dni" class="label">DNI:</label>
        <input type="number" id="dni" name="dni" class="input"><br><br>
        <label for="usuario" class="label">Usuario:</label>
        <input type="text" id="usuario" name="usuario" class="input"><br><br>
        <label for="contraseña" class="label">Contraseña:</label>
        <input type="password" id="contraseña" name="contraseña" class="input"><br><br>
        <button type="submit" class="crear-usuario">Crear usuario</button>
        </div>
    </form>
  `;
  document.body.innerHTML = formulario;
  document.getElementById("formulario-crear-usuario").addEventListener("submit", crearUsuario);
}


function crearUsuario(event) {
  event.preventDefault();
  const nombre = document.getElementById("nombre").value;
  const apellido = document.getElementById("apellido").value;
  const fechaNacimiento = document.getElementById("fecha-nacimiento").value;
  const dni = document.getElementById("dni").value;
  const usuario = document.getElementById("usuario").value;
  const contraseña = document.getElementById("contraseña").value;
  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
  usuarios.push({
    nombre,
    apellido,
    fechaNacimiento,
    dni,
    esAdministrador,
    usuario,
    contraseña
  });
  localStorage.setItem("usuarios", JSON.stringify(usuarios));
  mostrarFormularioLogin();
}


function eliminarUsuarioFuncion() {
  eliminarUsuario.addEventListener('click', () => {
  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
  const usuarioAEliminar = prompt("Ingrese el usuario a eliminar");
  const usuariosActualizados = usuarios.filter(u => u.usuario !== usuarioAEliminar);
  localStorage.setItem("usuarios", JSON.stringify(usuariosActualizados));
  })
}


function verificarCredenciales(event) {
  event.preventDefault();
  const usuario = document.getElementById("usuario").value;
  const contraseña = document.getElementById("contraseña").value;
  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
  const usuarioEncontrado = usuarios.find(u => u.usuario === usuario && u.contraseña === contraseña);
  if (usuarioEncontrado) {
    localStorage.setItem("usuarioLogueado", JSON.stringify(usuarioEncontrado));
    verificarUsuario();
  } else {
    alert("Usuario o contraseña incorrecta");
  }
}


function mostrarContenidoAdministrador() {
  document.body.innerHTML = `
    <div class="logo">
            <span class="titulo">Minimercado</span>
            <img class="img" src="./img/carrito-de-compras.png" alt="">
    </div>  
    <div class="botones">
        <button id="buscarNombreProducto" class="button is-success">Buscar por nombre</button>
        <button id="buscarCodigo" class="button is-success">Buscar por codigo</button>
        <button id="cargarProducto" class="button is-success">Cargar nuevo producto</button>
        <button id="cambiarPrecio" class="button is-success">Cambiar precios</button>
        <button id="eliminarProducto" class="button is-danger">Eliminar Producto</button>
        <button id="eliminarUsuario" class="button is-danger">Eliminar Usuario</button>
        <button id="cerrar" class="boton-cancelar">Cerrar sesion</button>
    </div>
    <p id="resultado"></p>
    <br><br>
    <p>
       Este simulador esta basado en un minimercado, y su funcionalidad consiste en facilitarle <br>
       el trabajo al dueño de este minimercado, ya sea para buscar, cargar, cambiar el precio o eliminar un producto.
    </p>
  `;
  const buscarNombreProducto = document.getElementById("buscarNombreProducto");
  const buscarCodigo = document.getElementById("buscarCodigo");
  const cargarProducto = document.getElementById("cargarProducto");
  const cambiarPrecio = document.getElementById("cambiarPrecio");
  const eliminarProducto = document.getElementById("eliminarProducto");
  const eliminarUsuario = document.getElementById("eliminarUsuario");
  const cerrar = document.getElementById("cerrar");
  const resultado = document.getElementById("resultado");
  buscarPorNombre();
  buscarPorCodigo();
  nuevoProducto();
  cambioDePrecios();
  eliminar();
  eliminarUsuarioFuncion();
  cerrarSesion();
}


function mostrarContenidoEmpleado() {
  document.body.innerHTML = `
    <div class="logo">
      <span class="titulo">Minimercado</span>
      <img class="img" src="./img/carrito-de-compras.png" alt="">
    </div>  
    <div class="botones">
      <button id="buscarNombreProducto" class="button is-success">Buscar por nombre</button>
      <button id="buscarCodigo" class="button is-success">Buscar por codigo</button>
      <button id="cerrar" class="boton-cancelar">Cerrar sesion</button>
    </div>
    <p id="resultado"></p>
    <br><br>
    <p>
       Este simulador esta basado en un minimercado, y su funcionalidad consiste en facilitarle <br>
       el trabajo al dueño de este minimercado, ya sea para buscar, cargar, cambiar el precio o eliminar un producto.
    </p>
  `;
  const buscarNombreProducto = document.getElementById("buscarNombreProducto");
  const buscarCodigo = document.getElementById("buscarCodigo");
  const cerrar = document.getElementById("cerrar");
  const resultado = document.getElementById("resultado");
  buscarPorNombre();
  buscarPorCodigo();
  cerrarSesion();
}


function cerrarSesion(){
  cerrar.addEventListener('click', () => {
localStorage.removeItem("usuarioLogueado");
verificarUsuario();
  })
}


verificarUsuario();
