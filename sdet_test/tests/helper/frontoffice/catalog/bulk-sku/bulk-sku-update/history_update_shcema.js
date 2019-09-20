const schema = {
  type: 'object',
  required: ['data', 'meta'],
  properties: {
    data: {
      type: 'array',
      items: {
        type: 'object',
        required: ['_id', 'title', 'user', 'payload', 'created_at', 'updated_at'],
        properties: {
          _id: {
            type: 'string',
          },
          title: {
            type: 'string',
          },
          user: {
            type: 'object',
            required: ['id', 'name', 'email', 'type'],
            properties: {
              id: {
                type: 'number',
              },
              name: {
                type: 'string',
              },
              email: {
                type: 'string',
              },
              type: {
                type: 'string',
              },
            },
          },
          payload: {
            type: 'object',
            required: ['url', 'file_name'],
            properties: {
              url: {
                type: 'string',
              },
              file_name: {
                type: 'string',
              },
            },
          },
          created_at: {
            type: 'string',
          },
          updated_at: {
            type: 'string',
          },
        },
      },
    },
    meta: {
      type: 'object',
      required: ['page', 'limit', 'total_data', 'total_page'],
      properties: {
        page: {
          type: 'string',
        },
        limit: {
          type: 'string',
        },
        total_data: {
          type: 'number',
        },
        total_page: {
          type: 'number',
        },
      },
    },
  },
};
module.exports = {
  schema,
};
