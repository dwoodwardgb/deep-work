import { Timeblock } from "../components/planner";

let t: Timeblock[] = [];

export async function fetchTimeblocks(): Promise<Timeblock[]> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      t = JSON.parse(localStorage.getItem("timeblocks") || "[]");
      t.forEach((tb) => {
        tb.start = new Date(tb.start);
        tb.end = new Date(tb.end);
      });
      console.debug(t);
      resolve(t);
    });
  });
}

export async function createTimeblock(
  timeblock: Timeblock
): Promise<Timeblock> {
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
        localStorage.setItem("timeblocks", JSON.stringify(t));
        resolve(ts);
      } else {
        reject(new Error("Unable to create timeblock, try again later"));
      }
    });
  });
}

export async function deleteTimeblock(tb: Timeblock) {
  const res = Math.random();
  const success = res < 0.5;
  return new Promise<void>((resolve, reject) => {
    setTimeout(() => {
      if (success) {
        const i = t.findIndex((x) => x.id === tb.id);
        if (i !== -1) {
          const x = [...t];
          x.splice(i, 1);
          t = x;
          localStorage.setItem("timeblocks", JSON.stringify(t));
        }
        resolve();
      } else {
        reject(new Error("Unable to create timeblock, try again later"));
      }
    });
  });
}
