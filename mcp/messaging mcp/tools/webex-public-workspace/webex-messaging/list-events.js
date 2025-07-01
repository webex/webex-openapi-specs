/**
 * Function to list events in an organization using Webex API.
 *
 * @param {Object} args - Arguments for the event listing.
 * @param {string} args.resource - The resource type to filter events (e.g., "messages").
 * @param {string} args.type - The event type to filter (e.g., "created").
 * @param {string} args.actorId - The ID of the actor to filter events by.
 * @param {string} args.from - The start date to filter events.
 * @param {string} args.to - The end date to filter events.
 * @param {number} args.max - The maximum number of events to return (between 1 and 1000).
 * @returns {Promise<Object>} - The result of the event listing.
 */
const executeFunction = async ({ resource, type, actorId, from, to, max }) => {
  const baseUrl = 'https://webexapis.com/v1'; // will be provided by the user
  const token = process.env.WEBEX_PUBLIC_WORKSPACE_API_KEY;
  try {
    // Construct the URL with query parameters
    const url = new URL(`${baseUrl}/events`);
    url.searchParams.append('resource', resource);
    url.searchParams.append('type', type);
    url.searchParams.append('actorId', actorId);
    url.searchParams.append('from', from);
    url.searchParams.append('to', to);
    url.searchParams.append('max', max.toString());

    // Set up headers for the request
    const headers = {
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`
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
    console.error('Error listing events:', error);
    return { error: 'An error occurred while listing events.' };
  }
};

/**
 * Tool configuration for listing events in Webex.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'list_events',
      description: 'List events in your organization using Webex API.',
      parameters: {
        type: 'object',
        properties: {
          resource: {
            type: 'string',
            description: 'The resource type to filter events (e.g., "messages").'
          },
          type: {
            type: 'string',
            description: 'The event type to filter (e.g., "created").'
          },
          actorId: {
            type: 'string',
            description: 'The ID of the actor to filter events by.'
          },
          from: {
            type: 'string',
            description: 'The start date to filter events.'
          },
          to: {
            type: 'string',
            description: 'The end date to filter events.'
          },
          max: {
            type: 'integer',
            description: 'The maximum number of events to return (between 1 and 1000).'
          }
        },
        required: ['resource', 'type', 'actorId', 'from', 'to', 'max']
      }
    }
  }
};

export { apiTool };