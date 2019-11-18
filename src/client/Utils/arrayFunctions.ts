/**
 * Moves an element in an array to new position in array
 * E.g. array_move([1,2,3,4,5], 2, 0)  => [3,1,2,4,5]
 * E.g. array_move([1,2,3,4,5], 2, 4)  => [1,2,4,5,3]
 */
export function array_move(arr: any[], fromIndex: number, toIndex: number): any[] {
  let newArray = [...arr];
  if (toIndex > newArray.length - 1) throw new Error('Array index bounds violated idiot!');
  var element = newArray[fromIndex];
  newArray.splice(fromIndex, 1);
  newArray.splice(toIndex, 0, element);
  return newArray;
}
