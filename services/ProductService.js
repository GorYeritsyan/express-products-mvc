const { ObjectId } = require("mongodb");
const MainService = require("./MainService");

class ProductService extends MainService {
  async getAllProducts({ title, price, category, page = 1, limit = 2 }) {
    // Logic to get all products
    const productsCollection = this.getCollection("products");
    let products = await productsCollection.find().toArray();

    if (title) {
      products = await productsCollection
        .find({
          title: { $regex: title, $options: "i" },
        })
        .toArray();
    }

    if (price) {
      products = await productsCollection.find({ price }).toArray();
    }

    if (category) {
      products = await productsCollection.find({ category }).toArray();
    }

    products = await productsCollection
      .find()
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit))
      .toArray();

    const pagination = {
      totalPages: Math.ceil(
        (await productsCollection.find().count()) / Number(limit)
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
