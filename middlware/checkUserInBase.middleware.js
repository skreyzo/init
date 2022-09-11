const { User } = require("../db/models");

const checkUserInBase = async (req, res, next) => {
  try {
    const { email } = req.body;
    console.log(req.body);
    const findUser = await User.findOne({ where: { email } });
    console.log(email);
    if (findUser) {
      res.send("Такой пользователь уже зарегистрирован");

    } else {
      next();
    }
  } catch (error) {
    console.error(error);
  }
};

module.exports = { checkUserInBase };
