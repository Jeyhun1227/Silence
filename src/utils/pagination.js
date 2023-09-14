export const getPagination = (page, limit = 10) => {
  const from = (page - 1) * limit;
  const to = from + limit - 1;
  return { from, to };
};
