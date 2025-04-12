export class HTTPException extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.name = "HTTPException";
    this.status = status;
  }
}
