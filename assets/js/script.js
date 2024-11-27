document.addEventListener('DOMContentLoaded', function() {
    const navCategorias = document.getElementById('nav-categorias');
    const listaProductos = document.getElementById('lista-productos');
    let categorias = [];

    // Función para obtener las categorías
    function obtenerCategorias() {
        fetch('https://fakestoreapi.com/products/categories')
            .then(respuesta => respuesta.json())
            .then(datos => {
                categorias = datos;
                llenarMenuCategorias();
            })
            .catch(error => console.error('Error al obtener las categorías:', error));
    }

    // Función para llenar el menú de categorías
    function llenarMenuCategorias() {
        const ul = navCategorias.querySelector('ul');
        categorias.forEach(categoria => {
            const li = document.createElement('li');
            const enlace = document.createElement('a');
            enlace.href = '#';
            enlace.classList.add('enlace-categoria');
            enlace.dataset.categoria = categoria;
            enlace.textContent = categoria.charAt(0).toUpperCase() + categoria.slice(1);
            li.appendChild(enlace);
            ul.appendChild(li);
        });

        // Establecer evento para cada enlace de categoría
        const enlacesCategorias = document.querySelectorAll('.enlace-categoria');
        enlacesCategorias.forEach(enlace => {
            enlace.addEventListener('click', function(e) {
                e.preventDefault();
                const categoria = e.target.dataset.categoria;
                obtenerProductos(categoria);
            });
        });
    }

    // Función para obtener los productos por categoría
    function obtenerProductos(categoria = '') {
        const url = categoria ? `https://fakestoreapi.com/products/category/${categoria}` : 'https://fakestoreapi.com/products';

        fetch(url)
            .then(respuesta => respuesta.json())
            .then(productos => mostrarProductos(productos))
            .catch(error => console.error('Error al obtener los productos:', error));
    }

    // Función para mostrar los productos en la página
    function mostrarProductos(productos) {
        listaProductos.innerHTML = '';
        productos.forEach(producto => {
            const divProducto = document.createElement('div');
            divProducto.className = 'producto';
            divProducto.innerHTML = `
                <img src="${producto.image}" alt="${producto.title}">
                <div class="detalles-producto">
                    <h3>${producto.title}</h3>
                    <p>${producto.description}</p>
                    <p class="precio">$${producto.price}</p>
                </div>
            `;
            listaProductos.appendChild(divProducto);
        });
    }

    // Inicializar la página con todas las categorías y productos
    obtenerCategorias();
    obtenerProductos();
});