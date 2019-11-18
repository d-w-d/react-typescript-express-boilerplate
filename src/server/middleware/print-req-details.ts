import { Request, Response } from 'express';

/**
 * Print req details (for debugging); add '?print-req=1' to url to activate
 */
export const printReqDetails = (req: Request, res: Response) => {
  if (!!req.query['print-req']) {
    console.log('=======================================================');
    console.log(JSON.stringify(req.headers, null, 2), '\n----------');
    console.log(JSON.stringify(req.url, null, 2), '\n----------');
    console.log(JSON.stringify(req.body, null, 2), '\n----------');
    console.log('=======================================================\n\n');
  }
};
