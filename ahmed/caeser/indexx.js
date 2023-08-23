const {encrypt} =require('./encrypt.js')
const {decrypt} =require('./decrypt.js')





// Global Object - Contains All Functions
const Cipher = { 
    encrypt: encrypt,
    decrypt: decrypt
};

module.exports ={Cipher}


