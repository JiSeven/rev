import { DomainException } from './domain.exception';

export class ProductNotFoundException extends DomainException {
  readonly httpStatus = 404;

  constructor(id: string) {
    super(`Product with id "${id}" was not found`);
  }
}
