import mongoose from "mongoose";
import { cartsModel } from "./models/carts.model.js";
import { prodManager } from "../App.js";
export default class CartManager {
    connection = mongoose.connect(
        "mongodb+srv://lautarobazzola:0zv80h92MWEGQi3Q@cluster0.yoldw0l.mongodb.net/ecommerce?retryWrites=true&w=majority"
    );
    async getCart() {
        let result = await cartsModel.find();
        console.log(result);
        return result;
    }

    async addCart() {
        let cart = {
            product: [],
        };
        console.log(cart);
        let result = await cartsModel.create(cart);
        console.log(result);
        return result;
    }

    async getCartById(id) {
        let result = await cartsModel
            .findOne({ _id: id })
            .populate("products.product");
        return result;
    }

    async addToCart(idCart, idProduct, q) {
        let product = await prodManager.getCarById(idProduct);
        let cart = await this.getCartById(idCart);
        cart.products.push({ product: product, quantity: q });

        await cart.save();

        return;
    }

    async deleteProductFromCart(idCart, idProduct) {
        const cart = await this.getCartById(idCart);
        cart.products.pull(idProduct);
        await cart.save();
        return;
    }

    async deleteAllProductsFromCart(idCart) {
        const cart = await this.getCartById(idCart);
        cart.products = [];
        await cart.save();
        return;
    }

    async updateCartQuantity(idCart, idProduct, q) {
        let cart = await this.getCartById(idCart);
        let productos = cart.products;
        let este = productos.find(
            (prod) => prod.product.valueOf() === idProduct
        );
        este.quantity = q;

        await cart.save();
        return;
    }
    async updateCartProducts(idCart, data) {
        await this.deleteAllProductsFromCart(idCart);
        let cart = await this.getCartById(idCart);
        data.data.forEach((e) => {
            cart.products.push(e);
        });

        await cart.save();

        return;
    }
}
