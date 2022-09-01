import { Timeblock } from "../components/planner";

let t: Timeblock[] = [];

export async function fetchTimeblocks(): Promise<Timeblock[]> {
  console.debug("fetch");
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(t);
    }, 600);
  });
}

export async function createTimeblock(
  timeblock: Timeblock
): Promise<Timeblock> {
  console.debug("mutate");
  const res = Math.random();
  const success = res < 0.5;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (success) {
        const ts = {
          ...timeblock,
          id: Math.round(Math.random() * 10000000000).toString(),
        };
        t = [...t, ts];
        resolve(ts);
      } else {
        reject(new Error("Unable to create timeblock, try again later"));
      }
    }, 1200);
  });
}
