export class Product {
    constructor(
        public readonly id: string,
        public readonly name: string,
        public readonly description: string,
        public readonly brand: string,
        public readonly price: number
    ) {
        if (price < 0) {
            throw new Error("The price cannot be negative");
        }
    }
}