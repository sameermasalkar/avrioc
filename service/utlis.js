const Cryptr = require('cryptr');

const config = require("../config/config");
const cryptr = new Cryptr(config.jwt.secret);


exports.encryptdata = async (data) => {
    const encryptedString = cryptr.encrypt(data);
    return encryptedString;
}
exports.decryptdata = async (data) => {
    const decryptedString = cryptr.decrypt(data);
    return decryptedString;
}