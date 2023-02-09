/*
 * Standard HTTP API response model
 */

// The CommonHttpResponse class

// CommonHttpResponse<T>
// Generic response used to encapsulate data coming from the server
export interface CommonHttpResponse<T> {
  // The result code indicates whether the call was successful or not
  resultCode: number,
  resultMessage: string,
  resultInfo: {},
  // The payload contains the actual data retrieved
  payload: T;
}
