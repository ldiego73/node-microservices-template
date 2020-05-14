export interface Phones {
  [key: string]: string;
}

export interface Customer {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  gender?: string;
  age: number;
  status: true;
  addresses: string[];
  phones: Phones;
}
