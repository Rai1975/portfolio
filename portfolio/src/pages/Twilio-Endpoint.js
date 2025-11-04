const express = require("express");
const app = express();

app.get("/twilio-xml", (req, res) => {
  res.type("text/xml"); // Twilio expects XML
  res.send(`
    <?xml version="1.0" encoding="UTF-8"?>
    <Response>
      <Say voice="alice">Hello! This is a test message from your React app.</Say>
      <Pause length="30"/>
    </Response>
  `);
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
