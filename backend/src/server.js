/* WebSockets é uma tecnologia avançada que torna possível abrir uma sessão de comunicação interativa
entre o navegador do usuário e um servidor. Com esta API, você pode enviar mensagens para um servidor
e receber respostas orientadas a eventos sem ter que consultar o servidor para obter uma resposta.*/

// importando o WebSocketServer
const { WebSocketServer } = require("ws")
// importando o .env
const dotenv =require("dotenv")
dotenv.config()

// criando instancia do servidor utilizando porta definida no .env
const wss = new WebSocketServer({ port: process.env.PORT || 8080 });

// evento de conexao
wss.on("connection", (ws) => {
  // exibindo o erro de conexao no console
  ws.on("error", console.error())

  // evento em que ao receber a mensagem, o servidor envia de volta para todos os usuarios
  ws.on("message", (data) => {
    wss.clients.forEach((client) => client.send(data.toString()))
  })

  // exibir no console sempre que um usuario conectar no servidor
  console.log("client connected");
})

// 17:30