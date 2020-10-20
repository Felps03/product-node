const uuidv4 = require('uuid/v4');

/**
 * Generates universally unique identifier - UUID.
 * @returns {string} An unique identifier (uuid-v4).
 */
module.exports.newUUID = () => uuidv4();
