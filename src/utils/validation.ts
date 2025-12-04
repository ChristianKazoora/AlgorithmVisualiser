/**
 * Custom error class for validation errors.
 */
export class ValidationError extends Error {
  constructor(message: string, public type: "warning" | "error" = "error") {
    super(message);
    this.name = "ValidationError";
  }
}
