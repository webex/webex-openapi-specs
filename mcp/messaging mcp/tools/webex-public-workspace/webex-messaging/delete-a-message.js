/**
 * Function to delete a message in Webex by message ID.
 *
 * @param {Object} args - Arguments for the delete operation.
 * @param {string} args.messageId - The unique identifier for the message to be deleted.
 * @returns {Promise<Object>} - The result of the delete operation.
 */
const executeFunction = async ({ messageId }) => {
  const baseUrl = 'https://webexapis.com/v1'; // Base URL for Webex API
  const token = process.env.WEBEX_PUBLIC_WORKSPACE_API_KEY;
  try {
    // Construct the URL for the delete request
    const url = `${baseUrl}/messages/${messageId}`;

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

    // Return the response status
    return { status: response.status, message: 'Message deleted successfully.' };
  } catch (error) {
    console.error('Error deleting message:', error);
    return { error: 'An error occurred while deleting the message.' };
  }
};

/**
 * Tool configuration for deleting a message in Webex.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'delete_message',
      description: 'Delete a message in Webex by message ID.',
      parameters: {
        type: 'object',
        properties: {
          messageId: {
            type: 'string',
            description: 'The unique identifier for the message to be deleted.'
          }
        },
        required: ['messageId']
      }
    }
  }
};

export { apiTool };