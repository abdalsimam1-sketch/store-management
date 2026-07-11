const { BadRequest, Conflict, UnAuthorized, NotFound } = require("../errors");
const { prisma } = require("../db/prisma");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { loginSchema, registerSchema } = require("../utils/validations/index");

const getUser = async (req, res) => {
  const { userId, storeId } = req.user;
  const user = await prisma.user.findFirst({
    where: { id: userId },
    include: { store: true },
  });
  if (!user) {
    throw new UnAuthorized();
  }
  res.status(200).json({
    success: true,
    message: "User Found",
    data: {
      user: {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        store: user.store,
      },
    },
  });
};
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

  const result = await prisma.$transaction(async (tx) => {
    let store = await tx.store.findFirst({ where: { storeName } });
    store = store ?? (await tx.store.create({ data: { storeName } }));
    const user = await tx.user.create({
      data: {
        fullName,
        email,
        password: hash,
        storeId: store.id,
        role: "admin",
      },
    });

    return { user, store };
  });
  const { user, store } = result;
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

const addCashier = async (req, res) => {
  const { fullName, email, password } = req.body;
  const { storeId } = req.user;
  if (!fullName || !email || !password) {
    throw new BadRequest();
  }
  let cashier = await prisma.user.findFirst({ where: { email } });
  if (cashier) {
    throw new Conflict();
  }
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  cashier = await prisma.user.create({
    data: { fullName, email, password: hash, role: "cashier", storeId },
  });

  res.status(201).json({
    success: true,
    message: "Cashier added successfully",
    data: {
      fullName,
      email,
      role: cashier.role,
    },
  });
};

const deleteCashier = async (req, res) => {
  const { id } = req.params;
  const { storeId } = req.user;
  let cashier = await prisma.user.findFirst({
    where: { id, storeId, role: "cashier" },
  });
  if (!cashier) {
    throw new NotFound();
  }
  cashier = await prisma.user.delete({
    where: { id, storeId, role: "cashier" },
  });
  res.status(200).json({
    success: true,
    message: "Cashier deleted successfully",
    data: {
      fullName: cashier.fullName,
      email: cashier.email,
      role: cashier.role,
    },
  });
};

module.exports = { login, register, addCashier, deleteCashier, getUser };
