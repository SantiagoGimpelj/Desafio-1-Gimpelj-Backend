const fs = require("fs");

class ProductManager {
  static idProducto = 0;

  constructor() {
    this.path = "./data/productos.json";
    this.products = this.#leerProducosInFile();
  }

  #asignarIdProducto() {
    let id = 1;
    if (this.products.length !== 0) {
      id = this.products[this.products.length - 1].id + 1;
    }
    return id;
  }

  #leerProducosInFile() {
    try {
      if (fs.existsSync(this.path)) {
        return JSON.parse(fs.readFileSync(this.path, "utf-8"));
      }
      return [];
    } catch (error) {
      console.log(
        `ocuriro un error al momento de leer el archivo de productos, ${error}`
      );
    }
  }

  #guardarArchivo() {
    try {
      fs.writeFileSync(this.path, JSON.stringify(this.products));
    } catch (error) {
      console.log(error.message);
    }
  }

  addProduct(title, description, price, thumbnail, code, stock) {
    if (!title || !description || !price || !thumbnail || !code || !stock) {
      return "Todos los parametros son requeridos [title, description, price, thumbnail, code, stock]";
    }

    const codeRepeat = this.products.some((prod) => prod.code == code);

    if (codeRepeat) {
      return `El codigo ${code} ya se encuentra registrado en otro producto`;
    }

    ProductManager.idProducto = ProductManager.idProducto + 1;
    const id = this.#asignarIdProducto();

    const nuevoProducto = {
      id: id,
      title: title,
      description: description,
      price: price,
      thumbnail: thumbnail,
      code: code,
      stock: stock,
    };
    this.products.push(nuevoProducto);
    this.#guardarArchivo();

    return "Producto agregado exitosamente";
  }

  getProducts() {
    return this.products;
  }

  getProductById(id) {
    const producto = this.products.find((prod) => prod.id == id);
    if (producto) {
      return producto;
    } else {
      return `Not Found del producto con id ${id}`;
    }
  }

  updateProduct(id, objetcUpdate) {
    let msg = `El producto con id ${id} no existe`;

    const index = this.products.findIndex((prod) => prod.id === id);

    if (index !== -1) {
      const { id, ...rest } = objetcUpdate;
      this.products[index] = { ...this.products[index], ...rest };
      this.#guardarArchivo();
      msg = "Producto actualizado";
    }

    return msg;
  }

  deleteProduct(id) {
    let msg = `El producto con id ${id} no existe`;
    const index = this.products.findIndex((prod) => prod.id === id);
    if (index !== -1) {
      this.products = this.products.filter((prod) => prod.id !== id);
      this.#guardarArchivo();
      msg = `Producto Eliminado exitosamente!!`;
    }
    return msg;
  }
}

const producto = new ProductManager();

// en los console logs estan los mettodos para quue pueuda probar cada metodo

console.log(
  producto.addProduct(
    "Prive",
    "Cerradura",
    10000,
    "https://img.com",
    "P200",
    18
  )
);
console.log(
  producto.addProduct(
    "Prive",
    "Cerradura",
    10000,
    "https://img2.com",
    "P208",
    15
  )
);
console.log(
  producto.addProduct(
    "Prive",
    "Cerradura",
    10000,
    "https://img3.com",
    "P205",
    10
  )
);

// console.log(producto.getProducts());

// console.log(producto.deleteProduct(3));

const productoActualizado = {
  id: 3,
  price: 12000,
  thumbnail: "https://img5.com",
};

// console.log(producto.updateProduct(3, productoActualizado))
