document.addEventListener('DOMContentLoaded', function() {
    const productList = document.getElementById('product-list');

    fetch('https://fakestoreapi.com/products')
        .then(response => response.json())
        .then(products => {
            products.forEach(product => {
                const productDiv = document.createElement('div');
                productDiv.className = 'product';

                productDiv.innerHTML = `
                    <img src="${product.image}" alt="${product.title}">
                    <div class="product-details">
                        <h3>${product.title}</h3>
                        <p>${product.description}</p>
                        <p class="price">$${product.price}</p>
                    </div>
                `;

                productList.appendChild(productDiv);
            });
        })
        .catch(error => console.error('Error fetching products:', error));
});