import { HTTPException } from "../../typings/HTTPException";

export class AuthControllerError extends HTTPException {
  constructor(message: string, status: number) {
    super(message, status);
    this.name = "AuthControllerError";
  }

  static UserAlreadyExists(message: string) {
    throw new AuthControllerError(message, 409);
  }

  static UserNotFound(message: string) {
    throw new AuthControllerError(message, 404);
  }

  static InvalidCredentials(message: string) {
    throw new AuthControllerError(message, 401);
  }
}
