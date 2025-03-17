import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import userRoutes from "./routes/user";
import employeeRoutes from "./routes/employee";
import memberRoutes from "./routes/member";

dotenv.config({ path: ".env" });

const server = express();

server.use(express.json());

server.use(cors());

server.use("/user", userRoutes);
server.use("/employee", employeeRoutes);
server.use("/member", memberRoutes);
// For PORT
const PORT = Number(process.env.PORT) || 3000;

server.listen(PORT, "0.0.0.0", () => {
  console.log(
    `The Server for CodeGreen has Started at http://localhost:${PORT}`
  );
});
