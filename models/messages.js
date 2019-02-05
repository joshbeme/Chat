"use strict";
const mongoose = require("mongoose");

const date = Date().split(" ");
const dateNow = date
  .filter((string, i) => {
    if (i === 1 || i === 2 || i === 3 || i === 4) {
      return string;
    }
  })
  .join(" ");

const messageSchema = new mongoose.Schema({
  conversationId: String,
  messages: [
    {
      sender: String,
      body: String,
      date: String
    }
  ]
});

messageSchema.static("send", function(sender, body, callback) {
  if (!body) {
    return null;
  } else {
    const messageData = {
      sender,
      body,
      date: dateNow
    };
    this.messages.push(messageData);
    this.save(callback);
  }
});

const Messages = mongoose.model("Messages", messageSchema);
module.exports = Messages;
