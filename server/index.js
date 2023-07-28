const express = require("express");

const PORT = process.env.PORT || 3001;

const app = express();

const URL = "https://classes.cornell.edu/api/2.0";

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

app.get("/rosters", async (req, res) => {
  const result = await fetch(`${URL}/config/rosters.json?roster=FA23`);
  const json = await result.json();
  res.json(json);
});

app.get("/subjects", async () => {
  const result = await fetch(`${URL}/config/subjects.json?roster=FA23`);
  const json = await result.json();
  res.json(json);
});

app.get("/classes", async () => {});
