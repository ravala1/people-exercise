import { Person } from "./types";

const sleep = (ms: number) => {
  return new Promise((res) => setTimeout(res, ms));
};

const people: Person[] = [
  {
    id: 1,
    email: "ann.anderson@email.com",
    phone: "6151234567",
    firstName: "Ann",
    lastName: "Anderson",
  },
  {
    id: 2,
    email: "bob.benson@email.com",
    phone: "6157894561",
    firstName: "Bob",
    lastName: "Benson",
  },
];

// NOTE: These services can take a while to return (1.5 seconds)

export const createPerson = async (person: Person) => {
  await sleep(1500);
  if (person.id === undefined || person.id === null) {
    return Promise.reject("id is required");
  }
  const p = people.find((p) => p.id === person.id);
  if (!!p) return Promise.reject("user with that id already exists");
  people.push(person);
  return Promise.resolve([...people]);
};

export const retrievePeople = async () => {
  await sleep(1500);
  return Promise.resolve([...people]);
};

export const updatePerson = async (person: Person) => {
  await sleep(1500);
  const p = people.find((p) => p.id === person.id);
  if (!p) return Promise.reject("user does not exist");
  return Promise.resolve(person);
};

export const deletePerson = async (id: number) => {
  await sleep(1500);
  const index = people.findIndex((p) => p.id === id);
  if (index < 0) return Promise.reject("user does not exist");

  people.splice(index, 1);

  return Promise.resolve([...people]);
};
