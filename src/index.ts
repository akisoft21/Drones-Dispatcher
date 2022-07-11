import app from "./app";
import { Server } from "http";
import { PORT } from "./config";

const port = PORT || 3000;
const server = new Server(app);

server.listen(PORT,
    // (err) => {
    //     if (err) {
    //         return err;
    //     }
    //     console.log("random code2");
    //     console.log(`Server is listening on port: ${port}`);
    // }
);

console.log(`Server is listening on port: ${port}`);
