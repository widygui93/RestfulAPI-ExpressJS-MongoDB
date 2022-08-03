const express = require("express");
const cors = require("cors");

const app = express();

// use JSON for content-type for request and response
app.use(express.json());

// allow to pass data as param or query string in url
// and allow to pass data in http body
app.use(express.urlencoded({ extended: true }));

// connect to mongodb via mongoose
const db = require("./app/models/");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useFindAndModify: true, // untuk mongoose ver 6 tidak perlu tulis ini
  })
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.log(`cannot connect to database`, err);
    process.exit();
  });

app.get("/", (req, res) => {
  res.json({
    message: "welcome home",
  });
});

require("./app/routes/post.routes")(app);

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`);
});

// lanjut besok api endpoint utk mengubah satu data
