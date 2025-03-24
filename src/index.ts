import Express from "express";
import { Request, Response } from "express";
import { PORT } from "./config/server/index.config";

const app = Express();

app.use(Express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}: http://localhost:${PORT}`);
});
