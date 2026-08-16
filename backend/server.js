const express = require("express");

const app = express();

app.use(express.json());

app.get("/health", (req, res) => {
  res.json({
    status: "success",
    message: "AI Interviewer backend is running"
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`AI Interviewer running on port ${PORT}`);
});