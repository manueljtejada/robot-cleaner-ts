/** Interface representing a cleaned spot */
interface CleanedSpot {
  x: number;
  y: number;
}

/** Interface representing a robot's command */
export interface Command {
  direction: string;
  steps: number;
}

/** Class representing a cleaning robot */
export default class Robot {
  private _x: number;
  private _y: number;
  private _cleanedSpots: CleanedSpot[];
  private readonly _commands: Command[];

  /**
   * Create a robot
   * @param {number} x
   * @param {number} y
   * @param {Command[]} commands
   */
  constructor(x: number, y: number, commands: Command[]) {
    this._x = x;
    this._y = y;
    this._commands = commands;
    this._cleanedSpots = [{ x, y }];
  }

  /**
   * Starts cleaning based on given commands
   * @returns {number} the total number of spots cleaned
   */
  public start(): number {
    for (const command of this._commands) {
      this.executeCommand(command);
    }

    return this._cleanedSpots.length;
  }

  /**
   * Executes a given command
   * @param {Command} command
   */
  private executeCommand(command: Command) {
    const { direction, steps } = command;

    let stepsLeft = steps;
    let currentStep = 1;

    while (stepsLeft > 0) {
      switch (direction) {
        case 'N':
          this.clean(this._x, this._y + currentStep);
          break;

        case 'E':
          this.clean(this._x + currentStep, this._y);
          break;

        case 'S':
          this.clean(this._x, this._y - currentStep);
          break;

        case 'W':
          this.clean(this._x - currentStep, this._y);
          break;

        default:
          break;
      }

      currentStep += 1;
      stepsLeft -= 1;
    }
  }

  /**
   * Move the robot's position
   * @param {number} x
   * @param {number} y
   */
  private move(x: number, y: number) {
    this._x = x;
    this._y = y;
  }

  /**
   * Mark a spot as cleaned if it has not been cleaned yet
   * @param {number} x
   * @param {number} y
   */
  private clean(x: number, y: number) {
    this.move(x, y);

    if (this._cleanedSpots) {
      const alreadyCleaned = this._cleanedSpots.find(spot => spot.x === x && spot.y === y);
      if (alreadyCleaned) return;
    }

    const newSpot: CleanedSpot = { x, y };

    this._cleanedSpots = [
      ...this._cleanedSpots,
      newSpot
    ]
  }
}
