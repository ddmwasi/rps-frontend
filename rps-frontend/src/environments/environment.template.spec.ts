import {env} from "./environment.template";

describe("Environment", () => {
  it("should have value: false", () => {
    expect(env.production).toBeFalsy();
  });
});
