import { Response } from 'express';

/**
 * Use this function whenever an api controller returns a json object.
 * By funneling all of our responses through this typed function, we promote
 * type-safety and consistency with the client's fetch api.
 *
 * Note: this function takes a type T that describes the data 'payload'
 * object included in the body. If no type is given, then a data property is
 * forbidden in the body; if a type is supplied, then a data property of that
 * same type MUST be included in the body
 *
 * @param {Response} res
 * @param {number} status
 * @param {*} body
 * @returns {Response}
 */
export function apiJsonResponse<T = undefined, U extends T = T>(
  res: Response,
  status: number,
  body: TBody<U>
): Response {
  res.setHeader('Content-Type', 'application/json');
  return res.status(status).json(body);
}

/**
 * See note above: this type is designed to REQUIRE a data property within the
 * body of type T if such a type is supplied, and to FORBID a data property within
 * the body if type T is not supplied
 */
export type TBody<T> = T extends undefined ? IBody : IDataBody<T>;

interface IBody {
  message: string; // Event descriptor
}

export interface IDataBody<T> extends IBody {
  data: T; // Data payload if query is successful
}
