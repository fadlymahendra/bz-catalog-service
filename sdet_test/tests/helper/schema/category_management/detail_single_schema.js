function typeLabel(labelType) {
  return {
    type: labelType,
  };
}

const allOfString = {
  allOf: [
    { not: { type: 'null' } },
    { type: 'string' },
  ],
  minLength: 1,
};

const allOfNumber = {
  allOf: [
    { not: { type: 'null' } },
    { type: 'number' },
  ],
  minLength: 1,
};


const detail_single_category = {
  type: 'object',
  required: ['id', 'name', 'level', 'base_margin', 'commission', 'unspsc', 'sequence', 'parent', 'hirarchy', 'breadcrumb', 'is_active', 'created_by', 'created_at', 'updated_at'],
  properties: {
    id: allOfNumber,
    name: allOfString,
    level: allOfString,
    base_margin: typeLabel('null'),
    commission: typeLabel('null'),
    unspsc: allOfNumber,
    sequence: allOfNumber,
    parent: {
      type: ['object', 'null'],
      require: ['id', 'name'],
      properties: {
        id: allOfNumber,
        name: allOfString,
      },
      additionalProperties: false,
    },
    hirarchy: {
      type: ['array', 'null'],
      properties: {
        id: allOfNumber,
        level: allOfString,
        name: allOfString,
        unspsc: allOfNumber,
      },
    },
    breadcrumb: ['string', 'null'],
    is_active: allOfNumber,
    created_by: [allOfNumber, 'null'],
    created_at: allOfString,
    updated_at: allOfString,
  },
  additionalProperties: false,

};


module.exports = {
  detail_single_category,
};
