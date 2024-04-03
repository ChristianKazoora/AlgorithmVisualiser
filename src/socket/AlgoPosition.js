import net from "net";
const ADDRESS = "192.168.0.132";
const PORT = 13000;

const socket = null; // new net.Socket();

function connect() {
  // Connect to the server
  socket.connect(PORT, ADDRESS, () => {
    console.log("Connected to server");
    // Send a message to the server
    // socket.write("Hello server");
  });
}

function bfss(theStart, end, walls, row, col) {
  // Handle incoming messages
  socket.on("data", (data) => {
    console.log(`Server says: ${data}`);
    // Send a response back to the server
    socket.write(`bfs ${theStart} ${end} ${walls} ${row} ${col}`);
  });
}

function disconnect() {
  socket.on("close", () => {
    console.log("Connection closed");
  });
}

export { connect, bfss, disconnect };
