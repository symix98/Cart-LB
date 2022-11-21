const db = require('../../db/models/index')
const sequelize = require('sequelize');
const Client = db.clients;
const ClientUser = db.clientuser;
const { Op } = require('sequelize');
let bcrypt = require('bcryptjs');
const {
  successResponse,
  errorResponse,
} = require('../../responseService');
const jwt = require('jsonwebtoken');
module.exports = {
  async createnewclient(req, res, next) {
    try {
      const { cname } = req.body;
      const { cmid } = req.body;
      const { clast } = req.body;
      const { cphone } = req.body;
      const { username } = req.body;
      const { password } = req.body;
      const hashedPassword = await bcrypt.hash(password,13);
      const existedClient = await ClientUser.findOne({
        where: {
          username,
        }
      });
      if(existedClient){
        res.status(500).send("Client already exist");
      }
      else{
      await Client.create({ cname, cmid, clast, cphone });
      var maxIdClient = await Client.findOne({
        attributes: [sequelize.fn('max', sequelize.col('cid'))],
        raw: true,
      });
      const cientId = Object.values(maxIdClient);
      console.log("MAX CLIENT: ", cientId[0]);
      await ClientUser.create({ cid: cientId[0], username: username, password: hashedPassword });
      successResponse(res);
    }
    }
    catch (error) {
      console.log(error);
    }
  },
  async getClientByID(req, res, next) {
    try {
      const { cid } = req.params;
      console.log("THIS IS CID: ", cid)
      const response = await Client.findOne({
        where: {
          cid,
        }
      });
      res.status(200).send(response);
    }
    catch (error) {
      console.log(error);
    }
  },
  async getClientUserByUsername(req, res, next) {
    try {
      const { username } = req.params;
      console.log("THIS IS CID: ", username)
      const response = await ClientUser.findOne({
        where: {
          username,
        }
      });
      res.status(200).send(response);
    }
    catch (error) {
      console.log(error);
    }
  },
}