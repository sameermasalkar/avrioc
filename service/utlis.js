const Cryptr = require('cryptr');

const config = require("../config/config");
const cryptr = new Cryptr(config.jwt.secret);


exports.encryptdata = async (data) => {
    const encryptedString = cryptr.encrypt('bacon');
    return encryptedString;
}
exports.decryptdata = async (data) => {
    const decryptedString = cryptr.decrypt(encryptedString);
    return decryptedString;
}