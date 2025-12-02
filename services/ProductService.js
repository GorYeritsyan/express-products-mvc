const { ObjectId } = require("mongodb");
const MainService = require("./MainService");

class ProductService extends MainService {
  async getAllProducts({ title, price, category, page = 1, limit = 2 }) {
    // Logic to get all products
    const productsCollection = this.getCollection("products");

    const query = {};

    if (title) {
      query.title = { $regex: title, $options: "i" };
    }

    if (price) {
      query.price = Number(price);
    }

    if (category) {
      query.category = { $regex: category, $options: "i" };
    }

    let products = await productsCollection
      .find(query)
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit))
      .toArray();

    const pagination = {
      totalPages: Math.ceil(
        (await productsCollection.find(query).count()) / Number(limit)
      ),
      currentPage: Number(page),
    };

    return { products, pagination };
  }

  async createProduct(validProduct) {
    const products = this.getCollection("products");
    await products.insertOne(validProduct);
  }

  async getProductById(id) {
    return await this.getCollection("products").findOne({
      _id: new ObjectId(id),
    });
  }

  async updateProductById({ id, validProduct }) {
    const products = this.getCollection("products");
    await products.updateOne({ _id: new ObjectId(id) }, { $set: validProduct });
  }

  async deleteProductById(id) {
    await this.getCollection("products").deleteOne({ _id: new ObjectId(id) });
  }
}

module.exports = ProductService;
