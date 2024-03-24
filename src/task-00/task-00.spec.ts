import { oddsAndEvens } from './task-00';

const TESTS = [
  {
    input: 1,
    output: 'odd',
  },
  {
    input: 2,
    output: 'even',
  }
];

describe('task-00', () => {
  it('should export the oddsAndEvens function', () => {
    expect(oddsAndEvens).toBeDefined();
    expect(typeof oddsAndEvens).toBe('function');
  });

  test.each(TESTS)(
    'should return with the proper value',
    ({ input, output }) => {
      expect(oddsAndEvens(input)).toEqual(output);
    }
  );
});
