export interface IAppError extends Error {
  readonly name: string;
  readonly message: string;
  readonly code?: number;
  readonly response?: {
    data?: string;
    status?: number;
    statusText?: string;
  }
}