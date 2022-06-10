const express = require("express");
const cors = require("cors");
const fs = require("fs");
const app = express();
const messagesData = require("./messagesData.json")

app.use(cors());

const welcomeMessage = {
  id: 0,
  from: "Bart",
  text: "Welcome to CYF chat system!",
};

const file = "messagesData.json"
//This array is our "data store".
//We will start with one message in the array.
//Note: messages will be lost when Glitch restarts our server.
const messages = [welcomeMessage];

app.get("/", function (request, response) {
  response.sendFile(__dirname + "/index.html");
});

//Functions
function getMessagesFromDatabase() {
  const text = fs.readFileSync(file);
  return JSON.parse(text);
}
// function saveMessageToDatabase(messages) {
//   messages.id = messagesData.length;
//   fs.writeFileSync(file, JSON.stringify(messages, null, 2));

// }
const getMessageById = (req, res) => {
  const messages = getMessagesFromDatabase();
  const id = Number(req.params.id)

  const message = messages.find(message => id === message.id)
  console.log(message);
  res.send(message)

};

const postMessage = (req, res) => {
  let newMessage = req.body;

  newMessage.id = messagesData.length;
  console.log("req body", newMessage.id);
  messagesData.push(newMessage);
  // saveMessageToDatabase(messages)
  res.send(newMessage)

}

//WIREFRAME
app.use(express.json());

app.get("/messages", (req, res) => {
  res.send(messages)
})
app.get("/messages/:id", getMessageById);

app.post("/messages", postMessage)

app.delete("/messages/:id", (req, res) => {
  const id = Number(req.params.id)
  messages.splice(id, 1)
  res.send(messages)
})


app.listen(3000, () => {
  console.log("Listening on port 3000")
});
