/**
 * Function to get message details from Webex by message ID.
 *
 * @param {Object} args - Arguments for the message details request.
 * @param {string} args.messageId - The unique identifier for the message.
 * @returns {Promise<Object>} - The details of the message.
 */
const executeFunction = async ({ messageId }) => {
  const baseUrl = 'https://webexapis.com/v1'; // will be provided by the user
  const token = process.env.WEBEX_PUBLIC_WORKSPACE_API_KEY;
  try {
    // Construct the URL with the message ID
    const url = `${baseUrl}/messages/${messageId}`;

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
    console.error('Error fetching message details:', error);
    return { error: 'An error occurred while fetching message details.' };
  }
};

/**
 * Tool configuration for getting message details from Webex.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'get_message_details',
      description: 'Retrieve details for a specific message by its ID.',
      parameters: {
        type: 'object',
        properties: {
          messageId: {
            type: 'string',
            description: 'The unique identifier for the message.'
          }
        },
        required: ['messageId']
      }
    }
  }
};

export { apiTool };