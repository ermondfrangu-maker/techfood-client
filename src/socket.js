import { io } from "socket.io-client";

const socket = io(
  "https://scrambled-vagabond-payer.ngrok-free.dev"
);

export default socket;