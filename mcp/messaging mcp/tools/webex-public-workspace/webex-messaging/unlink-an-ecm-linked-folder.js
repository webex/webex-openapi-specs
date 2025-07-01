/**
 * Function to unlink an ECM linked folder from a Webex space.
 *
 * @param {Object} args - Arguments for the unlink operation.
 * @param {string} args.id - The unique identifier for the folder to disassociate from the space.
 * @returns {Promise<Object>} - The result of the unlink operation.
 */
const executeFunction = async ({ id }) => {
  const baseUrl = 'https://webexapis.com/v1'; // will be provided by the user
  const token = process.env.WEBEX_PUBLIC_WORKSPACE_API_KEY;
  try {
    // Construct the URL with the folder ID
    const url = `${baseUrl}/room/linkedFolders/${id}`;

    // Set up headers for the request
    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };

    // Perform the fetch request
    const response = await fetch(url, {
      method: 'DELETE',
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
    console.error('Error unlinking the folder:', error);
    return { error: 'An error occurred while unlinking the folder.' };
  }
};

/**
 * Tool configuration for unlinking an ECM linked folder from a Webex space.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'unlink_ecm_folder',
      description: 'Unlink an ECM linked folder from a Webex space.',
      parameters: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            description: 'The unique identifier for the folder to disassociate from the space.'
          }
        },
        required: ['id']
      }
    }
  }
};

export { apiTool };