export const iterate2D = (
  iLimit: number,
  jLimit: number,
  callback: (i: number, j: number) => void
) => {
  for (let i = 0; i < iLimit; i++) {
    for (let j = 0; j < jLimit; j++) {
      callback(i, j)
    };
  };
};