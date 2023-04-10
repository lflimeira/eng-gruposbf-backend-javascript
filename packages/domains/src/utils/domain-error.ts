export class DomainError extends Error {
  constructor(
    public message: string = "Internal server error",
    public code: string
  ) {
    super();
    super.message = `${message}:--:${code}`;
  }
}
