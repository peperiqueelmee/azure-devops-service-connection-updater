const axios = require('axios');
const envConfig = require('../config/envConfig');
const { apiVersion, serviceConnectionTypes } = require('../config/apiConfig');

const organization = envConfig.organization;
const username = envConfig.username;
const pat = envConfig.pat;

const getAuthHeader = () => {
  const token = Buffer.from(`${username}:${pat}`).toString('base64');
  return `Basic ${token}`;
};

const listServiceConnections = async project => {
  try {
    console.log(`Fetching service connections from project ${project}...`);
    const url = `https://dev.azure.com/${organization}/${project}/_apis/serviceendpoint/endpoints?api-version=${apiVersion}`;
    const response = await axios.get(url, {
      headers: {
        Authorization: getAuthHeader(),
      },
    });

    const serviceConnections = response.data.value;

    // Filter and store only objects of specified types
    const filteredConnections = serviceConnections.filter(connection =>
      serviceConnectionTypes.includes(connection.type)
    );
    console.log(`Service connections fetched from project ${project}.`);
    return filteredConnections;
  } catch (error) {
    console.error(`Error fetching service connections from project ${project}:`, error);
    return [];
  }
};

module.exports = {
  listServiceConnections,
};
