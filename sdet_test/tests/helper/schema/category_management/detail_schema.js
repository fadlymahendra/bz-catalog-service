const typeLabel = function (labelType) {
  return {
    type: labelType,
  };
};

const allof_string = {
  allOf: [
    { not: { type: 'null' } },
    { type: 'string' },
  ],
  minLength: 1,
};

const allof_number = {
  allOf: [
    { not: { type: 'null' } },
    { type: 'number' },
  ],
  minLength: 1,
};


const detail_category = {
  type: 'array',
  required: ['id', 'name', 'level', 'base_margin', 'commission', 'unspsc', 'sequence', 'parent', 'breadcrumb', 'is_active', 'created_by', 'created_at', 'updated_at'],
  properties: {
    id: allof_number,
    name: allof_string,
    level: allof_string,
    base_margin: typeLabel('null'),
    commission: typeLabel('null'),
    unspsc: allof_number,
    sequence: allof_number,
    parent: {
      type: ['object', 'null'],
      require: ['id', 'name'],
      properties: {
        id: allof_number,
        name: allof_string,
      },
      additionalProperties: false,
    },
    breadcrumb: ['string', 'null'],
    is_active: allof_number,
    created_by: allof_number,
    created_at: allof_string,
    updated_at: allof_string,
  },
  additionalProperties: false,

};


module.exports = {
  detail_category,
};
