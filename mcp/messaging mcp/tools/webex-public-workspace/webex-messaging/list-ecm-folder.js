/**
 * Function to list the ECM folder of a specified room in Webex.
 *
 * @param {Object} args - Arguments for the request.
 * @param {string} args.roomId - The ID of the room for which to list the ECM folder.
 * @returns {Promise<Object>} - The response from the Webex API containing the ECM folder details.
 */
const executeFunction = async ({ roomId }) => {
  const baseUrl = 'https://webexapis.com/v1'; // will be provided by the user
  const token = process.env.WEBEX_PUBLIC_WORKSPACE_API_KEY;
  try {
    // Construct the URL with query parameters
    const url = new URL(`${baseUrl}/room/linkedFolders`);
    url.searchParams.append('roomId', roomId);

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
    console.error('Error listing ECM folder:', error);
    return { error: 'An error occurred while listing the ECM folder.' };
  }
};

/**
 * Tool configuration for listing the ECM folder in Webex.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'list_ecm_folder',
      description: 'List the ECM folder of a specified room in Webex.',
      parameters: {
        type: 'object',
        properties: {
          roomId: {
            type: 'string',
            description: 'The ID of the room for which to list the ECM folder.'
          }
        },
        required: ['roomId']
      }
    }
  }
};

export { apiTool };