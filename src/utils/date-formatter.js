import { format, formatDistanceToNow } from "date-fns";
import { truncate } from "lodash";

export function formatToNow(date) {
  return date
    ? formatDistanceToNow(new Date(date), {
        addSuffix: truncate,
      })
    : "";
}

export const formateDateTime = (date) => {
  return format(date, "MM/dd/yyyy kk:mm");
};
