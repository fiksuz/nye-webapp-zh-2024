type Input = Array<any>;

export const arraySum = (input: Input): number => {
  return input.flat(Infinity).filter(x => typeof x === 'number' && !isNaN(x)).reduce((sum, current) => sum + current, 0);
};
