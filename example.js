function printUsage() {
  console.log('Usage: API_KEY={apiKey} API_SECRET={apiSecret} ',
              'node example.js {start|stop} {sessionId|archiveId}');
  process.exit();
}

if (process.argv.length !== 4) {
  printUsage();
}

var action = process.argv[2];
if (action !== 'start' && action !== 'stop') {
  console.log('Invalid action: ', action);
  printUsage();
}

var id = process.argv[3];

var apiKey = process.env.API_KEY;
var apiSecret = process.env.API_SECRET;

if (!apiKey) {
  console.log('Missing API_KEY env variable');
  printUsage();
}

if (!apiSecret) {
  console.log('Missing API_SECRET env variable');
  printUsage();
}

var opentok = require('opentok')(apiKey, apiSecret);

if (action === 'start') {
  opentok.startArchive(id, function(err, archive) {
    if (err) {
      console.log('There was an error starting archive: ', err);
      return;
    }
    console.log('archive started successfully: ', archive);
  });

} else if (action === 'stop') {
  opentok.stopArchive(id, function(err, archive) {
    if (err) {
      console.log('There was an error starting archive: ', err);
      return;
    }

    console.log('archive stopped successfully: ', archive);
  });
}
