/**
 * Function to get membership details by ID from Webex.
 *
 * @param {Object} args - Arguments for the request.
 * @param {string} args.membershipId - The unique identifier for the membership.
 * @returns {Promise<Object>} - The details of the membership.
 */
const executeFunction = async ({ membershipId }) => {
  const baseUrl = 'https://webexapis.com/v1'; // Base URL for Webex API
  const token = process.env.WEBEX_PUBLIC_WORKSPACE_API_KEY;

  try {
    // Construct the URL with the membership ID
    const url = `${baseUrl}/memberships/${membershipId}`;

    // Set up headers for the request
    const headers = {
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`
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
    console.error('Error getting membership details:', error);
    return { error: 'An error occurred while getting membership details.' };
  }
};

/**
 * Tool configuration for getting membership details from Webex.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'get_membership_details',
      description: 'Get details for a membership by ID.',
      parameters: {
        type: 'object',
        properties: {
          membershipId: {
            type: 'string',
            description: 'The unique identifier for the membership.'
          }
        },
        required: ['membershipId']
      }
    }
  }
};

export { apiTool };