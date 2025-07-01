/**
 * Function to update a person's details in Webex.
 *
 * @param {Object} args - Arguments for updating the person.
 * @param {string} args.personId - The unique identifier for the person to be updated.
 * @param {Object} args.personDetails - The details of the person to update.
 * @returns {Promise<Object>} - The result of the update operation.
 */
const executeFunction = async ({ personId, personDetails }) => {
  const baseUrl = 'https://webexapis.com/v1'; // will be provided by the user
  const token = process.env.WEBEX_PUBLIC_WORKSPACE_API_KEY;
  
  try {
    // Construct the URL with the personId
    const url = `${baseUrl}/people/${personId}?callingData=true&showAllTypes=true&minResponse=true`;

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
      body: JSON.stringify(personDetails)
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
    console.error('Error updating person details:', error);
    return { error: 'An error occurred while updating person details.' };
  }
};

/**
 * Tool configuration for updating a person's details in Webex.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'update_person',
      description: 'Update a person\'s details in Webex.',
      parameters: {
        type: 'object',
        properties: {
          personId: {
            type: 'string',
            description: 'The unique identifier for the person to be updated.'
          },
          personDetails: {
            type: 'object',
            description: 'The details of the person to update.'
          }
        },
        required: ['personId', 'personDetails']
      }
    }
  }
};

export { apiTool };