/**
 * Function to update a membership in Webex.
 *
 * @param {Object} args - Arguments for updating the membership.
 * @param {string} args.membershipId - The unique identifier for the membership (required).
 * @param {boolean} [args.isModerator=true] - Indicates if the user is a moderator.
 * @param {boolean} [args.isRoomHidden=false] - Indicates if the room is hidden.
 * @returns {Promise<Object>} - The result of the membership update.
 */
const executeFunction = async ({ membershipId, isModerator = true, isRoomHidden = false }) => {
  const baseUrl = 'https://webexapis.com/v1'; // will be provided by the user
  const token = process.env.WEBEX_PUBLIC_WORKSPACE_API_KEY;
  const url = `${baseUrl}/memberships/${membershipId}`;
  
  const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': `Bearer ${token}`
  };

  const body = JSON.stringify({
    isModerator,
    isRoomHidden
  });

  try {
    const response = await fetch(url, {
      method: 'PUT',
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
    console.error('Error updating membership:', error);
    return { error: 'An error occurred while updating the membership.' };
  }
};

/**
 * Tool configuration for updating a membership in Webex.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'update_membership',
      description: 'Update a membership in Webex.',
      parameters: {
        type: 'object',
        properties: {
          membershipId: {
            type: 'string',
            description: 'The unique identifier for the membership.'
          },
          isModerator: {
            type: 'boolean',
            description: 'Indicates if the user is a moderator.'
          },
          isRoomHidden: {
            type: 'boolean',
            description: 'Indicates if the room is hidden.'
          }
        },
        required: ['membershipId']
      }
    }
  }
};

export { apiTool };