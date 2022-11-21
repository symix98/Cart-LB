const db = require('../../db/models/index')
const User = db.users;
const ClientUser = db.clientuser;
let bcrypt = require('bcryptjs');
const {
  successResponse,
  errorResponse,
} = require('../../responseService');
const jwt = require('jsonwebtoken');
module.exports = {

  async getAllUsers(req, res, next) {
    try {
      const response = await User.findAll({
        attributes: [
          'username',
        ],
      });
      res.status(200).send(response);
      // successResponse(res, response);
      // next();
    } catch (error) {
      console.log(error.message);
      // res.sendStatus(500) && next(error)
      errorResponse(res, 'Could not perform operation!', 400) && next(error);
    }
  },

  async getSingleUserByUsername(req, res, next) {
    try {
      const { username } = req.params;
      console.log(username)
      const response = await User.findOne({
        where: {
          username,
        }
      });
      res.status(200).send(response);
      // successResponse(res, response);
      // next();
    } catch (error) {
      console.log(error.message);
      // res.sendStatus(500) && next(error)
      errorResponse(res, 'Could not perform operation!', 400) && next(error);
    }
  },

  async login(req, res, next) {
    try {
      const { username } = req.body;
      const { password } = req.body;
      const response = await User.findOne({
        where: {
          username,
        },
      });
      if (response) {
        const isMatchedPassword = await bcrypt.compare(password,response.password);
        console.log("Ismatched1: ",isMatchedPassword)
        if (isMatchedPassword) {
          const accessToken = jwt.sign({ username: response.username, level: response.level }, 'user_secret_key');
          successResponse(res, { level: response.level, username: response.username }, accessToken);
        } else {
          errorResponse(res, 'Wrong Password', 400);
        }
      } else {
        const response = await ClientUser.findOne({
          where: {
            username,
          },
        });
        if (response) {
          const isMatchedPassword = await bcrypt.compare(password,response.password);
          console.log("Ismatched2: ",isMatchedPassword)
          if (isMatchedPassword) {
            const accessToken = jwt.sign({ username: response.username }, 'user_secret_key');
            successResponse(res, { username: response.username }, accessToken);
          } else {
            errorResponse(res, 'Wrong Password', 400);
          }
        }
        else {
          errorResponse(res, 'Wrong Username', 400);
        }
      }
    }
    catch (error) {
      console.log(error);
      errorResponse(res, 'Could not perform operation!', 400);
    }
  },
  async editUser(req, res, next) {
    try {
      const { username, password, level } = req.body;
      console.log(username, password, level)
      const response = await User.update(
        {
          password,
          level,
        },
        {
          where: {
            username
          }
        }
      );
      if (response) {
        successResponse(res, response, "User Logged In Successfully!");
        next();
      }
      else {
        errorResponse(res, 'Could not perform operation!', 400);
      }
    } catch (error) {
      errorResponse(res, 'Something went wrong, please try again!', 400) && next(error);
    }
  },
  async createNewUser(req, res, next) {
    try {
      const { username } = req.body;
      const { password } = req.body;
      const { level } = req.body;
      const hashedPassword = await bcrypt.hash(password,10);
      const user = await User.findOne({
        where: {
          username,
        },
      });
      if (!user) {
        await User.create({ username, hashedPassword, level });
        successResponse(res, true, "User Inserted Successfully!");
        next();
      } else {
        errorResponse(res, 'User Already Exist!', 400);
      }
    }
    catch (error) {
      errorResponse(res, 'Could not Perform Operation! ', 400);
    }
  },
};