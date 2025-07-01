/**
 * Function to delete a membership in Webex.
 *
 * @param {Object} args - Arguments for the deletion.
 * @param {string} args.membershipId - The unique identifier for the membership to be deleted.
 * @returns {Promise<Object>} - The result of the membership deletion.
 */
const executeFunction = async ({ membershipId }) => {
  const baseUrl = 'https://webexapis.com/v1'; // will be provided by the user
  const token = process.env.WEBEX_PUBLIC_WORKSPACE_API_KEY;
  try {
    // Construct the URL for the request
    const url = `${baseUrl}/memberships/${membershipId}`;

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
    return { status: response.status, message: 'Membership deleted successfully.' };
  } catch (error) {
    console.error('Error deleting membership:', error);
    return { error: 'An error occurred while deleting the membership.' };
  }
};

/**
 * Tool configuration for deleting a membership in Webex.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'delete_membership',
      description: 'Delete a membership in Webex.',
      parameters: {
        type: 'object',
        properties: {
          membershipId: {
            type: 'string',
            description: 'The unique identifier for the membership to be deleted.'
          }
        },
        required: ['membershipId']
      }
    }
  }
};

export { apiTool };