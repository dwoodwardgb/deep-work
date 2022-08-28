import { Timeslot } from "../components/planner";

let t: Timeslot[] = [];

export async function fetchTimeslots(): Promise<Timeslot[]> {
  console.debug("fetch");
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(t);
    }, 3000);
  });
}

export async function createTimeslot(timeslot: Timeslot): Promise<Timeslot> {
  console.debug("mutate");
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const ts = {
        ...timeslot,
        id: Math.round(Math.random() * 10000000000).toString(),
      };
      t = [...t, ts];
      resolve(ts);
    }, 3000);
  });
}
