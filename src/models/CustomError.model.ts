interface CustomError extends Error {
  message: string;
  status?: number;
  stack?: string;
  name: string;
}

export default CustomError;
