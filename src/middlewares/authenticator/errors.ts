import { HTTPException } from "../../typings/HTTPException";
export class AuthError extends HTTPException {
  constructor(message: string, status: number) {
    super(message, status);
    this.name = "AuthError";
  }

  static UnauthorizedError(message: string) {
    throw new AuthError(message, 401);
  }

  static InvalidTokenError(message: string) {
    throw new AuthError(message, 401);
  }
}
