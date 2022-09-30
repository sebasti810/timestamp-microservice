let express = require("express");
let app = express();

let cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

app.use(express.static("public"));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/api/:date?", (req, res) => {
  const { date } = req.params;
  let parsedDate = date
    ? new Date(isNaN(date) ? date : Number(date))
    : new Date();

  if (isNaN(parsedDate)) {
    res.json({
      error: "Invalid Date",
    });
  } else {
    res.json({
      unix: Date.parse(parsedDate),
      utc: parsedDate.toUTCString(),
    });
  }
});

app.get("/api/hello", (req, res) => {
  res.json({ greeting: "hello API" });
});

// listen for requests :)
var listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
