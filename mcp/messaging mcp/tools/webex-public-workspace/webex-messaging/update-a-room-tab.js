/**
 * Function to update a Room Tab in Webex.
 *
 * @param {Object} args - Arguments for the update.
 * @param {string} args.id - The unique identifier for the Room Tab (path variable).
 * @param {string} args.roomId - The ID of the room to which the tab belongs.
 * @param {string} args.contentUrl - The new content URL for the tab.
 * @param {string} args.displayName - The display name for the tab.
 * @returns {Promise<Object>} - The result of the update operation.
 */
const executeFunction = async ({ id, roomId, contentUrl, displayName }) => {
  const baseUrl = 'https://webexapis.com/v1'; // will be provided by the user
  const token = process.env.WEBEX_PUBLIC_WORKSPACE_API_KEY;
  try {
    // Construct the URL for the request
    const url = `${baseUrl}/room/tabs/${id}`;

    // Prepare the request body
    const body = JSON.stringify({
      roomId,
      contentUrl,
      displayName
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
    console.error('Error updating Room Tab:', error);
    return { error: 'An error occurred while updating the Room Tab.' };
  }
};

/**
 * Tool configuration for updating a Room Tab in Webex.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'update_room_tab',
      description: 'Update a Room Tab in Webex.',
      parameters: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            description: 'The unique identifier for the Room Tab.'
          },
          roomId: {
            type: 'string',
            description: 'The ID of the room to which the tab belongs.'
          },
          contentUrl: {
            type: 'string',
            description: 'The new content URL for the tab.'
          },
          displayName: {
            type: 'string',
            description: 'The display name for the tab.'
          }
        },
        required: ['id', 'roomId', 'contentUrl', 'displayName']
      }
    }
  }
};

export { apiTool };