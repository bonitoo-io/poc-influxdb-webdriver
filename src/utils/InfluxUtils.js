// TBD - leverage influxdbv2 REST API
const axios = require('axios');

const active_config = require(__basedir + '/bonitoo.conf.json').active
const config = require(__basedir + '/bonitoo.conf.json')[active_config]
const defaultUser = require(__basedir + '/bonitoo.conf.json').default_user

console.log('DEBUG __dirname' + __dirname)
console.log('DEBUG __basedir' + __basedir)

const flush = async () => {
    console.log('calling flush')
    await axios.get(`http://${config.host}:${config.port}/debug/flush`);
}

module.exports = { flush, config, defaultUser }

console.log(config.config_id);
console.log(config.host);
console.log(config.port)
console.log(config.def_ctx);

//flush()
