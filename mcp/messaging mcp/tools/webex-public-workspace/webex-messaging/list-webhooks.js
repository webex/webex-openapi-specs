/**
 * Function to list webhooks in Webex.
 *
 * @param {Object} args - Arguments for listing webhooks.
 * @param {number} [args.max=100] - Limit the maximum number of webhooks in the response.
 * @param {string} [args.ownedBy='org'] - Limit the result list to org wide webhooks. Only allowed value is `org`.
 * @returns {Promise<Object>} - The result of the webhook listing.
 */
const executeFunction = async ({ max = 100, ownedBy = 'org' }) => {
  const baseUrl = 'https://webexapis.com/v1'; // will be provided by the user
  const token = process.env.WEBEX_PUBLIC_WORKSPACE_API_KEY;
  try {
    // Construct the URL with query parameters
    const url = new URL(`${baseUrl}/webhooks`);
    url.searchParams.append('max', max.toString());
    url.searchParams.append('ownedBy', ownedBy);

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
    console.error('Error listing webhooks:', error);
    return { error: 'An error occurred while listing webhooks.' };
  }
};

/**
 * Tool configuration for listing webhooks in Webex.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'list_webhooks',
      description: 'List all of your webhooks in Webex.',
      parameters: {
        type: 'object',
        properties: {
          max: {
            type: 'integer',
            description: 'Limit the maximum number of webhooks in the response.'
          },
          ownedBy: {
            type: 'string',
            enum: ['org'],
            description: 'Limit the result list to org wide webhooks.'
          }
        },
        required: []
      }
    }
  }
};

export { apiTool };