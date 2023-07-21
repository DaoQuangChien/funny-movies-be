const express = require("express");
const bodyParser = require("body-parser");
const db = require("./app/models");
const app = express();
const PORT = process.env.PORT || 8080;
const uri =
  "mongodb+srv://admin:admin@cluster0.yd2r9.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

db.mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
  })
  .catch((err) => {
    console.error("Connection error", err);
    process.exit();
  });
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", (_, res) => {
  res.json({ message: "Welcome to funny movies application." });
});
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
