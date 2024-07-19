const express = require("express");
const app = express();
const secret_key = "RmosPDKS";
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
app.use(bodyParser.json());

app.get("/api/token", (req, res) => {
  const token = jwt.sign({ secret_key }, secret_key, { expiresIn: "10s" }); // expiresIn saniye cinsinden

  res.status(200).json({ token });
});

app.post("/api/verify", (req, res) => {
  const geltoken = req.body.token;

  try {
    const decoded = jwt.verify(geltoken, secret_key);
    res.status(200).json("Başarılı");
  } catch (error) {
    res.status(400).json("Geçersiz Token");
  }
});
app.listen(3000, () => {
  console.log(`API http://localhost:3000 üzerinde çalışıyor.`);
});
