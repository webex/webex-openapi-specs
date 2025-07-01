/**
 * Function to list messages in a Webex room.
 *
 * @param {Object} args - Arguments for listing messages.
 * @param {string} args.roomId - (Required) The ID of the room to list messages from.
 * @param {string} [args.parentId] - List messages with a parent, by ID.
 * @param {string} [args.mentionedPeople] - List messages with these people mentioned, by ID. Use `me` as a shorthand for the current API user.
 * @param {string} [args.before] - List messages sent before a date and time.
 * @param {string} [args.beforeMessage] - List messages sent before a message, by ID.
 * @param {number} [args.max=100] - Limit the maximum number of messages in the response. Cannot exceed 100 if used with `mentionedPeople`.
 * @returns {Promise<Object>} - The result of the message listing.
 */
const executeFunction = async ({ roomId, parentId, mentionedPeople, before, beforeMessage, max = 100 }) => {
  const baseUrl = 'https://webexapis.com/v1'; // will be provided by the user
  const token = process.env.WEBEX_PUBLIC_WORKSPACE_API_KEY;
  try {
    // Construct the URL with query parameters
    const url = new URL(`${baseUrl}/messages`);
    url.searchParams.append('roomId', roomId);
    if (parentId) url.searchParams.append('parentId', parentId);
    if (mentionedPeople) url.searchParams.append('mentionedPeople', mentionedPeople);
    if (before) url.searchParams.append('before', before);
    if (beforeMessage) url.searchParams.append('beforeMessage', beforeMessage);
    url.searchParams.append('max', max.toString());

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
    console.error('Error listing messages:', error);
    return { error: 'An error occurred while listing messages.' };
  }
};

/**
 * Tool configuration for listing messages in a Webex room.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'list_messages',
      description: 'List messages in a Webex room.',
      parameters: {
        type: 'object',
        properties: {
          roomId: {
            type: 'string',
            description: '(Required) The ID of the room to list messages from.'
          },
          parentId: {
            type: 'string',
            description: 'List messages with a parent, by ID.'
          },
          mentionedPeople: {
            type: 'string',
            description: 'List messages with these people mentioned, by ID. Use `me` as a shorthand for the current API user.'
          },
          before: {
            type: 'string',
            description: 'List messages sent before a date and time.'
          },
          beforeMessage: {
            type: 'string',
            description: 'List messages sent before a message, by ID.'
          },
          max: {
            type: 'integer',
            description: 'Limit the maximum number of messages in the response. Cannot exceed 100 if used with `mentionedPeople`.'
          }
        },
        required: ['roomId']
      }
    }
  }
};

export { apiTool };