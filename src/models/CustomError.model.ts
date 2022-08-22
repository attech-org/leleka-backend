interface CustomError {
  message: string;
  status?: number;
  stack?: string;
}

export default CustomError;
