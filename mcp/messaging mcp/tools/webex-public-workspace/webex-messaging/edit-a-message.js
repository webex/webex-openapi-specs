/**
 * Function to edit a message in Webex.
 *
 * @param {Object} args - Arguments for editing the message.
 * @param {string} args.messageId - The unique identifier for the message to be edited.
 * @param {string} args.roomId - The ID of the room where the message is located.
 * @param {string} args.text - The new text for the message.
 * @param {string} [args.markdown] - The markdown formatted text for the message.
 * @returns {Promise<Object>} - The result of the message edit operation.
 */
const executeFunction = async ({ messageId, roomId, text, markdown }) => {
  const baseUrl = 'https://webexapis.com/v1'; // will be provided by the user
  const token = process.env.WEBEX_PUBLIC_WORKSPACE_API_KEY;
  try {
    // Construct the URL for the message edit
    const url = `${baseUrl}/messages/${messageId}`;

    // Prepare the request body
    const body = JSON.stringify({
      roomId,
      text,
      markdown
    });

    // Set up headers for the request
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`
    };

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
    console.error('Error editing message:', error);
    return { error: 'An error occurred while editing the message.' };
  }
};

/**
 * Tool configuration for editing a message in Webex.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'edit_message',
      description: 'Edit a message in Webex.',
      parameters: {
        type: 'object',
        properties: {
          messageId: {
            type: 'string',
            description: 'The unique identifier for the message to be edited.'
          },
          roomId: {
            type: 'string',
            description: 'The ID of the room where the message is located.'
          },
          text: {
            type: 'string',
            description: 'The new text for the message.'
          },
          markdown: {
            type: 'string',
            description: 'The markdown formatted text for the message.'
          }
        },
        required: ['messageId', 'roomId', 'text']
      }
    }
  }
};

export { apiTool };