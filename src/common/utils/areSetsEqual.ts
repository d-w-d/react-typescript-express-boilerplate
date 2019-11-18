export const areSetsEqual = (a: Set<any>, b: Set<any>) =>
  a.size === b.size && [...a].every(b.has.bind(b)); // https://stackoverflow.com/a/50521676/8620332
