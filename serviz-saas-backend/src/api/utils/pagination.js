exports.getPagination = (page, limit) => {
  const pageNumber = parseInt(page, 10) || 1;
  const pageSize = parseInt(limit, 10) || 10;
  const offset = (pageNumber - 1) * pageSize;
  return { offset, limit: pageSize };
};
