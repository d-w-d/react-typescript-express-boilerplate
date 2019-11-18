/**
 * Simple function to wait for specified time in ms
 *
 * @param {number} timeMs
 * @returns
 */
export async function sleep(timeMs: number) {
  return new Promise(async resolve => {
    setTimeout(resolve, timeMs);
  });
}

// async function testSleep() {
//   console.log('Begin');
//   await sleep(5000);
//   console.log('End');
// }
// testSleep();
