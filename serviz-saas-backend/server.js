const https = require("https");
const fs = require("fs");
const path = require("path"); // Import path module for cross-platform compatibility
const app = require("./app");

const PORT = process.env.PORT || 3000;

const options = {
  key: fs.readFileSync(
    path.join(__dirname, "certificate", "myapp_root_ca.key")
  ),
  cert: fs.readFileSync(
    path.join(__dirname, "certificate", "myapp_root_ca.pem")
  ),
};

https.createServer(options, app).listen(PORT, () => {
  console.log(`Server running on https://localhost:${PORT}`);
});
