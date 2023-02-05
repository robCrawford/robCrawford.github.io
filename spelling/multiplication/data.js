const firstMultiplier = 2;
const lastMultiplier = 12;

export const numberWords = [
  '', '', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve'
];

export default {
  tables: numberWords.flatMap((word, int) => {
    const table = [];
    if (word) {
      for (let i = firstMultiplier; i < lastMultiplier + 1; i++) {
        table.push(`${i} x ${int} = ${i * int}`);
      };
    }
    return table;
  })
};
