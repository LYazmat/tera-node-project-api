const mongoose = require("mongoose");

const MONGODB_URI = process.env.MONGODB_ATLASURI;

const connect = async () => {
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Banco conectado");
  } catch (error) {
    console.error("Erro: ", error.message);
  }
};

module.exports = {
  connect,
};
