import { RPSInput, Shape, Outcome } from './models/rock-paper-scissors';
import { rockPaperScissors } from './task-04';
import largeTest from './task-04.json';


describe.skip('task-04', () => {
  const sample: RPSInput[] = [
    { shape: Shape.ROCK, outcome: Outcome.DRAW },
    { shape: Shape.PAPER, outcome: Outcome.LOOSE },
    { shape: Shape.SCISSORS, outcome: Outcome.WIN },
  ];

  const TEST_CASES: Array<{ input: RPSInput[], output: number }> = [
    { input: sample, output: 12 },
    { input: largeTest as RPSInput[], output: 14184 },
  ];

  it('should be defined', () => {
    expect(rockPaperScissors).toBeDefined();
    expect(typeof rockPaperScissors).toBe('function');
  });

  test.each(TEST_CASES)('it should return with the proper output', ({ input, output }) => {
    const result = rockPaperScissors(input);
    expect(typeof result).toBe('number');
    expect(result).toBe(output);
  });
});