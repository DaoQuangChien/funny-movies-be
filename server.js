const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./app/models");
const app = express();
const authRoute = require("./app/routes/auth.routes");
const movieRoute = require("./app/routes/movie.routes");
const corsOptions = {
  origin: ["http://localhost:3000"],
};
const PORT = process.env.PORT || 8080;
const uri =
  "mongodb+srv://admin:admin@cluster0.yd2r9.mongodb.net/funnyMovies?retryWrites=true&w=majority";

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
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
authRoute(app);
movieRoute(app);
app.get("/", (_, res) => {
  res.json({ message: "Welcome to funny movies application." });
});
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
