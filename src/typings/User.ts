import * as zod from "zod";

export const BodyParamUserZod = zod.object({
  username: zod
    .string({
      required_error: "Username is required",
      invalid_type_error: "Username must be a string",
    })
    .min(8, { message: "Username must be at least 8 characters" }),
  password: zod
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
});

export const QueryUser = zod.object({
  id: zod.string().uuid(),
  username: zod.string(),
  password: zod.string(),
  createdAt: zod.date(),
  lastLogin: zod.optional(zod.date()),
});

export type User = zod.infer<typeof QueryUser>;

export type BodyParamUser = zod.infer<typeof BodyParamUserZod>;
