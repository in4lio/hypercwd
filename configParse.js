module.exports = config => {
  var res = {};
  if (!config) {
    return {};
  } else if (!config.hypercwd) {
    console.log('hypercwd: no \'config.hypercwd\' object found in ~/.hyper.js - see https://github.com/hharnisc/hypercwd#configuration for configuration details');
  } else if (!(config.hypercwd === Object(config.hypercwd))) {
    console.log('hypercwd: \'config.hypercwd\' is not an object in ~/.hyper.js - see https://github.com/hharnisc/hypercwd#configuration for configuration details');
  } else {
    res = config.hypercwd;
  }
  if (!config.env) {
    console.log('hypercwd: no \'config.env\' variable found in ~/.hyper.js');
  } else {
    res.env = config.env;
  }
  return res;
};
