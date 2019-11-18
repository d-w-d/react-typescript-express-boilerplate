/**
 * Data-Transfer Models
 *
 * These interfaces define the data objects returned from the REST API.
 * The client and server use the same interface to promote tight communication between back and frontend
 *
 */

export interface IDemoPayload {
  test: string;
}

export interface ISignInOrUpPayload {
  username: string;
  token: string;
}

export interface ILockedResourcePayload {
  resource: number[];
}
