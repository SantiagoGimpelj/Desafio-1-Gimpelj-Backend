class ProductManager {
  static idProducto = 0;

  constructor() {
    this.products = [];
  }

  addProduct( title, description, price, thumbnail, code, stock ) {

    if( !title || !description || !price || !thumbnail || !code || !stock) {
        return "Todos los parametros son requeridos [title, description, price, thumbnail, code, stock]"
    }

    const codeRepeat = this.products.some(prod => prod.code == code);

    if(codeRepeat) {
        return `El codigo ${code} ya se encuentra registrado en otro producto`
    }


    ProductManager.idProducto = ProductManager.idProducto + 1
    const id = ProductManager.idProducto;

    const nuevoProducto = {
        id:id,
        title:title, 
        description:description, 
        price:price,
        thumbnail:thumbnail,
        code:code,
        stock:stock
    };
    this.products.push(nuevoProducto);

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
}

const producto = new ProductManager();

console.log(producto.addProduct("Prive", "Cerradura", 10000, "https://img.com", "P200", 18));
console.log(producto.addProduct("Prive", "Cerradura", 10000, "https://img2.com", "P208", 15));

console.log(producto.getProducts());

