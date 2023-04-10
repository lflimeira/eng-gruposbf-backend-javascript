import { z } from "zod";

import { validateInput } from "../validate-input";

describe("validate-input", () => {
  beforeEach(jest.clearAllMocks);

  const schema = z.object({
    field: z.string(),
  });

  const input: z.infer<typeof schema> = {
    field: "field",
  };

  it("should throw an error because input is not valid", async () => {
    await expect(
      validateInput({
        schema,
        input: {
          field: 0,
        } as any,
      })
    ).rejects.toThrowError(
      '[{"code":"invalid_type","expected":"string","received":"number","path":["field"],"message":"Expected string, received number"}]'
    );
  });

  it("should throw parse error because function is not declared", async () => {
    await expect(
      validateInput({
        schema: {} as any,
        input,
      })
    ).rejects.toThrowError("Failed to parse");
  });

  it("should validate correctly", async () => {
    await expect(validateInput({ schema, input })).resolves.not.toThrowError();
  });
});
