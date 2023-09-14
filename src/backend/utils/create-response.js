import httpStatus from "http-status";

export const createResponse = (res, data) => {
  return res.status(httpStatus.OK).json({ data });
};
