import { Timeblock } from "./timeblocks";

let timeblocks: Timeblock[] = [];

export async function fetchTimeblocks(): Promise<Timeblock[]> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      timeblocks = JSON.parse(localStorage.getItem("timeblocks") || "[]");
      timeblocks.forEach((tb) => {
        tb.start = new Date(tb.start);
        tb.end = new Date(tb.end);
      });
      resolve(timeblocks);
    });
  });
}

export async function createTimeblock(
  timeblock: Timeblock
): Promise<Timeblock> {
  const res = Math.random();
  const success = res < 0.7;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (success) {
        const ts = {
          ...timeblock,
          id: Math.round(Math.random() * 10000000000).toString(),
        };
        timeblocks = [...timeblocks, ts];
        localStorage.setItem("timeblocks", JSON.stringify(timeblocks));
        resolve(ts);
      } else {
        reject(new Error("Unable to create timeblock, try again later"));
      }
    });
  });
}

export async function deleteTimeblock(tb: Timeblock) {
  const res = Math.random();
  const success = res < 0.7;
  return new Promise<void>((resolve, reject) => {
    setTimeout(() => {
      if (success) {
        const i = timeblocks.findIndex((x) => x.id === tb.id);
        if (i !== -1) {
          const x = [...timeblocks];
          x.splice(i, 1);
          timeblocks = x;
          localStorage.setItem("timeblocks", JSON.stringify(timeblocks));
        }
        resolve();
      } else {
        reject(new Error("Unable to create timeblock, try again later"));
      }
    }, 1200);
  });
}
