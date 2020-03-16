import * as readline from 'readline';
import Robot, { Command } from './robot';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

/**
 *
 * @param question
 */
function prompt(question: string) {
  return new Promise<string>((resolve, reject) => {
    rl.question(`${question} `, (answer: string) => {
      resolve(answer);
    })
  })
}

/**
 *
 */
const getNumberOfCommands = () => {
  return prompt('How many commands should the robot expect to execute?');
}

/**
 *
 */
const getStartingCoordinates = () => {
  return prompt('Please enter the robot\'s starting coordinates separated by a space (e.g., 10 20)');
}

/**
 *
 */
const getCommands = () => {
  return prompt('Please enter the commands the robot should follow indicating the direction and the direction separated by a space. To add multiple commands, separate them with a comma (e.g., "E 2, N 1" )');
}

function parseCoordinates(coordinate: string) {
  return parseInt(coordinate, 10);
}

function parseCommands(command: string): Command {
  const [direction, steps] = command.split(' ');

  return {
    direction,
    steps: parseInt(steps, 10)
  }
}

/**
 *
 */
const main = async () => {
  const numberOfCommands = await getNumberOfCommands();
  const startingCoordinates = await getStartingCoordinates();
  const commandList = await getCommands();

  const [x, y] = startingCoordinates.split(' ').map(parseCoordinates);
  const commands = commandList.split(', ').map(parseCommands);

  const robot = new Robot(x, y, commands);

  const result = robot.start();

  console.log(`=> Cleaned: ${result}`);

  rl.close()
}

main();