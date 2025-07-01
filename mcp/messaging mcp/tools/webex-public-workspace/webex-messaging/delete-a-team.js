/**
 * Function to delete a team in Webex by ID.
 *
 * @param {Object} args - Arguments for the delete operation.
 * @param {string} args.teamId - The unique identifier for the team to be deleted.
 * @returns {Promise<Object>} - The result of the delete operation.
 */
const executeFunction = async ({ teamId }) => {
  const baseUrl = 'https://webexapis.com/v1'; // will be provided by the user
  const token = process.env.WEBEX_PUBLIC_WORKSPACE_API_KEY;
  try {
    // Construct the URL with the team ID
    const url = `${baseUrl}/teams/${teamId}`;

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
    return { status: response.status, message: 'Team deleted successfully.' };
  } catch (error) {
    console.error('Error deleting team:', error);
    return { error: 'An error occurred while deleting the team.' };
  }
};

/**
 * Tool configuration for deleting a team in Webex.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'delete_team',
      description: 'Delete a team in Webex by ID.',
      parameters: {
        type: 'object',
        properties: {
          teamId: {
            type: 'string',
            description: 'The unique identifier for the team to be deleted.'
          }
        },
        required: ['teamId']
      }
    }
  }
};

export { apiTool };