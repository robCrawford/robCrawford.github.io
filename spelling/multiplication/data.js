const firstMultiplier = 2;
const lastMultiplier = 12;

export const numberWords = [
  '', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve'
];

const testedTables = [ 2, 3, 4, 5, 6, 7, 8, 9, 11, 12 ];

export default {
  tables: numberWords.flatMap((word, int) => {
    const table = [];
    if (word && testedTables.includes(int)) {
      for (let i = firstMultiplier; i < lastMultiplier + 1; i++) {
        table.push(`${i} x ${int} = ${i * int}`);
      };
    }
    return table;
  })
};
