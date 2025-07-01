/**
 * Function to create a team membership in Webex.
 *
 * @param {Object} args - Arguments for creating a team membership.
 * @param {string} args.teamId - The ID of the team to which the person will be added.
 * @param {string} args.personId - The ID of the person to be added to the team.
 * @param {string} args.personEmail - The email address of the person to be added to the team.
 * @param {boolean} [args.isModerator=false] - Indicates if the person should be a moderator.
 * @returns {Promise<Object>} - The result of the team membership creation.
 */
const executeFunction = async ({ teamId, personId, personEmail, isModerator = false }) => {
  const baseUrl = 'https://webexapis.com/v1'; // will be provided by the user
  const token = process.env.WEBEX_PUBLIC_WORKSPACE_API_KEY;
  try {
    const url = `${baseUrl}/team/memberships`;
    
    const body = JSON.stringify({
      teamId,
      personId,
      personEmail,
      isModerator
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
    console.error('Error creating team membership:', error);
    return { error: 'An error occurred while creating the team membership.' };
  }
};

/**
 * Tool configuration for creating a team membership in Webex.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'create_team_membership',
      description: 'Create a team membership in Webex.',
      parameters: {
        type: 'object',
        properties: {
          teamId: {
            type: 'string',
            description: 'The ID of the team to which the person will be added.'
          },
          personId: {
            type: 'string',
            description: 'The ID of the person to be added to the team.'
          },
          personEmail: {
            type: 'string',
            description: 'The email address of the person to be added to the team.'
          },
          isModerator: {
            type: 'boolean',
            description: 'Indicates if the person should be a moderator.'
          }
        },
        required: ['teamId', 'personId', 'personEmail']
      }
    }
  }
};

export { apiTool };