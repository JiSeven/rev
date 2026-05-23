export interface Vehicle {
  id: string;
  vin: string;
  plateNumber: string;
  year: number;
  isAvailable: boolean;
  fuelLevel: number;
  location: {
    latitude: number;
    longitude: number;
  };
  model: {
    id: string;
    name: string;
    brand: {
      id: string;
      name: string;
    };
  };
}

export interface Brand {
  id: string;
  name: string;
}
