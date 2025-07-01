/**
 * Function to create a message in a Webex room.
 *
 * @param {Object} args - Arguments for creating a message.
 * @param {string} args.roomId - The ID of the room where the message will be sent.
 * @param {string} [args.parentId] - The ID of the parent message (if applicable).
 * @param {string} [args.toPersonId] - The ID of the person to whom the message is directed.
 * @param {string} [args.toPersonEmail] - The email of the person to whom the message is directed.
 * @param {string} args.text - The plain text content of the message.
 * @param {string} [args.markdown] - The markdown formatted content of the message.
 * @param {Array<string>} [args.files] - An array of file URLs to attach to the message.
 * @param {Array<Object>} [args.attachments] - An array of attachment objects to include with the message.
 * @returns {Promise<Object>} - The result of the message creation.
 */
const executeFunction = async ({ roomId, parentId, toPersonId, toPersonEmail, text, markdown, files = [], attachments = [] }) => {
  const baseUrl = 'https://webexapis.com/v1'; // Base URL will be provided by the user
  const token = process.env.WEBEX_PUBLIC_WORKSPACE_API_KEY;

  try {
    const url = `${baseUrl}/messages`;
    const body = JSON.stringify({
      roomId,
      parentId,
      toPersonId,
      toPersonEmail,
      text,
      markdown,
      files,
      attachments
    });

    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`
    };

    const response = await fetch(url, {
      method: 'POST',
      headers,
      body
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error creating message:', error);
    return { error: 'An error occurred while creating the message.' };
  }
};

/**
 * Tool configuration for creating messages in Webex.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'create_message',
      description: 'Create a message in a Webex room.',
      parameters: {
        type: 'object',
        properties: {
          roomId: {
            type: 'string',
            description: 'The ID of the room where the message will be sent.'
          },
          parentId: {
            type: 'string',
            description: 'The ID of the parent message (if applicable).'
          },
          toPersonId: {
            type: 'string',
            description: 'The ID of the person to whom the message is directed.'
          },
          toPersonEmail: {
            type: 'string',
            description: 'The email of the person to whom the message is directed.'
          },
          text: {
            type: 'string',
            description: 'The plain text content of the message.'
          },
          markdown: {
            type: 'string',
            description: 'The markdown formatted content of the message.'
          },
          files: {
            type: 'array',
            items: {
              type: 'string'
            },
            description: 'An array of file URLs to attach to the message.'
          },
          attachments: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                contentType: {
                  type: 'string',
                  description: 'The content type of the attachment.'
                },
                content: {
                  type: 'object',
                  description: 'The content of the attachment.'
                }
              }
            },
            description: 'An array of attachment objects to include with the message.'
          }
        },
        required: ['roomId', 'text']
      }
    }
  }
};

export { apiTool };