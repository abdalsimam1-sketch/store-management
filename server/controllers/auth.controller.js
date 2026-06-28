const { BadRequest, Conflict, UnAuthorized } = require("../errors");
const { prisma } = require("../db/prisma");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { loginSchema, registerSchema } = require("../utils/validations/index");

const login = async (req, res) => {
  //get payload
  const { email, password } = req.body;
  const { error } = loginSchema.validate(req.body);

  if (error) {
    throw new BadRequest(error.details[0].message);
  }
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    throw new UnAuthorized();
  }
  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    throw new UnAuthorized();
  }

  const payload = { userId: user.id, storeId: user.storeId, role: user.role };
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });

  res.status(200).json({
    data: {
      message: "User logged in successfully",
      token,
      user: {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
      },
    },
  });
};
const register = async (req, res) => {
  //payload
  const { storeName, fullName, email, password } = req.body;

  const { error } = registerSchema.validate(req.body);

  //validate payload
  if (error) {
    throw new BadRequest(error.details[0].message);
  }

  //check existing email
  const emailConflict = await prisma.user.findUnique({ where: { email } });

  if (emailConflict) {
    throw new Conflict();
  }

  //hash password
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const store = await prisma.store.create({ data: { storeName } });
  const user = await prisma.user.create({
    data: { fullName, email, password: hash, storeId: store.id, role: "admin" },
  });
  const payload = { userId: user.id, storeId: store.id, role: user.role };
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });

  res.status(201).json({
    data: {
      message: "User Created Successfully",
      token,
      user: { id: user.id, fullName, email, role: user.role },
    },
  });
};
module.exports = { login, register };
