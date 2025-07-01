/**
 * Function to get details for a room ECM folder with the specified folder id.
 *
 * @param {Object} args - Arguments for the request.
 * @param {string} args.id - The unique identifier for the folder (required).
 * @returns {Promise<Object>} - The details of the specified ECM folder.
 */
const executeFunction = async ({ id }) => {
  const baseUrl = 'https://webexapis.com/v1'; // Base URL will be provided by the user
  const token = process.env.WEBEX_PUBLIC_WORKSPACE_API_KEY;
  try {
    // Construct the URL with the folder ID
    const url = `${baseUrl}/room/linkedFolders/${encodeURIComponent(id)}`;

    // Set up headers for the request
    const headers = {
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`
    };

    // Perform the fetch request
    const response = await fetch(url, {
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
    console.error('Error getting ECM folder details:', error);
    return { error: 'An error occurred while getting ECM folder details.' };
  }
};

/**
 * Tool configuration for getting ECM folder details.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'get_ecm_folder_details',
      description: 'Get details for a room ECM folder with the specified folder id.',
      parameters: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            description: 'The unique identifier for the folder.'
          }
        },
        required: ['id']
      }
    }
  }
};

export { apiTool };