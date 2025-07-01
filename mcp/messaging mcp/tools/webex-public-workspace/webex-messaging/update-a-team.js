/**
 * Function to update a team in Webex.
 *
 * @param {Object} args - Arguments for the update.
 * @param {string} args.teamId - The unique identifier for the team.
 * @param {string} args.name - The name of the team.
 * @param {string} args.description - The description of the team.
 * @returns {Promise<Object>} - The result of the team update.
 */
const executeFunction = async ({ teamId, name, description }) => {
  const baseUrl = 'https://webexapis.com/v1'; // will be provided by the user
  const token = process.env.WEBEX_PUBLIC_WORKSPACE_API_KEY;
  try {
    // Construct the URL with the team ID
    const url = `${baseUrl}/teams/${teamId}`;

    // Set up headers for the request
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`
    };

    // Prepare the body of the request
    const body = JSON.stringify({ name, description });

    // Perform the fetch request
    const response = await fetch(url, {
      method: 'PUT',
      headers,
      body
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
    console.error('Error updating the team:', error);
    return { error: 'An error occurred while updating the team.' };
  }
};

/**
 * Tool configuration for updating a team in Webex.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'update_team',
      description: 'Update a team in Webex.',
      parameters: {
        type: 'object',
        properties: {
          teamId: {
            type: 'string',
            description: 'The unique identifier for the team.'
          },
          name: {
            type: 'string',
            description: 'The name of the team.'
          },
          description: {
            type: 'string',
            description: 'The description of the team.'
          }
        },
        required: ['teamId', 'name', 'description']
      }
    }
  }
};

export { apiTool };