const { connect, connections } = require("mongoose");
import "colors";

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/blogie";

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const connectMongodb = handler => async (req, res) => {
  if (connections[0].readyState) {
    return handler(req, res);
  }

  try {
    await connect(MONGODB_URI, options);

    console.log("MongoDB Server Connected!".cyan.underline.bold);

    return handler(req, res);
  } catch (error) {
    console.error(`MongoDB Server Error: ${error.message}!`.red.underline.bold);
  }
};

export default connectMongodb;
