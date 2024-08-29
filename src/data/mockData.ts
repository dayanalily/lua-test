export const mockData = [
  "Apple",
  "Banana",
  "Cherry",
  "Date",
  "Elderberry",
  "Fig",
  "Grape",
  "Honeydew",
];

export const fetchData = async (query: string): Promise<string[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(
        mockData.filter((item) =>
          item.toLowerCase().includes(query.toLowerCase())
        )
      );
    }, 500);
  });
};
