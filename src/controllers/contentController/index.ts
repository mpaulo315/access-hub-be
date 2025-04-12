import { Request, Response } from "express";
import User from "../../models/User";
import { ContentControllerError } from "./error";

export const getContent = async (req: Request, res: Response) => {
    const userId = req.body.userId;
    const user = await User.findById(userId);
    if (!user) {
      throw ContentControllerError.UserNotFoundError("User not found");
    }

    // Pegar conteúdo da pagina principal
    return res.status(200).json({ content: "Content" });
}
