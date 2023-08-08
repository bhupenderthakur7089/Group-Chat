const fs = require('fs');
const express = require("express");
const router = express.Router();

router.get("/login", (req, res) => {
  console.log("In Chat section");
  res.send(
    `<form action="/home/chat" onsubmit="localStorage.setItem('userName', document.getElementById('userName').value)" method="GET">
      <label for="userName">User Name</label>
      <input type="text" name="userName" id="userName"><br>
      <button type="submit">Login</button>
    </form>`
  );
});

router.post("/chat", (req, res) => {
  const user = req.body.userName;
  const message = req.body.message;
  fs.writeFile('chat.txt', `${user}: ${message} `, { flag: 'a' }, () => {
    res.redirect("/home/chat");
  });
});

router.get('/chat', (req, res) => {
  fs.readFile('chat.txt', (err, data) => {
    if (err) {
      data = 'No chat exists';
    }
    res.send(
      `<p>${data}</p>
      <form action="/home/chat" onsubmit="document.getElementById('userName').value=localStorage.getItem('userName')" method="POST">
      <label for="message">Type your Message</label>
      <input type="text" name="message">
      <input type="hidden" name="userName" id="userName"><br>
      <button type="submit">Send</button></form>`
    );
  });
})

router.get("/notify", (req, res) => {
  // console.log('In the notify page');
  res.send("<h1>Your Message has been successfully submitted</h1>");
});

module.exports = router;
