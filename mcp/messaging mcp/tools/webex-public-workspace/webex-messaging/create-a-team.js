/**
 * Function to create a team in Webex.
 *
 * @param {Object} args - Arguments for creating a team.
 * @param {string} args.name - The name of the team.
 * @param {string} args.description - A brief description of the team.
 * @returns {Promise<Object>} - The result of the team creation.
 */
const executeFunction = async ({ name, description }) => {
  const baseUrl = 'https://webexapis.com/v1'; // will be provided by the user
  const token = process.env.WEBEX_PUBLIC_WORKSPACE_API_KEY;
  try {
    // Construct the URL for the API endpoint
    const url = `${baseUrl}/teams`;

    // Prepare the request body
    const body = JSON.stringify({ name, description });

    // Set up headers for the request
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`
    };

    // Perform the fetch request
    const response = await fetch(url, {
      method: 'POST',
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
    console.error('Error creating team:', error);
    return { error: 'An error occurred while creating the team.' };
  }
};

/**
 * Tool configuration for creating a team in Webex.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'create_team',
      description: 'Create a team in Webex.',
      parameters: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
            description: 'The name of the team.'
          },
          description: {
            type: 'string',
            description: 'A brief description of the team.'
          }
        },
        required: ['name', 'description']
      }
    }
  }
};

export { apiTool };