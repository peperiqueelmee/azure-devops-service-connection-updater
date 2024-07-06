const axios = require('axios');
const envConfig = require('../config/envConfig');
const { apiVersion } = require('../config/apiConfig');

const organization = envConfig.organization;
const username = envConfig.username;
const pat = envConfig.pat;

const getAuthHeader = () => {
  const token = Buffer.from(`${username}:${pat}`).toString('base64');
  return `Basic ${token}`;
};

const updateServiceConnection = async (serviceConnection, project) => {
  const chalk = (await import('chalk')).default;

  try {
    const url = `https://dev.azure.com/${organization}/${project}/_apis/serviceendpoint/endpoints/${serviceConnection.id}?api-version=${apiVersion}`;
    await axios.put(url, serviceConnection, {
      headers: {
        Authorization: getAuthHeader(),
        'Content-Type': 'application/json',
      },
    });
    console.log(
      `Service connection ${chalk.green.bold(serviceConnection.name)} of type ${chalk.green.bold(
        serviceConnection.type
      )}: ${chalk.green.bold('Has been updated successfully.')}`
    );
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message;
    console.error(
      `${chalk.red.bold('Error')} updating service connection ${chalk.red.bold(
        serviceConnection.name
      )} of type ${chalk.red.bold(serviceConnection.type)}: ${chalk.red.bold.italic(errorMessage)}`
    );
  }
};

module.exports = {
  updateServiceConnection,
};
