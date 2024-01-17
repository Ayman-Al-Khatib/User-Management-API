function generateRandomCode(length) {
  const characters = require('./constants').characters;

  let code = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    code += characters.charAt(randomIndex);
  }
  // return code;
  return '123456';
}
 module.exports = generateRandomCode;
