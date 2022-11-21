const db = require('../../db/models/index')
const Order = db.order
const OrderLine = db.orderline
const Address = db.address
const sequelize = require('sequelize');
const {
	successResponse,
	errorResponse,
} = require('../../responseService');
const { Op } = require('sequelize');
module.exports = {


	async createOrder(req, res, next) {

		try {
			const { username } = req.body;
			const { ostatus } = req.body;
			const { addrid } = req.body;
			const { pid } = req.body;
			const { olqtty } = req.body;
			const { olprice } = req.body;
			console.log("CREDS order: ", " ", username, " ", ostatus, " ", addrid)
			const order = await Order.findOne({
				where: {
					[Op.and]: [
						{ username: username },
						{ ostatus: "pending" },
					]
				}
			});
			if (!order) {
				await Order.create({ username, ostatus, addrid });
				var maxIdOrder = await Order.findOne({
					attributes: [sequelize.fn('max', sequelize.col('oid'))],
					raw: true,
				});
				const orderId = Object.values(maxIdOrder);
				console.log("MAX CLIENT: ", orderId[0]);
				console.log("CREDS orderline: ", " ", pid, " ", olqtty, " ", olprice)
				await OrderLine.create({ oid: orderId[0], pid, olqtty, olprice });
				successResponse(res, true, "Order Created Successfully!");
				next();
			} else {
				console.log("THIS IS ORDER: ", order.dataValues.oid, order.dataValues.username, order.dataValues.addrid)
				console.log("PID: ", pid)
				const orderline = await OrderLine.findOne({
					where: {
						[Op.and]: [
							{ pid: pid },
							{ oid: order.dataValues.oid },
						]
					},
				});
				if (!orderline) {
					await OrderLine.create({ oid: order.dataValues.oid, pid, olqtty, olprice });
					successResponse(res, true, "Order updated Successfully!");
					next();
				} else {
					const quantity = await OrderLine.findOne({
						where: {
							pid,
						},
						attributes: [
							'olqtty'
						]
					});
					await OrderLine.update({
						olqtty: quantity.dataValues.olqtty + 1,
					},
						{
							where: {
								pid
							}
						}
					);
					res.status(200)
					next();
				}
			}
		} catch (error) {
			console.log(error.message);
			errorResponse(res, 'Could not perform operation!', 400) && next(error);
		}
	},

	async getAllOrders(req, res, next) {
		try {
			const response = await Order.findAll({
				attributes: [
					'oid',
					'username',
					'ostatus',
					'addrid'
				],
			});
			res.status(200).send(response);
		} catch (error) {
			console.log(error.message);
			errorResponse(res, 'Could not perform operation!', 400) && next(error);
			// res.send({ message: 'Could not Find Orders!' });
		}
	},

	async getCompletedOrders(req, res, next) {
		try {
			const response = await Order.findAll({
				where: {
					ostatus: 'complete'
				},
				attributes: [
					'oid',
					'username',
					'ostatus',
					'addrid'
				]
			});
			res.status(200).send(response);
		} catch (error) {
			console.log(error.message);
			errorResponse(res, 'Could not perform operation!', 400) && next(error);
		}
	},

	async getInCompletedOrders(req, res, next) {
		try {
			const response = await Order.findAll({
				where: {
					ostatus: 'pending'
				},
				attributes: [
					'oid',
					'username',
					'ostatus',
					'addrid'
				]
			});
			res.status(200).send(response);
		} catch (error) {
			console.log(error.message);
			errorResponse(res, 'Could not perform operation!', 400) && next(error);
		}
	},


	async updateOrderStatus(req, res, next) {
		try {
			const { username } = req.body;
			const { status } = req.body;
			console.log("Username: ", username)
			const order = await Order.findOne({
				where: {
					username,
				}
			});
			console.log("STATUS datavalues: ", order.dataValues, "STATUS :", order.dataValues.ostatus)
			await Order.update({
				ostatus: status
			},
				{
					where: {
						username
					}
				}
			);
			successResponse(res, `Order's Status: ${status}`, `Order's Status: ${status}`);
		} catch (error) {
			console.log(error.message);
			errorResponse(res, 'Could not perform operation!', 400) && next(error);
		}
	},

	async getOrderlinesByUsername(req, res, next) {

		try {
			await OrderLine.findAll({
				where: {

				}
			})
		} catch (error) {
			console.log(error.message);
			errorResponse(res, 'Could not perform operation!', 400) && next(error);
		}
	},

	async deleteOrderAndOrderlines(req, res, next) {
		try {
			const { username } = req.body;
			const order = await Order.findOne({
				where: {
					username
				}
			});
			await OrderLine.destroy({
				where: {
					oid: order.dataValues.oid,
				}
			});
			await Order.destroy({
				where: {
					username
				}
			});
			successResponse(res, "Order Deleted Successfully!", "Order Deleted Successfully!");
		}
		catch (error) {
			console.log(error);
		}
	},
	async updateOrderAddressByUsername(req, res, next) {
        try {
            const { username } = req.body;
            const { addrid } = req.params;
				await Order.update({
					addrid: addrid,
				},
					{
						where: {
							username,
						}
					}
				);
            res.status(200).send("Order Address Updated Successfully!");
        } catch (error) {
            console.log(error.message);
            errorResponse(res, 'Could not perform operation!', 400);
        }
    },
};