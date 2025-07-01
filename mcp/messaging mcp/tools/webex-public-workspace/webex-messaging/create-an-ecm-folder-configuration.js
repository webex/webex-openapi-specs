/**
 * Function to create an ECM folder configuration in a Webex room.
 *
 * @param {Object} args - Arguments for the folder configuration.
 * @param {string} args.roomId - The ID of the room where the folder will be linked.
 * @param {string} args.contentUrl - The URL of the content associated with the folder.
 * @param {string} args.displayName - The display name for the folder.
 * @param {string} args.driveId - The ID of the drive where the folder is located.
 * @param {string} args.itemId - The ID of the item (folder) to be linked.
 * @param {boolean} [args.defaultFolder=false] - Indicates if this folder should be the default folder.
 * @returns {Promise<Object>} - The result of the folder creation request.
 */
const executeFunction = async ({ roomId, contentUrl, displayName, driveId, itemId, defaultFolder = false }) => {
  const baseUrl = 'https://webexapis.com/v1'; // will be provided by the user
  const token = process.env.WEBEX_PUBLIC_WORKSPACE_API_KEY;

  try {
    // Construct the URL for the request
    const url = `${baseUrl}/room/linkedFolders`;

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
      displayName,
      driveId,
      itemId,
      defaultFolder
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
    console.error('Error creating ECM folder configuration:', error);
    return { error: 'An error occurred while creating the ECM folder configuration.' };
  }
};

/**
 * Tool configuration for creating an ECM folder configuration in Webex.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'create_ecm_folder',
      description: 'Create an ECM folder configuration in a Webex room.',
      parameters: {
        type: 'object',
        properties: {
          roomId: {
            type: 'string',
            description: 'The ID of the room where the folder will be linked.'
          },
          contentUrl: {
            type: 'string',
            description: 'The URL of the content associated with the folder.'
          },
          displayName: {
            type: 'string',
            description: 'The display name for the folder.'
          },
          driveId: {
            type: 'string',
            description: 'The ID of the drive where the folder is located.'
          },
          itemId: {
            type: 'string',
            description: 'The ID of the item (folder) to be linked.'
          },
          defaultFolder: {
            type: 'boolean',
            description: 'Indicates if this folder should be the default folder.'
          }
        },
        required: ['roomId', 'contentUrl', 'displayName', 'driveId', 'itemId']
      }
    }
  }
};

export { apiTool };