import * as readline from 'readline';
import Robot, { Command } from './robot';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

/**
 * Prompts user input with
 * @param {string} question
 * @returns {Promise<string>} promise with user's response
 */
function prompt(question: string): Promise<string> {
  return new Promise<string>(resolve => {
    rl.question(`${question} `, (answer: string) => {
      resolve(answer);
    })
  })
}

/**
 * Parse coordinate input string and returns array of coordinates [x, y]
 * @param {string} str
 */
function parseCoordinates(str: string): number[] {
  return str.split(' ').map(coordinate => parseInt(coordinate, 10));
}

/**
 * Parse command input string and returns list of commands
 * @param {string} str
 */
function parseCommands(str: string) {
  return str.split(', ').map(cmd => {
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
  // Get user input
  const numberOfCommands = await prompt('How many commands should the robot expect to execute?');
  const startingCoordinates = await prompt('Please enter the robot\'s starting coordinates separated by a space (e.g., 10 20)');
  const commandList = await prompt('Please enter the commands the robot should follow indicating the direction and the direction separated by a space. To add multiple commands, separate them with a comma (e.g., "E 2, N 1")');

  // Parse user input
  const [x, y] = parseCoordinates(startingCoordinates);
  const commands = parseCommands(commandList);

  // Create new robot instance and call `start` method to get result
  const robot = new Robot(x, y, commands);
  const result = robot.start();

  // Log result and close readline interface
  console.log(`=> Cleaned: ${result}`);
  rl.close()
}

main();