require('dotenv').config();
const { listServiceConnections } = require('./service/serviceConnectionListService');
const { updateServiceConnection } = require('./service/serviceConnectionUpdateService');
const { listProjectNames } = require('./service/projectListService');

const main = async () => {
  const chalk = (await import('chalk')).default;
  const projectNames = await listProjectNames();

  for (const project of projectNames) {
    console.log(chalk.yellow.bold('--------------------------------------------------------'));
    console.log(chalk.yellow.bold(`Processing service connections for project: ${project}`));
    console.log(chalk.yellow.bold('--------------------------------------------------------'));

    const serviceConnections = await listServiceConnections(project);
    for (const connection of serviceConnections) {
      await updateServiceConnection(connection, project);
    }
  }

  console.log(chalk.cyan.bold('--------------------------------------------------------'));
  console.log(chalk.cyan.bold('Service connection update job has completed successfully.'));
  console.log(chalk.cyan.bold('--------------------------------------------------------'));
};

main();
