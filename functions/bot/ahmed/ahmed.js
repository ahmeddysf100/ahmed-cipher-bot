const { tap } = require('./tap')
const { ahmed_otp } = require('./vernam')
const { Cipher } = require('./caeser/indexx')
const morse = require('../../../node_modules/morse')




function ahmed_enc(text, key) {
    var matriz = [], func_loop = 0
    text = text.split("")
    // console.log(text)
    for (var i = 0; i < text.length; i++) {
        if (text[i] === " ") {
            matriz.push("a1a")
            matriz.push("   ")
        }
        else {
            switch (func_loop) {
                case 0:
                    var x = Cipher.encrypt(text[i], "5")
                    matriz.push(x.msg)
                    break
                case 1:
                    var y = morse.encode(text[i])
                    matriz.push(y)
                    break
                case 2:
                    var z = ahmed_otp.enc(text[i], key)
                    matriz.push(z)
                    break
                case 3:
                    var w = tap.tap_enc_for_ahmedjs(text[i])
                    matriz.push(w)
                    break
            }
            matriz.push("   ")
            func_loop = (func_loop + 1) % 4
        }
    }
    return matriz.join("")
}


function ahmed_dec(cipher, key) {
    var matrix = [], func_loop = 0, cipherR = cipher.split("   ")

    // console.log(cipherR)

    if (cipherR.includes("")) {
        cipherR.splice(cipherR.indexOf(""), 1)
    }

    // console.log(cipherR)
    for (var i = 0; i < cipherR.length; i++) {

        if (cipherR[i] === "a1a") {
            matrix.push(" ")
        }
        else {
            switch (func_loop) {
                case 0:
                    var x = Cipher.decrypt(cipherR[i], "-5", "")
                    matrix.push(x.msg)
                    break
                case 1:
                    var y = morse.decode(cipherR[i])
                    matrix.push(y)
                    break
                case 2:
                    var z = ahmed_otp.dec(cipherR[i], key)
                    matrix.push(z)
                    break
                case 3:
                    var w = tap.tap_dec(cipherR[i])
                    matrix.push(w)
                    break
            }

            func_loop = (func_loop + 1) % 4
            // console.log(matrix)
        }
    }
    return matrix.join("")
}
// console.log(Cipher.encrypt("a",5).msg + "  " + Cipher.decrypt("F",-5,"").msg)
// var zxz = ahmed_enc("k k k k", "h")
// console.log(zxz)
// console.log(ahmed_dec("P   a1a   -.-   a1a   r   a1a   . ...", "h"))




const ahmed = {
    ahmed_enc: ahmed_enc,
    ahmed_dec: ahmed_dec
}

module.exports = { ahmed }

