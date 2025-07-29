const { ping, SmtpPingStatus } = require('smtp-ping');

const verifyEmail = async (email) => {
  const { complete, status, error } = await ping(email);

  if (status === SmtpPingStatus.OK) {
    console.log(`✅ ${email} is valid`);
  } else if (status === SmtpPingStatus.INVALID) {
    console.log(`❌ ${email} is invalid`);
  } else {
    console.log(`⚠️ ${email} couldn't be verified (maybe greylisted or blocked)`);
  }

  if (error) console.error("Error:", error.message);
};

verifyEmail("anushrisanodia@gmail.com");
verifyEmail("admin@yahoo.com");
verifyEmail("test@zoho.com");
