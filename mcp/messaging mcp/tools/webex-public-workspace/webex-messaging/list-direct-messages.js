/**
 * Function to list direct messages in a 1:1 room on Webex.
 *
 * @param {Object} args - Arguments for the message listing.
 * @param {string} args.parentId - The ID of the parent message to filter by.
 * @param {string} args.personId - The ID of the person to filter messages by.
 * @param {string} args.personEmail - The email of the person to filter messages by.
 * @returns {Promise<Object>} - The result of the message listing.
 */
const executeFunction = async ({ parentId, personId, personEmail }) => {
  const baseUrl = 'https://webexapis.com/v1'; // will be provided by the user
  const token = process.env.WEBEX_PUBLIC_WORKSPACE_API_KEY;
  try {
    // Construct the URL with query parameters
    const url = new URL(`${baseUrl}/messages/direct`);
    url.searchParams.append('parentId', parentId);
    url.searchParams.append('personId', personId);
    url.searchParams.append('personEmail', personEmail);

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
    console.error('Error listing direct messages:', error);
    return { error: 'An error occurred while listing direct messages.' };
  }
};

/**
 * Tool configuration for listing direct messages on Webex.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'list_direct_messages',
      description: 'List all messages in a 1:1 room on Webex.',
      parameters: {
        type: 'object',
        properties: {
          parentId: {
            type: 'string',
            description: 'The ID of the parent message to filter by.'
          },
          personId: {
            type: 'string',
            description: 'The ID of the person to filter messages by.'
          },
          personEmail: {
            type: 'string',
            description: 'The email of the person to filter messages by.'
          }
        },
        required: ['parentId', 'personId', 'personEmail']
      }
    }
  }
};

export { apiTool };