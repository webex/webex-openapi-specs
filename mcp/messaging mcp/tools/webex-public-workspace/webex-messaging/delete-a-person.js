/**
 * Function to delete a person from the Webex system.
 *
 * @param {Object} args - Arguments for the delete operation.
 * @param {string} args.personId - The unique identifier for the person to be deleted.
 * @returns {Promise<Object>} - The result of the delete operation.
 */
const executeFunction = async ({ personId }) => {
  const baseUrl = 'https://webexapis.com/v1'; // will be provided by the user
  const token = process.env.WEBEX_PUBLIC_WORKSPACE_API_KEY;
  try {
    // Construct the URL for the delete request
    const url = `${baseUrl}/people/${encodeURIComponent(personId)}`;

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
    return { status: response.status, message: 'Person deleted successfully.' };
  } catch (error) {
    console.error('Error deleting person:', error);
    return { error: 'An error occurred while deleting the person.' };
  }
};

/**
 * Tool configuration for deleting a person from the Webex system.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'delete_person',
      description: 'Delete a person from the Webex system.',
      parameters: {
        type: 'object',
        properties: {
          personId: {
            type: 'string',
            description: 'The unique identifier for the person to be deleted.'
          }
        },
        required: ['personId']
      }
    }
  }
};

export { apiTool };