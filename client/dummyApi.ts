import { Timebox } from "../components/planner";

let t: Timebox[] = [];

export async function fetchTimeboxes(): Promise<Timebox[]> {
  console.debug("fetch");
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(t);
    }, 600);
  });
}

export async function createTimebox(timebox: Timebox): Promise<Timebox> {
  console.debug("mutate");
  const res = Math.random();
  const success = res < 0.5;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (success) {
        const ts = {
          ...timebox,
          id: Math.round(Math.random() * 10000000000).toString(),
        };
        t = [...t, ts];
        resolve(ts);
      } else {
        reject(new Error("Unable to create timebox, try again later"));
      }
    }, 1200);
  });
}
