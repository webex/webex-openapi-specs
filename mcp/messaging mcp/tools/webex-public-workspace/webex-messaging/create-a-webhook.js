/**
 * Function to create a webhook in Webex.
 *
 * @param {Object} args - Arguments for creating the webhook.
 * @param {string} args.name - The name of the webhook.
 * @param {string} args.targetUrl - The URL that will receive the webhook events.
 * @param {string} args.resource - The resource the webhook is associated with.
 * @param {string} args.event - The event that triggers the webhook.
 * @param {string} args.filter - The filter to apply to the webhook.
 * @param {string} args.secret - The secret used to secure the webhook.
 * @param {string} args.ownedBy - The owner of the webhook.
 * @returns {Promise<Object>} - The result of the webhook creation.
 */
const executeFunction = async ({ name, targetUrl, resource, event, filter, secret, ownedBy }) => {
  const baseUrl = 'https://webexapis.com/v1'; // Base URL for the Webex API
  const token = process.env.WEBEX_PUBLIC_WORKSPACE_API_KEY;

  const webhookData = {
    name,
    targetUrl,
    resource,
    event,
    filter,
    secret,
    ownedBy
  };

  try {
    // Set up headers for the request
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`
    };

    // Perform the fetch request
    const response = await fetch(`${baseUrl}/webhooks`, {
      method: 'POST',
      headers,
      body: JSON.stringify(webhookData)
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
    console.error('Error creating webhook:', error);
    return { error: 'An error occurred while creating the webhook.' };
  }
};

/**
 * Tool configuration for creating a webhook in Webex.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'create_webhook',
      description: 'Create a webhook in Webex.',
      parameters: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
            description: 'The name of the webhook.'
          },
          targetUrl: {
            type: 'string',
            description: 'The URL that will receive the webhook events.'
          },
          resource: {
            type: 'string',
            description: 'The resource the webhook is associated with.'
          },
          event: {
            type: 'string',
            description: 'The event that triggers the webhook.'
          },
          filter: {
            type: 'string',
            description: 'The filter to apply to the webhook.'
          },
          secret: {
            type: 'string',
            description: 'The secret used to secure the webhook.'
          },
          ownedBy: {
            type: 'string',
            description: 'The owner of the webhook.'
          }
        },
        required: ['name', 'targetUrl', 'resource', 'event', 'filter', 'secret', 'ownedBy']
      }
    }
  }
};

export { apiTool };