import { HTTPException } from "../../typings/HTTPException";

export class ContentControllerError extends HTTPException {
  constructor(message: string, status: number) {
    super(message, status);
    this.name = "ContentControllerError";
  }

  static UserNotFoundError(message: string) {
    return new ContentControllerError(message, 404);
  }
}
