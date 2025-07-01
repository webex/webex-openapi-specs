/**
 * Function to delete a webhook from Webex.
 *
 * @param {Object} args - Arguments for the deletion.
 * @param {string} args.webhookId - The unique identifier for the webhook to be deleted.
 * @returns {Promise<Object>} - The result of the deletion operation.
 */
const executeFunction = async ({ webhookId }) => {
  const baseUrl = 'https://webexapis.com/v1'; // will be provided by the user
  const token = process.env.WEBEX_PUBLIC_WORKSPACE_API_KEY;
  try {
    // Construct the URL for the request
    const url = `${baseUrl}/webhooks/${webhookId}`;

    // Set up headers for the request
    const headers = {
      'Authorization': `Bearer ${token}`
    };

    // Perform the fetch request
    const response = await fetch(url, {
      method: 'DELETE',
      headers
    });

    // Check if the response was successful
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData);
    }

    // Return the response status
    return { status: response.status, message: 'Webhook deleted successfully.' };
  } catch (error) {
    console.error('Error deleting webhook:', error);
    return { error: 'An error occurred while deleting the webhook.' };
  }
};

/**
 * Tool configuration for deleting a webhook from Webex.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'delete_webhook',
      description: 'Delete a webhook from Webex.',
      parameters: {
        type: 'object',
        properties: {
          webhookId: {
            type: 'string',
            description: 'The unique identifier for the webhook to be deleted.'
          }
        },
        required: ['webhookId']
      }
    }
  }
};

export { apiTool };