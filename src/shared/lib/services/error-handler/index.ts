export type ErrorType =
  | '404_NOT_FOUND'
  | '400_BAD_REQUEST'
  | '401_UNAUTHORIZED'
  | '403_FORBIDDEN'
  | '500_INTERNAL_SERVER_ERROR'
  | 'UNKNOWN_ERROR';

class ErrorHandler {
  handle(error: unknown): ErrorType {
    const isApiError = typeof error === 'object' && error !== null && 'message' in error && 'code' in error;

    if (isApiError) {
      switch (error.code) {
        case 404:
          return '404_NOT_FOUND';
        case 400:
          return '400_BAD_REQUEST';
        case 401:
          return '401_UNAUTHORIZED';
        case 403:
          return '403_FORBIDDEN';
        case 500:
          return '500_INTERNAL_SERVER_ERROR';
      }
    }

    return 'UNKNOWN_ERROR';
  }
}

export const errorHandler = new ErrorHandler();
