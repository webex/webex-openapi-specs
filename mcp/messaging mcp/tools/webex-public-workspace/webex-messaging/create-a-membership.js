/**
 * Function to create a membership in a Webex room.
 *
 * @param {Object} args - Arguments for creating a membership.
 * @param {string} args.roomId - The ID of the room to which the person will be added.
 * @param {string} args.personId - The ID of the person to be added to the room.
 * @param {string} [args.personEmail] - The email of the person to be added to the room.
 * @param {boolean} [args.isModerator=false] - Whether the person should be a moderator in the room.
 * @returns {Promise<Object>} - The result of the membership creation.
 */
const executeFunction = async ({ roomId, personId, personEmail, isModerator = false }) => {
  const baseUrl = 'https://webexapis.com/v1'; // will be provided by the user
  const token = process.env.WEBEX_PUBLIC_WORKSPACE_API_KEY;
  try {
    // Construct the request body
    const body = JSON.stringify({
      roomId,
      personId,
      personEmail,
      isModerator
    });

    // Set up headers for the request
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`
    };

    // Perform the fetch request
    const response = await fetch(`${baseUrl}/memberships`, {
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
    console.error('Error creating membership:', error);
    return { error: 'An error occurred while creating the membership.' };
  }
};

/**
 * Tool configuration for creating a membership in a Webex room.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'create_membership',
      description: 'Create a membership in a Webex room.',
      parameters: {
        type: 'object',
        properties: {
          roomId: {
            type: 'string',
            description: 'The ID of the room to which the person will be added.'
          },
          personId: {
            type: 'string',
            description: 'The ID of the person to be added to the room.'
          },
          personEmail: {
            type: 'string',
            description: 'The email of the person to be added to the room.'
          },
          isModerator: {
            type: 'boolean',
            description: 'Whether the person should be a moderator in the room.'
          }
        },
        required: ['roomId', 'personId']
      }
    }
  }
};

export { apiTool };