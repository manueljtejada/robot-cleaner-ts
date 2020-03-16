import Robot from "./robot";

describe("Robot", () => {
  it("should clean 4 spots", () => {
    const commands = [
      {
        direction: 'E',
        steps: 2,
      },
      {
        direction: 'N',
        steps: 1,
      },
    ];
    const robot = new Robot(10, 20, commands);
    expect(robot.start()).toBe(4);
  });

  it("should only clean 2 spots if robots moves over the same spots", () => {
    const commands = [
      {
        direction: 'N',
        steps: 1,
      },
      {
        direction: 'S',
        steps: 1,
      },
      {
        direction: 'N',
        steps: 1,
      },
      {
        direction: 'S',
        steps: 1,
      },
    ];
    const robot = new Robot(0, 0, commands);
    expect(robot.start()).toBe(2);
  })

  it("should only clean 1 spot if command list is empty", () => {
    const robot = new Robot(0, 0, []);
    expect(robot.start()).toBe(1);
  })
});
