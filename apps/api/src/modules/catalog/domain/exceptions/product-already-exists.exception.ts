import { DomainException } from './domain.exception';

export class ProductAlreadyExistsException extends DomainException {
  readonly httpStatus = 409;

  constructor(name: string) {
    super(`A product named "${name}" already exists in the catalog`);
  }
}
