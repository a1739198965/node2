const crypto = require('crypto');

const md5password = (password) => {
  const md5 = crypto.createHash('md5');
  // digest('hex)将得到的二进制(buffer)转成十六进制字符串
  const result = md5.update(password).digest('hex');
  return result
}

module.exports = md5password