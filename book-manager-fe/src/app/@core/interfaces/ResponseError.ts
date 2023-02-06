// The ResponseError class

// ResponseError
// This class is used as a base for each response from the server
export class ResponseError {
  success: boolean;
  message: string;
  // The payload contains the actual data retrieved, for an error it is almost always empty
  payload: object;
  status: number;
}
