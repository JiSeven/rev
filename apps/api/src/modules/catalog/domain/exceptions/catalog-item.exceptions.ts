import { DomainException } from './domain.exception';

export class CatalogItemNotFoundException extends DomainException {
  constructor(id: string) {
    super(`Catalog item with id "${id}" was not found`);
  }
}

export class CatalogItemAlreadyExistsException extends DomainException {
  constructor(make: string, model: string, year: number) {
    super(`A catalog item for "${make} ${model} (${year})" already exists`);
  }
}
