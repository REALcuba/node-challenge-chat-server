const express = require("express");
const cors = require("cors");
const fs = require("fs");
const app = express();

app.use(cors());

const welcomeMessage = {
  id: 0,
  from: "Bart",
  text: "Welcome to CYF chat system!",
};

//Functions
function getMessagesFromDatabase() {
  const text = fs.readFileSync(messages);
  return JSON.parse(text);
}
const getMessageById = (req, res) => {
  const messages = getMessagesFromDatabase();
  const id = Number(request.params.id)

  const message = messages.find(message => message === message.id)
  res.send(message)

};


//WIREFRAME
app.use(express.json());

app.get("/messages", (req, res) => {
  res.send(messages)
})
app.get("/messages/:id", getMessageById);

app.post("/messages", (req, res) => {
  const newMessage = req.body;
  console.log(req.body)
  messages.push(newMessage);
  newMessage.id = messages.length;
  res.send(newMessage)

})
app.delete("/messages/:id", (req, res) => {
  const id = Number(req.params.id)
  messages.splice(id, 1)
  res.send(messages)
})


//This array is our "data store".
//We will start with one message in the array.
//Note: messages will be lost when Glitch restarts our server.
const messages = [welcomeMessage];

app.get("/", function (request, response) {
  response.sendFile(__dirname + "/index.html");
});


app.listen(3000, () => {
  console.log("Listening on port 3000")
});
