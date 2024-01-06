import { extendFilterPipe } from './extend-filter.pipe';

describe('extendFilterPipe', () => {
  it('create an instance', () => {
    const pipe = new extendFilterPipe();
    expect(pipe).toBeTruthy();
  });
});
