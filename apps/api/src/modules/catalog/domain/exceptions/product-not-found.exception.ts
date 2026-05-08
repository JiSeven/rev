import { DomainException } from './domain.exception';

export class ProductNotFoundException extends DomainException {
  constructor(id: string) {
    super(`Product with id "${id}" was not found`);
  }
}
