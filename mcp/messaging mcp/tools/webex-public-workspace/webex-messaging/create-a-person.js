/**
 * Function to create a new person in Webex.
 *
 * @param {Object} args - The details of the person to create.
 * @param {Array<string>} args.emails - An array of email addresses for the person.
 * @param {Array<Object>} args.phoneNumbers - An array of phone number objects.
 * @param {string} args.extension - The extension number for the person.
 * @param {string} args.locationId - The location ID for the person.
 * @param {string} args.displayName - The display name of the person.
 * @param {string} args.firstName - The first name of the person.
 * @param {string} args.lastName - The last name of the person.
 * @param {string} args.avatar - The URL of the person's avatar.
 * @param {string} args.orgId - The organization ID for the person.
 * @param {Array<string>} args.roles - An array of role IDs for the person.
 * @param {Array<string>} args.licenses - An array of license IDs for the person.
 * @param {string} args.department - The department of the person.
 * @param {string} args.manager - The name of the person's manager.
 * @param {string} args.managerId - The manager's ID.
 * @param {string} args.title - The title of the person.
 * @param {Array<Object>} args.addresses - An array of address objects for the person.
 * @param {Array<string>} args.siteUrls - An array of site URLs for the person.
 * @param {boolean} [args.callingData=true] - Include Webex Calling user details in the response.
 * @param {boolean} [args.minResponse=true] - Set to true to improve performance by omitting person details.
 * @returns {Promise<Object>} - The result of the person creation.
 */
const executeFunction = async ({
  emails,
  phoneNumbers,
  extension,
  locationId,
  displayName,
  firstName,
  lastName,
  avatar,
  orgId,
  roles,
  licenses,
  department,
  manager,
  managerId,
  title,
  addresses,
  siteUrls,
  callingData = true,
  minResponse = true
}) => {
  const baseUrl = 'https://webexapis.com/v1'; // will be provided by the user
  const token = process.env.WEBEX_PUBLIC_WORKSPACE_API_KEY;
  try {
    const url = new URL(`${baseUrl}/people?callingData=${callingData}&minResponse=${minResponse}`);

    const body = {
      emails,
      phoneNumbers,
      extension,
      locationId,
      displayName,
      firstName,
      lastName,
      avatar,
      orgId,
      roles,
      licenses,
      department,
      manager,
      managerId,
      title,
      addresses,
      siteUrls
    };

    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`
    };

    const response = await fetch(url.toString(), {
      method: 'POST',
      headers,
      body: JSON.stringify(body)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error creating person:', error);
    return { error: 'An error occurred while creating the person.' };
  }
};

/**
 * Tool configuration for creating a person in Webex.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'create_person',
      description: 'Create a new person in Webex.',
      parameters: {
        type: 'object',
        properties: {
          emails: {
            type: 'array',
            items: { type: 'string' },
            description: 'An array of email addresses for the person.'
          },
          phoneNumbers: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                type: { type: 'string' },
                value: { type: 'string' }
              }
            },
            description: 'An array of phone number objects.'
          },
          extension: {
            type: 'string',
            description: 'The extension number for the person.'
          },
          locationId: {
            type: 'string',
            description: 'The location ID for the person.'
          },
          displayName: {
            type: 'string',
            description: 'The display name of the person.'
          },
          firstName: {
            type: 'string',
            description: 'The first name of the person.'
          },
          lastName: {
            type: 'string',
            description: 'The last name of the person.'
          },
          avatar: {
            type: 'string',
            description: 'The URL of the person\'s avatar.'
          },
          orgId: {
            type: 'string',
            description: 'The organization ID for the person.'
          },
          roles: {
            type: 'array',
            items: { type: 'string' },
            description: 'An array of role IDs for the person.'
          },
          licenses: {
            type: 'array',
            items: { type: 'string' },
            description: 'An array of license IDs for the person.'
          },
          department: {
            type: 'string',
            description: 'The department of the person.'
          },
          manager: {
            type: 'string',
            description: 'The name of the person\'s manager.'
          },
          managerId: {
            type: 'string',
            description: 'The manager\'s ID.'
          },
          title: {
            type: 'string',
            description: 'The title of the person.'
          },
          addresses: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                type: { type: 'string' },
                country: { type: 'string' },
                locality: { type: 'string' },
                region: { type: 'string' },
                streetAddress: { type: 'string' },
                postalCode: { type: 'string' }
              }
            },
            description: 'An array of address objects for the person.'
          },
          siteUrls: {
            type: 'array',
            items: { type: 'string' },
            description: 'An array of site URLs for the person.'
          },
          callingData: {
            type: 'boolean',
            description: 'Include Webex Calling user details in the response.'
          },
          minResponse: {
            type: 'boolean',
            description: 'Set to true to improve performance by omitting person details.'
          }
        },
        required: ['emails', 'firstName', 'lastName']
      }
    }
  }
};

export { apiTool };