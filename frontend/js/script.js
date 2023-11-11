// elementos do login
const login = document.querySelector(".login"),
loginForm = login.querySelector(".login__form"),
loginInput = login.querySelector(".login__input"),
// elementos do chat
chat = document.querySelector(".chat"),
chatForm = chat.querySelector(".chat__form"),
chatInput = chat.querySelector(".chat__input")
chatMessages = chat.querySelector(".chat__messages")

// dados do usuario
const user = {
  id: "",
  name: "",
  color: ""
}

// dados de cores
const colors = [
  "cadetblue",
  "darkgoldenrod",
  "cornflowerblue",
  "darkkhaki",
  "hotpink",
  "gold"
]

let websocket

// funcao para criar a mensagem que o usuario enviou
const createMessageSelfElement = (content) => {
  const div = document.createElement("div")

  div.classList.add("message--self")
  div.innerHTML = content

  return div
}

// funcao para criar a mensagem que outro usuario enviou
const createMessageOtherElement = (content, sender, senderColor) => {
  const div = document.createElement("div")
  const span = document.createElement("span")

  div.classList.add("message--other")

  span.classList.add("message--sender")
  span.style.color = senderColor

  div.appendChild(span)

  span.innerHTML = sender
  div.innerHTML += content

  return div
}

// funcao para escolher uma cor aleatoria para o usuario
const getRandomColor = () => {
  const randomIndex = Math.floor(Math.random() * colors.length)
  return colors[randomIndex]
}

const scrollScreen = () => {
  window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth"
  })
}

const processMessage = ({ data }) => {
  const { userId, userName, userColor, content } = JSON.parse(data)

  const message =
    userId == user.id
      ? createMessageSelfElement(content)
      : createMessageOtherElement(content, userName, userColor)

  chatMessages.appendChild(message)

  scrollScreen()
}

// funcao para atualizar os dados do usuario
const handleLogin = (event) => {
  // impede que o navegador atualize ao clicar em submit
  event.preventDefault()

  // ID aleatoria utilizando crypto
  user.id = crypto.randomUUID()
  user.name = loginInput.value
  user.color = getRandomColor()

  // ocultando o login
  login.style.display = "none"
  chat.style.display = "flex"

  websocket = new WebSocket("wss://chat-backend-cagu.onrender.com")
  websocket.onmessage = processMessage
}

// funcao para enviar mensagem no chat
const sendMessage = (event) => {
  event.preventDefault()

  const message = {
    userId: user.id,
    userName: user.name,
    userColor: user.color,
    content: chatInput.value
  }

  websocket.send(JSON.stringify(message))

  chatInput.value = ""
}

loginForm.addEventListener("submit", handleLogin)
chatForm.addEventListener("submit", sendMessage)