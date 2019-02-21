import * as faker from "faker";
import { Necessity, NecessityList, Place } from "../domains";
import NecessityRepository from "./NecessityRepository";

class FakeNecessityRepository implements NecessityRepository {
  getPrimaryNecessityList(): Promise<NecessityList> {
    const necessityList = new FakeNecessityList(
      Array.from(
        { length: faker.random.number({ min: 20, max: 40 }) },
        () =>
          new FakeNecessity({
            name: faker.name.findName(),
            note: faker.random.words(16),
            isUrgent: faker.random.boolean(),
            quantity: faker.random.arrayElement([
              1,
              faker.random.number({ min: 2, max: 7 })
            ]),
            linkedPlaces: Array.from(
              { length: faker.random.number({ min: 0, max: 5 }) },
              () =>
                new FakePlace({
                  name: faker.company.companyName(),
                  address: faker.address.streetAddress(),
                  latitude: parseFloat(faker.address.latitude()),
                  longitude: parseFloat(faker.address.longitude())
                })
            ),
            isDone: faker.random.boolean()
          })
      )
    );

    return Promise.resolve(necessityList);
  }
}

class FakeNecessityList implements NecessityList {
  constructor(necessities: Necessity[]) {
    this.necessities = necessities;
  }

  readonly necessities: Necessity[];

  delete(necessity: Necessity): NecessityList {
    return new FakeNecessityList(this.necessities.filter(n => n !== necessity));
  }
}

class FakeNecessity implements Necessity {
  constructor({
    name,
    note,
    isUrgent,
    quantity,
    linkedPlaces,
    isDone
  }: Necessity) {
    this.name = name;
    this.note = note;
    this.isUrgent = isUrgent;
    this.quantity = quantity;
    this.linkedPlaces = linkedPlaces;
    this.isDone = isDone;
  }

  readonly name: string;
  readonly note: string;
  readonly isUrgent: boolean;
  readonly quantity: number;
  readonly linkedPlaces: Place[];
  readonly isDone: boolean;
}

class FakePlace implements Place {
  constructor({ name, address, latitude, longitude }: Place) {
    this.name = name;
    this.address = address;
    this.latitude = latitude;
    this.longitude = longitude;
  }

  name: string;
  address: string;
  latitude: number;
  longitude: number;
}

export default FakeNecessityRepository;
