interface CustomErrorBody {
  message: string;
}

interface CustomError extends Error {
  body: CustomErrorBody;
}

export function isCustomError(error: unknown): error is CustomError {
  return (
    typeof error === 'object' &&
    error !== null &&
    'body' in error &&
    typeof (error as CustomError).body === 'object' &&
    'message' in (error as CustomError).body
  );
}
