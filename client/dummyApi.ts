import { Timeslot } from "../components/planner";

let t: Timeslot[] = [];

export async function fetchTimeslots(): Promise<Timeslot[]> {
  console.debug("fetch");
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(t);
    }, 600);
  });
}

export async function createTimeslot(timeslot: Timeslot): Promise<Timeslot> {
  console.debug("mutate");
  const res = Math.random();
  const success = res < 0.5;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (success) {
        const ts = {
          ...timeslot,
          id: Math.round(Math.random() * 10000000000).toString(),
        };
        t = [...t, ts];
        resolve(ts);
      } else {
        reject(new Error("Unable to create timeslot, try again later"));
      }
    }, 1200);
  });
}
