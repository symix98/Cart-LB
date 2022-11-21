const db = require('../../db/models/index')
const OrderLine = db.orderline
const Order = db.order
const Product = db.products
const {
	successResponse,
	errorResponse,
} = require('../../responseService');
const { Op } = require('sequelize');
module.exports = {

	async getAllOrderlines(req, res, next) {
		try {
			let products = [];
			const { username } = req.params;
			console.log("THIS IS USERNAME: ", username)
			const order = await Order.findOne({
				where: {
					[Op.and]: [
						{ username: username },
						{ ostatus: "pending" },
					]
				}
			});
			if (order) {
				const cartItems = await OrderLine.findAll({
					where: {
						oid: order.dataValues.oid
					}
				});
				for (let i = 0; i < cartItems.length; i++) {
					const prods = await Product.findOne({
						where: {
							pid: cartItems[i].pid
						}
					});
					products.push(prods.dataValues);
				}
				successResponse(res, { cartItems, products });
			}
			else {
				successResponse(res, {}, "no data");
			}
		} catch (error) {
			console.log(error.message);
			errorResponse(res, 'Could not perform operation!', 400) && next(error);
		}
	},
	async updateOrderline(req, res, next) {
		try {
			const { username } = req.body
			const { key } = req.body;
			const { pid } = req.params;
			const order = await Order.findOne({
				where: {
					[Op.and]: [
						{ username: username },
						{ ostatus: "pending" },
					]
				},
				attributes: [
					'oid'
				]
			});
			const quantity = await OrderLine.findOne({
				where: {
					[Op.and]: [
						{ pid: pid },
						{ oid: order.dataValues.oid },
					]
				},
				attributes: [
					'olqtty'
				]
			});
			if (quantity) {
				if (key === 'add') {
					const orderLineUpdate = await OrderLine.update({
						olqtty: quantity.dataValues.olqtty + 1,
					},
						{
							where: {
								[Op.and]: [
									{ pid: pid },
									{ oid: order.dataValues.oid },
								]
							},
						}
					);
					successResponse(res, orderLineUpdate, "Order Line Updated Successfully!");
				} if (key === 'sub') {
					if (quantity.dataValues.olqtty > 0) {
						const orderLineUpdate = await OrderLine.update({
							olqtty: quantity.dataValues.olqtty - 1,
						},
							{
								where: {
									pid
								}
							}
						);
						successResponse(res, orderLineUpdate, "Order Line Updated Successfully!");
					} else {
						errorResponse(res, 'Quantity can not be negative!', 400);
					}
				}
				const updatedQuantity = await OrderLine.findOne({
					where: {
						pid,
					},
					attributes: [
						'olqtty'
					]
				});
				if (updatedQuantity.dataValues.olqtty === 0) {
					await OrderLine.destroy({
						where: {
							pid
						}
					})
				}
			} else {
				errorResponse(res, 'No order line for this product id', 400);
			}
		} catch (error) {
			console.log(error)
		}
	},
	async getOrderLineByID(req, res, next) {
		try {
			let products = [];
			const { oid } = req.params;
			console.log("ZE OID IZ: ", oid)
			const orderline = await OrderLine.findAll({
				where: {
					oid,
				}
			});
			for (let i = 0; i < orderline.length; i++) {
				const product = await Product.findOne({
					where: {
						pid: orderline[i].dataValues.pid,
					}
				});
				products.push(product.dataValues);
				console.log("This is products array::: ", products)
			}
			successResponse(res, { orderline, products }, "Order Line Received Successfully!");
		} catch (error) {
			console.log(error);
		}
	},
};