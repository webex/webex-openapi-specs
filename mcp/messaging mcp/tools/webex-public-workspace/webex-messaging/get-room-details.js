/**
 * Function to get room details from Webex by room ID.
 *
 * @param {Object} args - Arguments for the room details request.
 * @param {string} args.roomId - The unique identifier for the room.
 * @returns {Promise<Object>} - The details of the room.
 */
const executeFunction = async ({ roomId }) => {
  const baseUrl = 'https://webexapis.com/v1'; // Base URL for the Webex API
  const token = process.env.WEBEX_PUBLIC_WORKSPACE_API_KEY;

  try {
    // Construct the URL with the room ID
    const url = `${baseUrl}/rooms/${roomId}`;

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
    console.error('Error getting room details:', error);
    return { error: 'An error occurred while getting room details.' };
  }
};

/**
 * Tool configuration for getting room details from Webex.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'get_room_details',
      description: 'Get details of a room by its ID from Webex.',
      parameters: {
        type: 'object',
        properties: {
          roomId: {
            type: 'string',
            description: 'The unique identifier for the room.'
          }
        },
        required: ['roomId']
      }
    }
  }
};

export { apiTool };