import {faker} from '@faker-js/faker';

export interface NewUser {
  name: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  address: string;
  country: string;
  state: string;
  city: string;
  zipcode: string;
  mobile: string;
}

export function generateUser(): NewUser {

    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();

    return {
        name: `${firstName} ${lastName}`,
        email: faker.internet.email({ firstName, lastName }),
        password: faker.internet.password(),
        firstName,
        lastName,
        address: faker.location.streetAddress(),
        country: faker.location.country(),
        state: faker.location.state(),
        city: faker.location.city(),
        zipcode: faker.location.zipCode(),
        mobile: faker.phone.number()
    };
}