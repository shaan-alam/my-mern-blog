// define dependencies
const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const path = require('path');

// dotenv configuration
dotenv.config();

// json parser configuration
app.use(express.json());

// routes configuration
app.use("/api/posts/", require("./routes/posts"));
app.use("/auth/", require("./routes/auth"));

// mongoose connection
mongoose.connect(process.env.MONGO_URI_ONLINE, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", (err) => console.log(err));
db.once("open", () => console.log("Connected to Database"));

// serve static assets if in production

if (process.env.NODE_ENV === 'production') {
  // set a static folder
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

// listen to app on PORT
const PORT = process.env.PORT || 8080;
app.listen(PORT, () =>
	console.log(`The server is up and running on PORT ${PORT}`)
);
