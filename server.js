const express = require("express");
const { ping, SmtpPingStatus } = require("smtp-ping");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.post("/verify", async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  try {
    const { complete, status, error } = await ping(email);

    return res.json({
      email,
      status,
      success: status === SmtpPingStatus.OK,
      complete,
      error: error?.message || null,
    });

  } catch (err) {
    return res.status(500).json({
      error: "Internal server error",
      message: err.message
    });
  }
});

app.get("/", (req, res) => {
  res.send("SMTP Verifier running");
});

app.listen(port, () => {
  console.log(`SMTP Verifier running on port ${port}`);
});
