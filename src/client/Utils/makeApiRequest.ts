import { isReqPrinted } from './isReqPrinted';
import { IDataBody } from '@server/utils/apiJsonResponse';

/**
 * Gateway function for making calls to the REST API.
 *
 * This function is designed to constrain precisely what can be sent and received from the api.
 * Whether or not the fetch call results in successful-data retrieval or error, this function
 * will always return an object of the same format (defined by interface `IApiResponse`)
 *
 * This is a central part of the full-stack architecture; you don't want to mess with this in everyday development
 */
export async function makeApiRequest<T = any>(options: TRequestOptions): Promise<IApiResponse<T>> {
  // Build fetch inputs
  const url = `${__BASE_HREF__}api${options.apiRoute}?${isReqPrinted ? 'print-req=true' : ''}`;
  const reqOptions = {
    ...options,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...(!!options.headers ? options.headers : {})
    }
  };

  // Fetch data
  return fetch(url, reqOptions)
    .then(async res => {
      if (res.ok) return res.json();
      try {
        // If the not-ok status came from our server,
        // then it might contain a body with a message
        // if so, add this message to error and pass onto .catch()

        // System will throw error here if there is no body property
        // This happens when e.g. server is unreachable
        const body: IDataBody<T> = await res.json();

        // If there is a body+message, construct my own error
        const myError: MyError = new Error(body.message);
        myError.isMessageFromApi = true;
        throw myError;

        // Pass either myErr or system-generated error onto .catch() handler
      } catch (err) {
        throw err;
      }
    })
    .then((body: IDataBody<T>) => ({
      data: body.data,
      message: body.message
    }))
    .catch((error: MyError) => {
      if (true) console.error(error);
      return {
        error,
        message: !!error.isMessageFromApi
          ? error.message
          : 'Something went wrong contacting the server!'
      };
    });
}

//////////////////////////////
// Types
//////////////////////////////

type TRequestOptions = IGetRequestOptions | IPostRequestOptions;

interface IRequestEssentials {
  headers?: HeadersInit;
  apiRoute: string;
}
interface IGetRequestOptions extends IRequestEssentials {
  method: 'GET';
}

interface IPostRequestOptions extends IRequestEssentials {
  method: 'POST';
  body: string; // Must come pre-JSON.stringify-ed!
}

interface IApiResponse<T = any> {
  data?: T;
  error?: Error;
  message: string;
}

interface MyError extends Error {
  isMessageFromApi?: boolean;
}
