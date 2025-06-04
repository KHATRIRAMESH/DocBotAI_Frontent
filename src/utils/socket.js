import { io } from "socket.io-client";

// Use environment variable, fallback to localhost in dev
const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:8000";

export const socket = io(SOCKET_URL, {
  withCredentials: true,
});
