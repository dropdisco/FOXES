const { Op } = require("sequelize");
const { User, Subscription } = require("../sequelize");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("../middlewares/asyncHandler");

exports.skyconnect = asyncHandler(async (req, res, next) => {

  const user = await User.create(req.body);

  const salt = await bcrypt.genSalt(10);
  user.skykey = await bcrypt.hash(user.skykey, salt);
  await user.save();

  const payload = { id: user.id };
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });

  res.status(200).json({ success: true, data: token });

});

exports.skyreconnect = async (req, res, next) => {

  const { userID, skykey } = req.body;

  const user = await User.findOne({ where: { userID } });
  
  if (!user) {
    return next({
      message: "userID not registered, Create MySky First 👻",
      statusCode: 400,
    });
  }

  const skykeyMatch = await bcrypt.compare(skykey, user.skykey);
  if (!skykeyMatch) {
    return next({ message: "skykey does not match", statusCode: 400 });
  }
  const payload = { id: user.id };
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });

  res.status(200).json({ success: true, data: token });
};


exports.skymine = async (req, res) => {
  const user = await User.findByPk(req.user.id, {
    attributes: [
      "id",
      "firstname",
      "lastname",
      "username",
      "userID",
      "avatar",
      "cover",
      "channelDescription",
    ],
  });

  const subscriptions = await Subscription.findAll({
    where: { subscriber: req.user.id },
  });

  const userIds = subscriptions.map((sub) => sub.subscribeTo);

  const channels = await User.findAll({
    attributes: ["id", "avatar", "username"],
    where: {
      id: {
        [Op.in]: userIds,
      },
    },
  });

  user.setDataValue("channels", channels);

  res.status(200).json({ success: true, data: user });
};
