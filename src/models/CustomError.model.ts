interface CustomError {
  message: string;
  status?: number;
  stack?: string;
  name?: string;
}

export default CustomError;
