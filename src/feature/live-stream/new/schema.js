import * as yup from "yup";

export const schema = yup.object({
  title: yup.string().required(),
  description: yup.string().required(),
  dateTime: yup.string().required(),
  link: yup.string().required(),
});
