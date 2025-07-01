/**
 * Function to list teams for the authenticated user in Webex.
 *
 * @param {Object} args - Arguments for the request.
 * @param {number} [args.max=100] - The maximum number of teams to return.
 * @returns {Promise<Object>} - The result of the teams listing.
 */
const executeFunction = async ({ max = 100 }) => {
  const baseUrl = 'https://webexapis.com/v1'; // Base URL for the Webex API
  const token = process.env.WEBEX_PUBLIC_WORKSPACE_API_KEY;
  try {
    // Construct the URL with query parameters
    const url = new URL(`${baseUrl}/teams`);
    url.searchParams.append('max', max.toString());

    // Set up headers for the request
    const headers = {
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`
    };

    // Perform the fetch request
    const response = await fetch(url.toString(), {
      method: 'GET',
      headers
    });

    // Check if the response was successful
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData);
    }

    // Parse and return the response data
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error listing teams:', error);
    return { error: 'An error occurred while listing teams.' };
  }
};

/**
 * Tool configuration for listing teams in Webex.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'list_teams',
      description: 'List teams for the authenticated user in Webex.',
      parameters: {
        type: 'object',
        properties: {
          max: {
            type: 'integer',
            description: 'The maximum number of teams to return.'
          }
        },
        required: []
      }
    }
  }
};

export { apiTool };