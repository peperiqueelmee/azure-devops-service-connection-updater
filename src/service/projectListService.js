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

const listProjectNames = async () => {
  try {
    console.log('Fetching project names...');
    const response = await axios.get(`https://dev.azure.com/${organization}/_apis/projects?api-version=${apiVersion}`, {
      headers: {
        Authorization: getAuthHeader(),
      },
    });

    const projectNames = response.data.value.map(project => project.name);
    console.log('Project names fetched:', projectNames.join(', '));
    return projectNames;
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message;
    console.error(`Error fetching project names:`, errorMessage);
    return [];
  }
};

module.exports = {
  listProjectNames,
};
