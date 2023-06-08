import { ProductPaginationPipe } from './product-pagination.pipe';

describe('ProductPaginationPipe', () => {
  it('create an instance', () => {
    const pipe = new ProductPaginationPipe();
    expect(pipe).toBeTruthy();
  });
});
