import { DomainException } from './domain.exception';

export class ProductAlreadyExistsException extends DomainException {
  constructor(name: string) {
    super(`A product named "${name}" already exists in the catalog`);
  }
}
