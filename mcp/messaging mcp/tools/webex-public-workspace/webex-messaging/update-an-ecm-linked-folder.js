/**
 * Function to update an ECM linked folder in Webex.
 *
 * @param {Object} args - Arguments for the update.
 * @param {string} args.id - The unique identifier for the room folder.
 * @param {string} args.roomId - The ID of the room associated with the folder.
 * @param {string} args.contentUrl - The URL of the content.
 * @param {string} args.displayName - The display name for the folder.
 * @param {string} args.driveId - The ID of the drive.
 * @param {string} args.itemId - The ID of the item.
 * @param {boolean} [args.defaultFolder=false] - Indicates if this is the default folder.
 * @returns {Promise<Object>} - The result of the update operation.
 */
const executeFunction = async ({ id, roomId, contentUrl, displayName, driveId, itemId, defaultFolder = false }) => {
  const baseUrl = 'https://webexapis.com/v1'; // will be provided by the user
  const token = process.env.WEBEX_PUBLIC_WORKSPACE_API_KEY;
  try {
    // Construct the URL for the request
    const url = `${baseUrl}/room/linkedFolders/${id}`;

    // Prepare the request body
    const body = JSON.stringify({
      roomId,
      contentUrl,
      displayName,
      driveId,
      itemId,
      defaultFolder
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
    console.error('Error updating the linked folder:', error);
    return { error: 'An error occurred while updating the linked folder.' };
  }
};

/**
 * Tool configuration for updating an ECM linked folder in Webex.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'update_ecm_linked_folder',
      description: 'Update an ECM linked folder in Webex.',
      parameters: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            description: 'The unique identifier for the room folder.'
          },
          roomId: {
            type: 'string',
            description: 'The ID of the room associated with the folder.'
          },
          contentUrl: {
            type: 'string',
            description: 'The URL of the content.'
          },
          displayName: {
            type: 'string',
            description: 'The display name for the folder.'
          },
          driveId: {
            type: 'string',
            description: 'The ID of the drive.'
          },
          itemId: {
            type: 'string',
            description: 'The ID of the item.'
          },
          defaultFolder: {
            type: 'boolean',
            description: 'Indicates if this is the default folder.'
          }
        },
        required: ['id', 'roomId', 'contentUrl', 'displayName', 'driveId', 'itemId']
      }
    }
  }
};

export { apiTool };