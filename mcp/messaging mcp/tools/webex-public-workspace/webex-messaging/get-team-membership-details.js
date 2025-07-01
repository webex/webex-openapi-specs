/**
 * Function to get team membership details from Webex.
 *
 * @param {Object} args - Arguments for the request.
 * @param {string} args.membershipId - The unique identifier for the team membership.
 * @returns {Promise<Object>} - The details of the team membership.
 */
const executeFunction = async ({ membershipId }) => {
  const baseUrl = 'https://webexapis.com/v1'; // will be provided by the user
  const token = process.env.WEBEX_PUBLIC_WORKSPACE_API_KEY;
  try {
    // Construct the URL with the membership ID
    const url = `${baseUrl}/team/memberships/${membershipId}`;

    // Set up headers for the request
    const headers = {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json'
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
    console.error('Error getting team membership details:', error);
    return { error: 'An error occurred while getting team membership details.' };
  }
};

/**
 * Tool configuration for getting team membership details from Webex.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'get_team_membership_details',
      description: 'Get details for a team membership by ID.',
      parameters: {
        type: 'object',
        properties: {
          membershipId: {
            type: 'string',
            description: 'The unique identifier for the team membership.'
          }
        },
        required: ['membershipId']
      }
    }
  }
};

export { apiTool };