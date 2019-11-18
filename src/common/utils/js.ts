/**
 * js = JSON.stringify().
 * Simple wrapper around JSON.stringify() with formatting; used frequently for debugging
 */
export const js = (x: any) => JSON.stringify(x, null, 2);
