/**
 * Function to get the profile details of the authenticated user from Webex.
 *
 * @param {Object} args - Arguments for the request.
 * @param {boolean} [args.callingData=true] - Include Webex Calling user details in the response.
 * @returns {Promise<Object>} - The profile details of the authenticated user.
 */
const executeFunction = async ({ callingData = true }) => {
  const baseUrl = 'https://webexapis.com/v1'; // Base URL for Webex API
  const token = process.env.WEBEX_PUBLIC_WORKSPACE_API_KEY;

  try {
    // Construct the URL with query parameters
    const url = new URL(`${baseUrl}/people/me`);
    url.searchParams.append('callingData', callingData.toString());

    // Set up headers for the request
    const headers = {
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`
    };

    // Perform the fetch request
    const response = await fetch(url.toString(), {
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
    console.error('Error getting user details:', error);
    return { error: 'An error occurred while getting user details.' };
  }
};

/**
 * Tool configuration for getting user details from Webex.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'get_my_details',
      description: 'Get profile details for the authenticated user.',
      parameters: {
        type: 'object',
        properties: {
          callingData: {
            type: 'boolean',
            description: 'Include Webex Calling user details in the response.'
          }
        },
        required: []
      }
    }
  }
};

export { apiTool };