// Import the functions you need from the SDKs you need
 // import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAT7Syaesxkme0o0v8uJf3VKwe3nJcGLEA",
  authDomain: "uros-chat.firebaseapp.com",
  databaseURL: "https://uros-chat-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "uros-chat",
  storageBucket: "uros-chat.appspot.com",
  messagingSenderId: "940453095134",
  appId: "1:940453095134:web:cef3fc71aaefda4d96044f"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.database();

const username = prompt("Please Tell Us Your Name");
document.getElementById("message-form").addEventListener("submit", sendMessage);

function sendMessage(e) {
  e.preventDefault();

  // get values to be submitted
  const timestamp = Date.now();
  const messageInput = document.getElementById("message-input");
  const message = messageInput.value;

  // clear the input box
  messageInput.value = "";

  //auto scroll to bottom
  document
    .getElementById("messages")
    .scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });

  // create db collection and send in the data
  db.ref("messages/" + timestamp).set({
    username,
    message,
  });
}

const fetchChat = db.ref("messages/");

fetchChat.on("child_added", function (snapshot) {
  const messages = snapshot.val();
  const message = `<li class=${
    username === messages.username ? "sent" : "receive"
  }><span>${messages.username}: </span>${messages.message}</li>`;
  // append the message on the page
  document.getElementById("messages").innerHTML += message;
});


