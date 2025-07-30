const express = require("express");
const { ping, SmtpPingStatus } = require("smtp-ping");
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.post("/verify", async (req, res) => {
  try {
    const email = req.body.email;
    if (!email) {
      return res.status(400).json({ status: "ERROR", message: "Email is required" });
    }

    const { complete, status, error } = await ping(email);

    return res.json({
      status: status === SmtpPingStatus.OK ? "OK" : "INVALID",
      smtpStatus: status,
      error: error ? error.message : null,
      complete,
    });
  } catch (err) {
    res.status(500).json({ status: "ERROR", message: err.message });
  }
});

app.listen(port, () => {
  console.log(`✅ SMTP Verifier running on port ${port}`);
});
