import * as readline from 'readline';
import Robot, { Command } from './robot';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

/**
 * Parse coordinate input string and returns array of coordinates [x, y]
 * @param {string} str
 */
function parseCoordinates(str: string): number[] {
  return str.split(' ').map(coordinate => parseInt(coordinate, 10));
}

/**
 * Parse command list and returns list of command objects
 * @param {string[]} commands
 */
function parseCommands(commands: string[]): Command[] {
  return commands.map(cmd => {
    const [direction, steps] = cmd.split(' ');

    return {
      direction,
      steps: parseInt(steps, 10),
    }
  });
}

/**
 * Main function
 */
const main = async () => {
  rl.prompt();

  const userInput: string[] = [];

  rl.on('line', (cmd) => {
    userInput.push(cmd);
  })

  rl.on('close', () => {
    const numberOfCommands = parseInt(userInput[0], 10);
    const startingCoordinates = userInput[1];
    const commandList = userInput.slice(2, 2 + numberOfCommands);

    // Parse user input
    const [x, y] = parseCoordinates(startingCoordinates);
    const commands = parseCommands(commandList);

    // Create new robot instance and call `start` method to get result
    const robot = new Robot(x, y, commands);
    const result = robot.start();

    // Log result and close readline interface
    console.log(`=> Cleaned: ${result}`);
    process.exit(0);
  });
}

main();
