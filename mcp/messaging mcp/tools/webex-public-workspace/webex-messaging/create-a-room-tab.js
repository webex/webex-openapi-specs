/**
 * Function to create a room tab in Webex.
 *
 * @param {Object} args - Arguments for creating a room tab.
 * @param {string} args.roomId - The ID of the room where the tab will be added.
 * @param {string} args.contentUrl - The URL to be displayed in the tab.
 * @param {string} args.displayName - The name of the tab to be displayed.
 * @returns {Promise<Object>} - The result of the room tab creation.
 */
const executeFunction = async ({ roomId, contentUrl, displayName }) => {
  const baseUrl = 'https://webexapis.com/v1'; // will be provided by the user
  const token = process.env.WEBEX_PUBLIC_WORKSPACE_API_KEY;
  try {
    // Construct the URL for the request
    const url = `${baseUrl}/room/tabs`;

    // Set up headers for the request
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`
    };

    // Prepare the request body
    const body = JSON.stringify({
      roomId,
      contentUrl,
      displayName
    });

    // Perform the fetch request
    const response = await fetch(url, {
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
    console.error('Error creating room tab:', error);
    return { error: 'An error occurred while creating the room tab.' };
  }
};

/**
 * Tool configuration for creating a room tab in Webex.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'create_room_tab',
      description: 'Create a tab in a specified room in Webex.',
      parameters: {
        type: 'object',
        properties: {
          roomId: {
            type: 'string',
            description: 'The ID of the room where the tab will be added.'
          },
          contentUrl: {
            type: 'string',
            description: 'The URL to be displayed in the tab.'
          },
          displayName: {
            type: 'string',
            description: 'The name of the tab to be displayed.'
          }
        },
        required: ['roomId', 'contentUrl', 'displayName']
      }
    }
  }
};

export { apiTool };