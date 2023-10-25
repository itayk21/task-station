import Joi from "joi";

export const userSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),

  specialization: Joi.string().min(3).max(30).required(),

  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),

  dateOfBirth: Joi.date().min("1960-1-1").less("now").messages({
    "date.less": '"Date of birth" must be less than or equal to "now"',
    "date.min": '"Date of birth" must be older than or year 1960',
  }),

  phoneNumber: Joi.string()
    .length(10)
    .pattern(/^[0-9]+$/)
    .required()
    .messages({
      "string.empty": '"Phone number" cannot be empty.',
    }),

  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
});

export const convertDateStringToDate = (dateString) => {
  // Split the date string into year, month, and day components
  const [year, month, day] = dateString.split("-");

  // Create a new Date object using the year, month, and day components
  const date = new Date(year, month - 1, day);

  // Return the Date object
  return date;
};
