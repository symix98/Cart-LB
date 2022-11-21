const db = require('../../db/models/index')
const Address = db.address;
const ClientUser = db.clientuser;
const sequelize = require('sequelize');
const {
    successResponse,
    errorResponse,
} = require('../../responseService');
const { Op } = require('sequelize');
module.exports = {
    async getAllAddressses(req, res, next) {
        try {
            const { username } = req.params;
            console.log("USERNAMee: ", username)
            const clientuser = await ClientUser.findOne({
                where: {
                    username
                }
            });
            const response = await Address.findAll({
                where: {
                    cid: clientuser.dataValues.cid,
                },
                attributes: [
                    'addrid',
                    'addrdesc',
                    'addrcity',
                    'addrdetails',
                    'cid',
                ]
            });
            res.status(200).send(response);
        } catch (error) {
            console.log(error.message);
            errorResponse(res, 'Could not perform operation!', 400) && next(error);
        }
    },
    async getAddressByClientId(req, res, next) {
        try {
            const { cid } = req.params;
            const response = await Address.findOne({
                where:{
                    cid,
                }
            })
            if(response){
            res.status(200).send(response);
            }
            else{
                errorResponse(res, 'Could not find Address!', 400);
            }
        } catch (error) {
            console.log(error.message);
            errorResponse(res, 'Could not perform operation!', 400);
        }
    },
    async createAddress(req, res, next) {
        try {
            console.log("REQ.BODY: ", req.body);
            const { addrdesc } = req.body;
            const { addrdetails } = req.body;
            const { addrcity } = req.body;
            const { username } = req.body;
            const userAddress = await ClientUser.findOne({
                where: {
                    username,
                }
            });
            if (userAddress) {
                const response = await Address.create({ addrdesc, addrdetails, addrcity, cid: userAddress.dataValues.cid });
                console.log("RESP Address::", response.dataValues)
                successResponse(res, "Sucess", "Address Added Successfully!");
            }
        } catch (error) {
            console.log(error.message);
            errorResponse(res, 'Could not perform operation!', 400);
        }
    },
}