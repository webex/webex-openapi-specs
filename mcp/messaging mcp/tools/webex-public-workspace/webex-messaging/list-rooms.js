/**
 * Function to list rooms in Webex for the authenticated user.
 *
 * @param {Object} args - Arguments for the room listing.
 * @param {string} args.teamId - The ID of the team to list rooms for.
 * @param {string} [args.type="group"] - The type of rooms to list (e.g., group, direct).
 * @param {boolean} [args.orgPublicSpaces=true] - Whether to include public spaces.
 * @param {string} [args.from] - Filter rooms made public after this time.
 * @param {string} [args.to] - Filter rooms made public before this time.
 * @param {string} [args.sortBy="id"] - The field to sort the results by.
 * @param {number} [args.max=100] - The maximum number of rooms to return (1-1000).
 * @returns {Promise<Object>} - The result of the room listing.
 */
const executeFunction = async ({ teamId, type = 'group', orgPublicSpaces = true, from, to, sortBy = 'id', max = 100 }) => {
  const baseUrl = 'https://webexapis.com/v1'; // will be provided by the user
  const token = process.env.WEBEX_PUBLIC_WORKSPACE_API_KEY;
  try {
    // Construct the URL with query parameters
    const url = new URL(`${baseUrl}/rooms`);
    url.searchParams.append('teamId', teamId);
    url.searchParams.append('type', type);
    url.searchParams.append('orgPublicSpaces', orgPublicSpaces.toString());
    if (from) url.searchParams.append('from', from);
    if (to) url.searchParams.append('to', to);
    url.searchParams.append('sortBy', sortBy);
    url.searchParams.append('max', max.toString());

    // Set up headers for the request
    const headers = {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json'
    };

    // Perform the fetch request
    const response = await fetch(url.toString(), {
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
    console.error('Error listing rooms:', error);
    return { error: 'An error occurred while listing rooms.' };
  }
};

/**
 * Tool configuration for listing rooms in Webex.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'list_rooms',
      description: 'List rooms for the authenticated user in Webex.',
      parameters: {
        type: 'object',
        properties: {
          teamId: {
            type: 'string',
            description: 'The ID of the team to list rooms for.'
          },
          type: {
            type: 'string',
            enum: ['group', 'direct'],
            description: 'The type of rooms to list.'
          },
          orgPublicSpaces: {
            type: 'boolean',
            description: 'Whether to include public spaces.'
          },
          from: {
            type: 'string',
            description: 'Filter rooms made public after this time.'
          },
          to: {
            type: 'string',
            description: 'Filter rooms made public before this time.'
          },
          sortBy: {
            type: 'string',
            description: 'The field to sort the results by.'
          },
          max: {
            type: 'integer',
            description: 'The maximum number of rooms to return.'
          }
        },
        required: ['teamId']
      }
    }
  }
};

export { apiTool };