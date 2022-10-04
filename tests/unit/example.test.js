import { sum } from '@/sum';

describe('Make a test to sum 2 numbers', () => {
  test('sum 2 numbers', () => {
    const a = 1;
    const b = 2;
    const c = a + b;

    expect(c).toEqual(3);
  });

  test('sum 2 numbers with function sum', () => {
    const a = 1;
    const b = 2;
    expect(sum(a, b)).toEqual(3);
  });
});
