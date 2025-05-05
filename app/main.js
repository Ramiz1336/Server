const net = require("net");

console.log("Logs will appear here!");

const server = net.createServer((socket) => {
  socket.on("data", (data) => {
    const request = data.toString();
    const lines = request.split("\r\n");
    const [method, path, httpVersion] = lines[0].split(" ");

    console.log(`Received request: ${method} ${path}`);

    if (path.startsWith("/echo/")) {
      const message = path.slice(6); 
      const contentLength = Buffer.byteLength(message); 

      const response =
        "HTTP/1.1 200 OK\r\n" +
        "Content-Type: text/plain\r\n" +
        `Content-Length: ${contentLength}\r\n` +
        "\r\n" +
        message;

      socket.write(response);
    } else if (path === "/") {
      socket.write("HTTP/1.1 200 OK\r\n\r\n");
    } else {
      socket.write("HTTP/1.1 404 Not Found\r\n\r\n");
    }

    socket.end();
  });

  socket.on("close", () => {
    socket.end();
  });
});

server.listen(4221, "localhost", () => {
  console.log("Server listening on port 4221");
});
