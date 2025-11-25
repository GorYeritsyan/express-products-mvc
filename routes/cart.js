const express = require('express');
const CartController = require('../controllers/CartController');
const router = express.Router();

const cartController = new CartController();

router.get('/', cartController.getCartPage);

router.post('/', cartController.addToCart);

router.delete('/:id', cartController.removeFromCart);

module.exports = router