# Proyecto-Final-React

### Link

- Link API: https://api-ventacomida.vercel.app/
- Link Web: https://proyecto-final-react-ventacomida.vercel.app/

### Recomendación

- Tener activado el uso de Cache en el explorador para el correcto funcionamiento de la página.
- Tamaño máximo de pantalla recomendado 1440px
- Tamaño óptimo de pantalla 1024px

### Venta de Comida

Datos:

- Todos los datos cargados fueron generados y son ficticios

### Usuarios

- Toda persona puede registrarse y hacer uso de la plataforma. 
- El usuario puede registrarse con un nombre, correo electrónico y contraseña.

### Usuarios Test
- Email: Kuspita20@gmail.com
- Password: 123456
- Todo usuario creado
### Diseño Front

- NAVBAR - Login -Register -Carrito/Bolso -Perfil (Pablo)
- HERO -Check Out -Cupons -Search - loading (Ramiro)
- CARDS -Menu -SubMenu (Viviana)
- CONTACT - Wave -Iframe map (Lautaro)
- ABOUT US (Pablo)
- FOOTER  (Juan) 

- Líder Diseño (Pablo)

- Control de calidad (Pablo)

### Diseño Back

- Líder Diseño (Ramiro)
- Ejecución (Ramiro, Lautaro)

- Control de calidad (Lautaro, Juan)

### Base de datos
- Mongo Atlas



# API del E-commerce

Esta es una API para gestionar un sistema de E-commerce con funcionalidades como la manipulación de categorías, productos, carrito de compras, usuarios, cupones, y ventas.

## Endpoints

### Categorías

- `GET /obtenerCategorias`: Obtiene todas las categorías.
- `GET /obtenerCategoria/:id`: Obtiene una categoría específica por ID.
- `POST /cargarCategoria`: Crea una nueva categoría.
- `DELETE /eliminarCategoria/:id`: Elimina una categoría por ID.
- `PATCH /actualizarCategoria/:id`: Actualiza una categoría por ID.

### Productos

- `GET /obtenerProductos/obtenerProductos`: Obtiene todos los productos.
- `GET /obtenerProductosCategoria/:id`: Obtiene productos por categoría.
- `GET /obtenerProducto/:id`: Obtiene un producto específico por ID.
- `POST /cargarProducto`: Carga un nuevo producto.
- `DELETE /eliminarProducto/:id`: Elimina un producto por ID.
- `PATCH /actualizarProducto/:id`: Actualiza un producto por ID.
- `PATCH /actualizarRestarStockProducto`: Actualiza y resta el stock de un producto.

### Carrito

- `GET /obtenerCarrito/:usuarioId`: Obtiene el carrito de un usuario por ID.
- `POST /cargarCarrito`: Agrega productos al carrito.
- `DELETE /eliminarCarritoUser`: Elimina el carrito de un usuario (se requiere token).
- `DELETE /eliminarCarritoUserProducto`: Elimina un producto del carrito de un usuario.
- `PATCH /actualizarCarrito`: Actualiza el carrito de un usuario.
- `POST /finalizarCompra`: Finaliza la compra.

### Usuarios

- `GET /registerUser_get`: Obtiene todos los usuarios.
- `GET /registerUser_getOne/:id`: Obtiene un usuario específico por ID.
- `GET /register_getEmail/:email`: Obtiene un usuario por su correo electrónico.
- `POST /registerUser_add`: Registra un nuevo usuario.
- `GET /userId`: Obtiene el ID del usuario (se requiere token).
- `POST /login`: Inicia sesión de usuario.
- `GET /logout`: Cierra sesión de usuario (se requiere token).
- `POST /agregarCuponUsado`: Agrega un cupón usado a un usuario (se requiere token).
- `POST /changePass`: Cambia la contraseña del usuario (se requiere token).

### Cupones

- `GET /obtenerCupones`: Obtiene todos los cupones.
- `GET /obtenerCupon/:id`: Obtiene un cupón específico por ID.
- `POST /cargarCupon`: Carga un nuevo cupón.
- `DELETE /eliminarCupon/:id`: Elimina un cupón por ID.
- `PATCH /actualizarCupon/:id`: Actualiza un cupón por ID.


## Notas Importantes
Se utiliza JSON para los datos en las solicitudes y respuestas.
Algunos endpoints requieren autenticación mediante un token.
Asegúrate de proporcionar la URL correcta al hacer solicitudes

## Ejemplos de Datos

Aquí tienes ejemplos de datos para las entidades principales: carrito, categoría, cupón, producto y usuario.


```json
### Carrito
{
  "usuarioId": "6562202a03fc642e7d9e9b1b",
  "productoId": "655b7fcceccd086bd18f0136",
  "quantity": 1
}

### Categoría
{
  "nombreCategoria": "New",
  "imgUrlCategoria": "img/menu/condimentos4.jpeg",
  "activeCategory": true
}

### Cupón

{
  "title": "Cupón -25% de descuento en cualquier comida",
  "level": 17,
  "stars": 3,
  "discount": 25,
  "colorTicket": "#3366FF"
}

### Producto

{
  "nombreProducto": "Shawarma de Pollo",
  "categoriaProducto": "654e6b3abbe177b7c9bf40fc",
  "ingredientesProducto": "pollo, ajo, yogur, limón, comino",
  "pesoProducto": 250,
  "valorProducto": 7.99,
  "ofertaDescuentoProducto": 10,
  "stockProducto": 10,
  "imgUrlProducto": "/img/menu/shawarma1.jpeg",
  "pointProducto": 42,
  "detallesOferta": "Solo por hoy Oferta"
}

### Usuario

{
  "nombre": "Kuspita Ramiro",
  "email": "kuspita20@gmail.com",
  "password": "$2b$05$ZaMwyUS3eM7HuuQeqfwCFecS780VWzsmCJ5nLVCbq/bqcbGMI9lqS",
  "phone": "3755501950",
  "street": "asdasda",
  "house": "verde",
  "entrance": "porton 55555",
  "commentOrder": "hay un loco gritando viva boca",
  "housePrivate": false,
  "puntosCompras": 20971,
  "cuponesUsados": []
}


### Venta de Productos

{
  "usuarioId": "655f726934edf042952a0553",
  "carritoId": "1700929309657",
  "carritoProductos": [],
  "delivery": true,
  "pagado": 58.80500000000001,
  "descuento": 5,
  "cupon": "655f9c07875581bd262af75a"
}


