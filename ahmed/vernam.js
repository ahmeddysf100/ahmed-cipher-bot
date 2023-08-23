// module.exports = {

// }

var codebook = [];
codebook[0] = "a";
codebook[1] = "b";
codebook[2] = "c";
codebook[3] = "d";
codebook[4] = "e";
codebook[5] = "f";
codebook[6] = "g";
codebook[7] = "h";
codebook[8] = "i";
codebook[9] = "j";
codebook[10] = "k";
codebook[11] = "l";
codebook[12] = "m";
codebook[13] = "n";
codebook[14] = "o";
codebook[15] = "p";
codebook[16] = "q";
codebook[17] = "r";
codebook[18] = "s";
codebook[19] = "t";
codebook[20] = "u";
codebook[21] = "v";
codebook[22] = "w";
codebook[23] = "x";
codebook[24] = "y";
codebook[25] = "z";
codebook[26] = "A";
codebook[27] = "B";
codebook[28] = "C";
codebook[29] = "D";
codebook[30] = "E";
codebook[31] = "F";
codebook[32] = "G";
codebook[33] = "H";
codebook[34] = "I";
codebook[35] = "J";
codebook[36] = "K";
codebook[37] = "L";
codebook[38] = "M";
codebook[39] = "N";
codebook[40] = "O";
codebook[41] = "P";
codebook[42] = "Q";
codebook[43] = "R";
codebook[44] = "S";
codebook[45] = "T";
codebook[46] = "U";
codebook[47] = "V";
codebook[48] = "W";
codebook[49] = "X";
codebook[50] = "Y";
codebook[51] = "Z";
codebook[52] = "0";
codebook[53] = "1";
codebook[54] = "2";
codebook[55] = "3";
codebook[56] = "4";
codebook[57] = "5";
codebook[58] = "6";
codebook[59] = "7";
codebook[60] = "8";
codebook[61] = "9";
codebook[62] = "`";
codebook[63] = "~";
codebook[64] = "!";
codebook[65] = "@";
codebook[66] = "#";
codebook[67] = "$";
codebook[68] = "%";
codebook[69] = "^";
codebook[70] = "&";
codebook[71] = "*";
codebook[72] = "(";
codebook[73] = ")";
codebook[74] = "-";
codebook[75] = "=";
codebook[76] = "_";
codebook[77] = "+";
codebook[78] = "[";
codebook[79] = "]";
codebook[80] = "{";
codebook[81] = "}";
codebook[82] = "|";
codebook[83] = "\\";
codebook[84] = ";";
codebook[85] = ":";
codebook[86] = "'";
codebook[87] = '"';
codebook[88] = ",";
codebook[89] = ".";
codebook[90] = "<";
codebook[91] = ">";
codebook[92] = "/";
codebook[93] = "?";
codebook[94] = " ";
codebook[95] = "\n";
codebook[96] = "\r";
codebook[97] = "\t";
codebook[98] = "–";
codebook[99] = "—";

function encText(text) {
  var codeText = []; //اذا اعرفه خارج الفاكشن كل مره استدعيه راح يجمع بيانات مال استدعائات قديمة ويه الجديدة
  for (var i = 0; i < text.length; i++) {
    codeText[i] = codebook.indexOf(text[i]).toString();

    if (codeText[i].length === 1) {
      codeText[i] = "0" + codeText[i];
    }
  }
  text = "";
  return codeText.join("");
}

function encKey(key) {
  var codeKey = [];
  for (var i = 0; i < key.length; i++) {
    codeKey[i] = codebook.indexOf(key[i]).toString();

    if (codeKey[i].length === 1) {
      codeKey[i] = "0" + codeKey[i];
    }
  }
  return codeKey.join("");
}

function enc(texte, keye) {
  //split the arrays every to digit
  var textGroubs = encText(texte).match(/\d{2}/g);
  var keyGroubs = encKey(keye).match(/\d{2}/g);

  //textdoup + keygroup (if keygroups is less than textg...  repeat first elements from keyg... to match the length of textg...)
  while (keyGroubs.length < textGroubs.length) {
    keyGroubs = keyGroubs.concat(keyGroubs); // Concatenate y with itself
  }

  keyGroubs = keyGroubs.slice(0, textGroubs.length); // Trim y to match the length of x

  // console.log(textGroubs + "   " + keyGroubs);

  var cipher = textGroubs.map((value, index) =>
    (parseInt(value) + parseInt(keyGroubs[index])).toString()
  );
  // console.log(cipher)

  for (var i = 0; i < cipher.length; i++) {
    if (cipher[i] > 99) {
      cipher[i] -= 100;
    }
    cipher = cipher.map((number) => number.toString());

    if (cipher[i].length === 1) {
      cipher[i] = "0" + cipher[i];
    }
    // console.log(cipher);
    cipher[i] = codebook[parseInt(cipher[i])];
  }

  return cipher.join("");
}

function dec(cipher, keyd) {
  var textGroubdec = encText(cipher).match(/\d{2}/g); // [ '12', '21', '25', '8', '27', '88' ]
  var keyGroub = encKey(keyd).match(/\d{2}/g);

  //textdoup + keygroup (if keygroups is less than textg...  repeat first elements from keyg... to match the length of textg...)
  while (keyGroub.length < textGroubdec.length) {
    keyGroub = keyGroub.concat(keyGroub); // Concatenate y with itself
  }

  keyGroub = keyGroub.slice(0, textGroubdec.length); // Trim y to match the length of x

  // console.log(textGroubdec + "   " + keyGroub);

  var plaintext = textGroubdec.map((value, index) =>
    (parseInt(value) - parseInt(keyGroub[index])).toString()
  );
  for (var i = 0; i < plaintext.length; i++) {
    if (plaintext[i] < 0) {
      plaintext[i] = (parseInt(plaintext[i]) + 100).toString();
    }
    if (plaintext[i].length === 1) {
      plaintext[i] = "0" + plaintext[i];
    }
    plaintext[i] = codebook[parseInt(plaintext[i])];
  }
  return plaintext.join("");
}
// console.log(enc("hello myd  vsdvds", "money"));

// console.log(dec("tsypMgALhsgJFhTpG", "money"));

 const ahmed_otp = {
  enc: enc,
  dec: dec,
};

module.exports = {ahmed_otp}
