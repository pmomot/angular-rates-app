import { trackByIndex } from './track-by-index';

describe('trackByIndex', () => {
  it('returns same number that was received', () => {
    expect(trackByIndex(5)).toBe(5);
  });
});
