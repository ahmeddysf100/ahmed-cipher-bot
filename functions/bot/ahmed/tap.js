const tapCode = {
    'a': '. .',
    'b': '. ..',
    'c': '. ...',
    'd': '. ....',
    'e': '. .....',
    'f': '.. .',
    'g': '.. ..',
    'h': '.. ...',
    'i': '.. ....',
    'j': '.. .....',
    'k': '. ...',
    'l': '... .',
    'm': '... ..',
    'n': '... ...',
    'o': '... ....',
    'p': '... .....',
    'q': '.... .',
    'r': '.... ..',
    's': '.... ...',
    't': '.... ....',
    'u': '.... .....',
    'v': '..... .',
    'w': '..... ..',
    'x': '..... ...',
    'y': '..... ....',
    'z': '..... .....',
    ' ': '/',
    '1': '. .......',
    '2': '.. ......',
    '3': '... .....',
    '4': '.... ....',
    '5': '..... ...',
    '6': '...... ..',
    '7': '....... .',
    '8': '........',
    '9': '.........',
    '0': '..........'
};

const tapCodeReverse = {};
for (const [character, sequence] of Object.entries(tapCode)) {
    tapCodeReverse[sequence] = character;
}

function tap_enc(messege) {
    var cipher = "", me = messege.toLowerCase()

    for (let i of me) {

        if (tapCode[i]) {
            cipher += tapCode[i] + "   "
        }

    }
    return cipher
}

function tap_enc_for_ahmedjs(messege) {
    var cipher = "", me = messege.toLowerCase()

    for (let i of me) {

        if (tapCode[i]) {
            cipher += tapCode[i]
        }

    }
    return cipher
}

function tap_dec(cipher) {
    var messege = "", ci = cipher.split("   ")


    for (let i of ci) {
        if (tapCodeReverse[i]) {

            messege += tapCodeReverse[i]
        }
    }


    return messege
}

// console.log(tap_enc("ah1 m1"))

// console.log(tap_dec(tap_enc("ah1 m1")))

const tap = {
    tap_enc: tap_enc,
    tap_dec: tap_dec,
    tap_enc_for_ahmedjs:tap_enc_for_ahmedjs
}

module.exports= {tap}
