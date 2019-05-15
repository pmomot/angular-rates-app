import { NumberToArrayPipe } from './number-to-array.pipe';

describe('NumberToArrayPipe', () => {
  it('transform 0 to empty array', () => {
    const pipe = new NumberToArrayPipe();
    expect(pipe.transform(0)).toEqual([]);
  });

  it('transform 6 to correct array', () => {
    const pipe = new NumberToArrayPipe();
    expect(pipe.transform(6)).toEqual([0, 1, 2, 3, 4, 5]);
  });
});
