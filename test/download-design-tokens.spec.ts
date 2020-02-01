/* eslint-disable @typescript-eslint/no-explicit-any */

import { writeResponseToFile } from "../src/download-design-tokens";

describe("writeResponseToFile", () => {
  const mockExit = jest.spyOn(process, "exit").mockImplementation();

  it("should exit if status code is not 200", () => {
    const res: any = { statusCode: 300 };
    writeResponseToFile("")(res);
    expect(mockExit).toHaveBeenCalledWith(0);
  });
});
