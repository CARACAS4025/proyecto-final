// Productos
const productos = [
    {
        id: 1,
        nombre: "Laptop Lenovo",
        descripcion: "Laptop Lenovo de 14 pulgadas, 8GB RAM, 256GB SSD.",
        precio: 799.99,
        imagen: "https://images-na.ssl-images-amazon.com/images/I/915S89xhGgL._SL1500_.jpg"
    },
    {
        id: 2,
        nombre: "Mouse Inalámbrico",
        descripcion: "Mouse inalámbrico ergonómico con conexión USB.",
        precio: 19.99,
        imagen: "https://anavatec.pe/wp-content/uploads/2021/06/mouse-negro-usb-3.png"
    },
    {
        id: 3,
        nombre: "Teclado Mecánico",
        descripcion: "Teclado mecánico retroiluminado para juegos.",
        precio: 49.99,
        imagen: "https://tse2.mm.bing.net/th?id=OIP.uwoQoGe_2D1kGyI9yEwZ1gHaHm&pid=Api&P=0&h=180"
    },
    {
        id: 4,
        nombre: "Monitor Samsung",
        descripcion: "Monitor Samsung de 24 pulgadas Full HD.",
        precio: 129.99,
        imagen: "https://resources.claroshop.com/medios-plazavip/s2/10487/1852964/5f9a5b5fc5206-bda802b9-6fcd-4e84-b82c-3e73b634f5e3-1600x1600.jpg"
    },
    {
        id: 5,
        nombre: "Disco Duro Externo",
        descripcion: "Disco duro externo de 1TB, USB 3.0.",
        precio: 59.99,
        imagen: "https://repararelpc.es/wp-content/uploads/2020/10/disco-duro-externo-2-1536x1190.jpg"
    }
];

// Carrito de compras Local
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// Guarda el carrito en Local
function guardarCarrito() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

// Actualiza el contador del carrito en la interfaz
function actualizarContadorCarrito() {
    document.getElementById("cart-count").textContent = carrito.reduce((total, producto) => total + producto.cantidad, 0);
}

// Muestra los productos como tarjeta
function mostrarProductos() {
    const productContainer = document.getElementById("product-container");
    productContainer.innerHTML = productos.map(producto => `
        <div class="card" style="width: 18rem;">
            <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}">
            <div class="card-body">
                <h5 class="card-title">${producto.nombre}</h5>
                <h6 class="card-subtitle mb-2 text-muted">$${producto.precio.toFixed(2)}</h6>
                <p class="card-text">${producto.descripcion}</p>
                <button onclick="añadirAlCarrito(${producto.id})" class="btn btn-success">Añadir al Carrito</button>
            </div>
        </div>
    `).join("");
}

// Añadir un producto al carrito
function añadirAlCarrito(productoId) {
    const producto = productos.find(p => p.id === productoId);
    const productoEnCarrito = carrito.find(p => p.id === productoId);

    if (productoEnCarrito) {
        productoEnCarrito.cantidad++;
    } else {
        carrito.push({ ...producto, cantidad: 1 });
    }

    guardarCarrito(); // Guarda el carrito actualizado en Local Storage
    actualizarContadorCarrito(); // Actualiza el contador en la interfaz
    alert("Producto añadido al carrito");
}

// Muestra el carrito de compras en carrito.html
function mostrarCarrito() {
    const cartItems = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");

    cartItems.innerHTML = "";
    let total = 0;

    carrito.forEach((producto, index) => {
        const subtotal = producto.precio * producto.cantidad;
        total += subtotal;

        cartItems.innerHTML += `
            <tr>
                <td><img src="${producto.imagen}" alt="${producto.nombre}" style="width: 50px;"></td>
                <td>${producto.nombre}</td>
                <td>$${producto.precio.toFixed(2)}</td>
                <td><input type="number" value="${producto.cantidad}" min="1" onchange="actualizarCantidad(${index}, this.value)" style="width: 60px;"></td>
                <td>$${subtotal.toFixed(2)}</td>
                <td><button class="btn btn-danger btn-sm" onclick="eliminarDelCarrito(${index})">Eliminar</button></td>
            </tr>
        `;
    });

    cartTotal.textContent = total.toFixed(2);
    actualizarContadorCarrito();
}

// Actualiza la cantidad de un producto en el carrito
function actualizarCantidad(index, cantidad) {
    carrito[index].cantidad = parseInt(cantidad);
    guardarCarrito(); // Guarda cambios en Local Storage
    mostrarCarrito();
}

// Elimina un producto del carrito
function eliminarDelCarrito(index) {
    carrito.splice(index, 1);
    guardarCarrito(); // Guarda cambios en Local Storage
    mostrarCarrito();
}

// Finaliza la compra
function finalizarCompra() {
    if (carrito.length === 0) {
        alert("El carrito está vacío.");
    } else {
        alert("¡Compra finalizada! Gracias por su compra.");
        carrito = [];  // Vacía el carrito
        guardarCarrito(); // Limpia el Local Storage
        mostrarCarrito();
    }
}

// Ejecuta funciones al cargar la página
if (window.location.pathname.includes("index.html")) {
    mostrarProductos();
} else if (window.location.pathname.includes("carrito.html")) {
    mostrarCarrito();
}
actualizarContadorCarrito();
