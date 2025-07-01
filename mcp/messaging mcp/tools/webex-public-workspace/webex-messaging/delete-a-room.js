/**
 * Function to delete a room in Webex by its ID.
 *
 * @param {Object} args - Arguments for the delete operation.
 * @param {string} args.roomId - The unique identifier for the room to be deleted.
 * @returns {Promise<Object>} - The result of the delete operation.
 */
const executeFunction = async ({ roomId }) => {
  const baseUrl = 'https://webexapis.com/v1'; // will be provided by the user
  const token = process.env.WEBEX_PUBLIC_WORKSPACE_API_KEY;
  try {
    // Construct the URL for the DELETE request
    const url = `${baseUrl}/rooms/${roomId}`;

    // Set up headers for the request
    const headers = {
      'Authorization': `Bearer ${token}`
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

    // Return the response data
    return await response.json();
  } catch (error) {
    console.error('Error deleting the room:', error);
    return { error: 'An error occurred while deleting the room.' };
  }
};

/**
 * Tool configuration for deleting a room in Webex.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'delete_room',
      description: 'Delete a room in Webex by its ID.',
      parameters: {
        type: 'object',
        properties: {
          roomId: {
            type: 'string',
            description: 'The unique identifier for the room to be deleted.'
          }
        },
        required: ['roomId']
      }
    }
  }
};

export { apiTool };