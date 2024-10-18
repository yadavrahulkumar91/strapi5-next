// deploy.js
const { exec } = require("child_process");

// Increase max listeners
require("events").EventEmitter.defaultMaxListeners = 20; // Increase the limit as needed

// Run the Firebase deploy command
exec("firebase deploy", (err, stdout, stderr) => {
  if (err) {
    console.error(`Error during deployment: ${err}`);
    return;
  }
  console.log(stdout);
  console.error(stderr);
});
