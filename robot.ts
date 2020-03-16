export interface CleanedSpot {
  x: number;
  y: number;
}

export interface Command {
  direction: string;
  steps: number;
}

export default class Robot {
  private _x: number;
  private _y: number;
  private _cleanedSpots: CleanedSpot[];
  private _commands: Command[];

  constructor(x: number, y: number, commands: Command[]) {
    this._x = x;
    this._y = y;
    this._commands = commands;
    this._cleanedSpots = [{ x, y }];
  }

  start() {
    for (const command of this._commands) {
      this.move(command);
    }

    return this._cleanedSpots.length;
  }

  move({ direction, steps }: Command) {
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

  clean(x: number, y: number) {
    this._x = x;
    this._y = y;

    if (this._cleanedSpots) {
      const alreadyCleaned = this._cleanedSpots.find(spot => spot.x === x && spot.y === y);
      if (alreadyCleaned) return;
    }

    const newSpot: CleanedSpot = {
      x,
      y,
    }

    this._cleanedSpots = [
      ...this._cleanedSpots,
      newSpot
    ]
  }
}
