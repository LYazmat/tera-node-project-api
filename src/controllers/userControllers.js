const UserSchema = require("../models/userSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const SECRET = process.env.SECRET;

const getAll = async (req, res) => {
  try {
    const authHeader = req.get("authorization");
    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).send("Erro no header");
    }

    jwt.verify(token, SECRET, (err) => {
      if (err) {
        return res.status(401).send("Não autorizado");
      }
    });

    UserSchema.find(function (err, users) {
      if (err) {
        res.status(500).send({ message: err.message });
      }
      res.status(200).send(users);
    });
  } catch (error) {
    res.status(401).send({
      message: error.message,
    });
  }
};

const getUserById = async (req, res) => {
  const authHeader = req.get("authorization");
  const token = authHeader.split(" ")[1];
  var jwtid = "";

  if (!token) {
    return res.status(401).send("Erro no header");
  }

  jwt.verify(token, SECRET, (err) => {
    if (err) {
      return res.status(401).send("Não autorizado");
    }
  });

  try {
    const user = await UserSchema.findById(req.params.id);
    res.status(200).send(user);
  } catch (error) {
    // console.error(error.message)
    res.status(400).send({ msg: error.message });
  }
};

const createUser = async (req, res) => {
  const hashedPassword = bcrypt.hashSync(req.body.password, 10);
  req.body.password = hashedPassword;
  console.log("entrou");
  try {
    const newUser = new UserSchema(req.body);

    const savedUser = await newUser.save();
    const token = jwt.sign({ id: savedUser._id }, SECRET);

    res.status(200).json({
      message: "User adicionado com sucesso!",
      savedUser,
      token,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const updateUserById = async (req, res) => {
  try {
    const findUser = await UserSchema.findById(req.params.id);

    console.log(findUser);

    if (findUser) {
      findUser.firstname = req.body.firstname || findUser.firstname;
      // findUser.email = req.body.email || findUser.email
    }

    const savedUser = await findUser.save();

    res.status(200).json({
      message: "Usuário atualizada com sucesso!",
      savedUser,
    });
  } catch (error) {
    console.error(error);
  }
};

const deleteUserById = async (req, res) => {
  try {
    const userFound = await UserSchema.findById(req.params.id);

    await userFound.delete();

    res.status(200).json({
      mensagem: `Usuário '${userFound.email}' deletada com sucesso!`,
    });
  } catch (err) {
    res.status(400).json({
      mensagem: err.message,
    });
  }
};

module.exports = {
  getAll,
  getUserById,
  createUser,
  updateUserById,
  deleteUserById,
};
