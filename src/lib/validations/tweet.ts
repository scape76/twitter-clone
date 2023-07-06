import * as z from "zod";

export const tweetSchema = z.object({
  text: z
    .string()
    .min(1, { message: "Tweet has to be at least 1 symbol long" })
    .max(1027, { message: "Tweet is too long" }),
});
