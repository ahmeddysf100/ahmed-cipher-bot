const morse = require('morse');
const { ahmed } = require('./ahmed/ahmed')
const TelegramBot = require('node-telegram-bot-api');

const token = '6627631576:AAGYRZxApMhUw-X7l7U6la2wKaVq-CfGUCc';

const bot = new TelegramBot(token, { polling: true });

// // server run allwayes
// const express = require('express');
// const app = express();
// app.get('/', (req, res) => {
//   res.send('Hello World!');
// });

// const port = 3000;
// app.listen(port, () => {
//   console.log(`Server running at http://localhost:${port}`);
// });




bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  const name = msg.chat.username
  const en_name = morse.encode(name)
  bot.sendMessage(
    chatId, "<b>welcome " + name + " to ahmed-cipher bot</b> \n\nhere is example who to use it :\n\nwrite your command and send it then your message like this : \n<code>/tomorse\n " + name + "</code>\n\nthe output will be:\n<code>" + en_name + "</code>\n\nthe available commands is :\n\n1.<code>/tomorse</code> - to convert message to morse.\n2.<code>/frommorse</code> - to convert morse to message.\n\n3.<code>/toahmed</code> - to convert message to ahmed cipher.\n4.<code>/fromahmed</code> - to convert ahmed cipher to message.\n\nNOTE: <pre>ahmed cipher (/toahmed,/fromahmed) will ask from you a key to use it to cipher the message and to decipher the message with the same key.</pre>\n\nand you can also visit my free website:\n <a href='ahmeddysf100.github.io/ahmed-ciphers/'>https://ahmeddysf100.github.io/ahmed-ciphers/</a>", {
      parse_mode: 'HTML'
  }
  );

});


// Define conversation states
const conversationState = {};

// Handle the /toahmed and /fromahmed commands
bot.onText(/\/toahmed|\/fromahmed/, (msg) => {
  const chatId = msg.chat.id;
  const command = msg.text;

  // Start a new conversation or continue an existing one
  if (!conversationState[chatId]) {
    conversationState[chatId] = {};
  }

  // Check if the command is /toahmed or /fromahmed
  if (command === '/toahmed') {
    conversationState[chatId].state = 'awaitingMessage';
    bot.sendMessage(chatId, 'ادخل رسالتك لتشفيرها بشفرة احمد :');
  } else if (command === '/fromahmed') {
    conversationState[chatId].state = 'awaitingMessage2';
    bot.sendMessage(chatId, 'ادخل شفرة احمد لفك تشفيرها :')
  }
});

const conversationState2 = {}

bot.onText(/\/tomorse|\/frommorse/, (msg) => {
  const chatId = msg.chat.id;
  const command = msg.text;
  if (!conversationState2[chatId]) {
    conversationState2[chatId] = {};
  }

  if (command === '/tomorse') {
    conversationState2[chatId].state = 'awaitingmessageMorse'
    bot.sendMessage(chatId, 'ادخل رسالتك لتشفيرفها بشفرة مورس :')
  }
  else if (command === '/frommorse') {
    conversationState2[chatId].state = 'awaitingmessageMorse2'
    bot.sendMessage(chatId, 'ادخل شفرة مورس لفك تشفيرها :')
  }
})





bot.on('message', (msg) => {
  const chatId2 = msg.chat.id;
  const text2 = msg.text;
  const msgId2 = msg.message_id

  // console.log(text2)

  if (text2 !== null && text2 !== "/frommorse" && text2 !== "/tomorse" && text2 !== "/toahmed" && text2 !== "/fromahmed") {
    if (conversationState2[chatId2]) {
      const currentState2 = conversationState2[chatId2].state;
      switch (currentState2) {
        case "awaitingmessageMorse":
          const morseCode = morse.encode(text2);
          bot.sendMessage(chatId2, "YOUR MESSAGE : <code>" + text2 + "</code>\n\n MORSE CODE : <code>" + morseCode + "</code>", { parse_mode: 'HTML', reply_to_message_id: msgId2 });
          delete conversationState2[chatId2]; // Reset the conversation state
          break;

        case "awaitingmessageMorse2":
          const demorse = morse.decode(text2).toLowerCase();
          bot.sendMessage(chatId2, "YOUR MESSAGE : <code>" + text2 + "</code>\n\n MORSE CODE : <code>" + demorse + "</code>", { parse_mode: 'HTML', reply_to_message_id: msgId2 });
          delete conversationState2[chatId2]; // Reset the conversation state
          break;
      }
    }

    if (conversationState[chatId2]) {
      const currentState = conversationState[chatId2].state;

      switch (currentState) {
        case 'awaitingMessage':
          conversationState[chatId2].Message = text2;
          conversationState[chatId2].state = 'awaitingPassword';
          bot.sendMessage(chatId2, 'ادخل رمز تشفير(احرف فقط) : ');
          break;
        case 'awaitingPassword':
          const Message = conversationState[chatId2].Message;
          const password = text2;
          const plainText = ahmed.ahmed_enc(Message, password)
          bot.sendMessage(chatId2, "YOUR MESSAGE : <code>" + Message + "</code>\n\n AHMED CIPHER : <code>" + plainText + "</code>", { parse_mode: 'HTML', reply_to_message_id: msgId2 });
          delete conversationState[chatId2]; // Reset the conversation state
          break;


        case 'awaitingMessage2':
          conversationState[chatId2].Message = text2;
          conversationState[chatId2].state = 'awaitingPassword2';
          bot.sendMessage(chatId2, 'ادخل رمز تشفير(احرف فقط) :');
          break;
        case 'awaitingPassword2':
          const Message2 = conversationState[chatId2].Message;
          const password2 = text2;
          const plainText2 = ahmed.ahmed_dec(Message2, password2).toLowerCase()
          bot.sendMessage(chatId2, "YOUR MESSAGE : <code>" + Message2 + "</code>\n\n AHMED DECIPHER : <code>" + plainText2 + "</code>", { parse_mode: 'HTML', reply_to_message_id: msgId2 });
          delete conversationState[chatId2]; // Reset the conversation state
          break;
      }
    }






  }

})
// Define the list of commands and their descriptions
const telecommands = [
  { command: 'start', description: 'حصول معلومات عن بوت' },
  { command: 'toahmed', description: 'تشفير رسائل بشفرة احمد' },
  { command: 'fromahmed', description: 'فك تشفير شفرة احمد' },
  { command: 'tomorse', description: 'تشفير رسائل بشفرة مورس' },
  { command: 'frommorse', description: 'فك تشفير رسائل شفرة مورس' },

  // Add more commands as needed
];

// Set the bot's commands
bot.setMyCommands(telecommands);



// Start listening for messages
bot.on('polling_error', (error) => {
  console.error(error);
});



