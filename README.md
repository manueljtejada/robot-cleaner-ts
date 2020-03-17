# Robot Cleaner

## Installation

Use npm to install the required dependencies.

```
npm install
```

## Running

```
npm start
```

After the robot is running, it will need some input parameters:

* First line: a single integer that represents the number of commands the robot should expect to execute before it knows it is done.
* Second line: consists of two integer numbers that represent the starting coordinates *x y* of the robot.
* Third and any subsequent line: will consist of two pieces of data (e.g., E 2):
  - Single uppercase letter *{E, W, S, N}* that represents the direction on the compass the robot should head.
  - Integer representing the number of steps the robot should take in said direction.

When you are done adding commands, press `CTRL + C` and the robot will start cleaning the plane and indicate how many unique spots it has cleaned.

## Running unit tests

```
npm test
```
