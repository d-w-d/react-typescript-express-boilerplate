let count = 0;

// Simple way of generating ids that are unique to running process
export function simpleUuid() {
  count++;
  return '_id_' + count;
}
