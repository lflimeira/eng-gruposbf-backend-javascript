import { z, ZodError } from "zod";

import { DomainError } from "./domain-error";

export const validateInput = async <T extends z.ZodTypeAny>({
  schema,
  input,
}: {
  schema: T;
  input: unknown;
}): Promise<z.infer<T>> => {
  try {
    return await schema.parseAsync(input);
  } catch (error: unknown) {
    if (error instanceof ZodError) {
      throw new DomainError(JSON.stringify(error.errors), "BAD_USER_INPUT");
    }

    throw new Error("Failed to parse");
  }
};
