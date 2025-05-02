const net = require("net");

// You can use print statements as follows for debugging, they'll be visible when running tests.
console.log("Logs from your program will appear here!");

const server = net.createServer((socket) => {
  socket.on("data", (data) => {
    const request = data.toString();
    const lines = request.split("\r\n");
    const [method, path, httpversion] = lines[0].split(" ");

    console.log("Recieved request : $(method) ${path}");
    if (path === "/") {
      socket.write("HTTp/1.1 200 OK\r\n\r\n");
    } else {
      socket.write("HTTp/1.1 404 Not Found\r\n\r\n");
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
