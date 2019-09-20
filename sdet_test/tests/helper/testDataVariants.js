// Create
const createMandatoryFieldsOnly = ({
  label: 'AT Warna',
  category: 1771,
  description: '',
  values: ['Black', 'White', 'Green'],
});

const createFillAllFields = ({
  label: 'New AT Warna',
  category: 1771,
  description: 'this is description from AT API',
  values: ['Gold', 'Silver', 'Grey'],
});

const createWithFillCategoryc0 = ({
  label: 'warna',
  category: 1,
  description: '',
  values: ['Black', 'White', 'Green'],
});

const createWithFillCategoryc1 = ({
  label: 'warna',
  category: 18,
  description: '',
  values: ['Black', 'White', 'Green'],
});

const createWithFillCategoryc2 = ({
  label: 'warna',
  category: 125,
  description: '',
  values: ['Black', 'White', 'Green'],
});

const createDoubleSameNameVariantValue = ({
  label: 'warna',
  category: 590,
  description: '',
  values: ['Black', 'Black', 'Green'],
});

const createExistVariantName = ({
  label: 'warna',
  category: 581,
  description: '',
  values: ['Black', 'White', 'Green'],
});

const createVariantEmptyMandatory = ({
  label: '',
  category: 581,
  description: '',
  values: [],
});

const createBlankCategory = ({
  label: 'warna',
  category: '',
  description: '',
  values: ['Black', 'White', 'Green'],
});

const createBlankVariantName = ({
  label: '',
  category: 581,
  description: '',
  values: ['Black', 'White', 'Green'],
});

const createBlankVariantValue = ({
  label: 'warna',
  category: 581,
  description: '',
  values: [],
});


// Update
const updateCategoryC3 = ({
  category: '1806',
  label: 'Warna',
  description: '',
  value: ['Black', 'White', 'Green'],
});

const updateCategoryC2 = ({
  category: '116',
  label: 'Warna',
  description: '',
  value: ['Black', 'White', 'Green'],
});

const updateCategoryC1 = ({
  category: '82',
  label: 'Warna',
  description: '',
  value: ['Black', 'White', 'Green'],
});

const updateCategoryC0 = ({
  category: '2',
  label: 'Warna',
  description: '',
  value: ['Black', 'White', 'Green'],
});

const updateVariantName = ({
  category: '1806',
  label: 'New Label',
  description: '',
  value: ['Black', 'White', 'Green'],
});

const updateDescription = ({
  category: '1806',
  label: 'Color',
  description: 'Update description from AT api',
  value: ['Black', 'White', 'Green'],
});

const updateValues = ({
  category: '1806',
  label: 'Color',
  description: 'qwertyuiopasdfghjklzxcvbnm',
  value: ['Blue', 'Pink', 'Silver'],
});

const nothingEdit = ({
  category: '1806',
  label: 'Color',
  description: 'qwertyuiopasdfghjklzxcvbnm',
  value: ['Blue', 'Pink', 'Silver'],
});

const blankcategory = ({
  category: '',
  label: 'Color',
  description: 'qwertyuiopasdfghjklzxcvbnm',
  value: ['Blue', 'Pink', 'Silver'],
});

const blankVariantName = ({
  category: '1806',
  label: '',
  description: 'qwertyuiopasdfghjklzxcvbnm',
  value: ['Blue', 'Pink', 'Silver'],
});

const blankVariantValue = ({
  category: '1806',
  label: 'Color',
  description: 'qwertyuiopasdfghjklzxcvbnm',
  value: [],
});

const DoubleSameVariantValue = ({
  category: '1806',
  label: 'Color',
  description: 'qwertyuiopasdfghjklzxcvbnm',
  value: ['Blue', 'Blue', 'Silver'],
});

const UpdateIdVariant = 23;

const UpdateInvalidIdVariant = 'a';

const UpdateNegativeIdVariant = -1;

const UpdateBlankIdVariant = '';

// History
const HistoryIdVariant = 8;

const HistoryInvalidIdVariant = 'a';

const HistoryNegativeIdVariant = -1;

const HistoryBlankIdVariant = '';

// Detail
const DetailIdVariant = 1;

const detailIdVariant = ({
  vID: '19',
  category: 1806,
  description: 'qwertyuiopasdfghjklzxcvbnm',
  values: ['Black', 'White', 'Green'],
});

const DetailInvalidIdVariant = 'a';

const DetailNegativeIdVariant = -1;

const DetailBlankIdVariant = '';

// Delete
const DeleteIdVariant = 23;

const DeleteIdVariantVisibilityAndStatus0 = 355;

const DeleteIdVariantStatus1 = 356;

const DeleteIdVariantVisibility1 = 357;

const DeleteInvalidIdVariant = 'a';

const DeleteNegativeIdVariant = -1;

const DeleteBlankIdVariant = '';

// List

const searchbyvariantname = ({
  limit: 5,
  page: 1,
  search: 'Warna',
});

const searchbyIdvariant = ({
  limit: 5,
  page: 1,
  search: '1',
});

const searchbyIdvariantAndVariantname = ({
  limit: 5,
  page: 1,
  search: '1/Warna',
});

const searchbyCategory = ({
  limit: 5,
  page: 1,
  category: 507,
});

const searchbyCreatedBy = ({
  limit: 5,
  page: 1,
  created_by: 2,
});

const searchbyCreatedByAndCategory = ({
  limit: 5,
  page: 1,
  created_by: 2,
  category: 597,
});

const searchbyCreatedByAndVariantname = ({
  limit: 5,
  page: 1,
  created_by: 2,
  search: 'Kapasitas',

});

const searchbyVariantnameAndCategory = ({
  limit: 5,
  page: 1,
  search: 'Warna',
  category: 597,
});

const searchbyCreatedByAndVariantnameAndCategory = ({
  limit: 5,
  page: 1,
  search: 'Kapasitas',
  created_by: 2,
  category: 570,
});

const metadatacontentNosearch = ({
  limit: 5,
  page: 1,
});

const metadatacontentSearchBypage = ({
  page: 2,
});

const checkpageSearchBylimitEven = ({
  limit: 2,
  page: 1,
});

const checkpageSearchBylimitOdd = ({
  limit: 1,
  page: 1,
});

const checktotalSkuSearchbyIdvariant = ({
  limit: 5,
  page: 1,
  search: 1,
});

const checkvaluesSearchbyIdvariant = ({
  limit: 5,
  page: 1,
  search: 1,
});

const listblankcategory = ({
  limit: 5,
  page: 1,
  category: '',
});

const blankpage = ({
  limit: 5,
  page: '',
});

const blanklimit = ({
  limit: '',
  page: 1,
});

const blankpageBlanklimit = ({
  limit: '',
  page: '',
});

const invalidToken = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InZlbmRvckBpbGRhdi5jb20iLCJmaXJzdF9uYW1lIjoiSWxkYXYiLCJsYXN0X25hbWUiOiJQS1AiLCJzY29wZSI6Im9yZ2FuaXphdGlvbiIsInB1bmNob3V0Ijp7ImlzX3B1bmNob3V0IjpmYWxzZSwiaXNfdXNlcl9wdW5jaG91dCI6ZmFsc2UsInNhbGVzX2FkbWluX2lkIjowLCJkYXRhIjp7fX0sImN1c3RvbWVyIjp7Im9yZ2FuaXphdGlvbl9uYW1lIjoiUFQgSWxkYXYgTWFrbXVyIFNlbnRvc2EiLCJvcmdhbml6YXRpb25faWQiOjkxLCJwZXJzb25faWQiOjM1Nywic3VwZXJhZG1pbiI6MzU3LCJyb2xlcyI6W3sicm9sZV9pZCI6MywibmFtZSI6IlN1cGVyIEFkbWluIn1dLCJpc192ZW5kb3IiOjEsInNldHVwIjo2LCJzdGF0dXMiOjMsImhhc19hZ3JlZW1lbnQiOjEsImNoYW5uZWxfdHlwZSI6Ik1QIn0sImlhdCI6MTUzMzcyNDAyOSwiZXhwIjoxNTMzNzMxMjI5fQ.ryGQEqBjt_ZIJflPeIJ6kkbBIXJa7opfuCKHjcdadBCG_GeiY_zQXZmfi4y49k50IvxvDXchYpIuKR1cxDOCUdrjnpzkqSdHDeEID7qBx4_FUomP4mQRYjgiOxgdY_UzDnEllD-UaQ4KviaBoO0vW_5N0-7PUBRiaNTeeGPD6GeCp-jhb-HADKypnEJFZ9edmWfizdzMHYO9YmmulFmEKYxkqdpG9FNxX7-HbcMH8e13yeuspUJkO7oIGI3FRiDnr01hcCS1VMNW0TL0snVxIDbxrMMsOSWKrM3gKHZKLHsTC0G5AbWgKocpKuCMi35NFK0xMvvfU7TzMUIa';


module.exports = {
  createMandatoryFieldsOnly,
  createDoubleSameNameVariantValue,
  createFillAllFields,
  createExistVariantName,
  nothingEdit,
  createVariantEmptyMandatory,
  createWithFillCategoryc0,
  createWithFillCategoryc1,
  createWithFillCategoryc2,
  updateCategoryC3,
  updateCategoryC2,
  updateCategoryC1,
  updateCategoryC0,
  updateVariantName,
  updateDescription,
  updateValues,
  blankcategory,
  blankVariantName,
  blankVariantValue,
  DoubleSameVariantValue,
  createBlankCategory,
  createBlankVariantName,
  createBlankVariantValue,
  UpdateIdVariant,
  HistoryIdVariant,
  UpdateInvalidIdVariant,
  UpdateNegativeIdVariant,
  UpdateBlankIdVariant,
  HistoryInvalidIdVariant,
  HistoryNegativeIdVariant,
  HistoryBlankIdVariant,
  DetailIdVariant,
  DetailInvalidIdVariant,
  DetailNegativeIdVariant,
  DetailBlankIdVariant,
  DeleteIdVariant,
  DeleteIdVariantVisibilityAndStatus0,
  DeleteIdVariantStatus1,
  DeleteIdVariantVisibility1,
  DeleteInvalidIdVariant,
  DeleteNegativeIdVariant,
  DeleteBlankIdVariant,
  searchbyvariantname,
  searchbyIdvariant,
  searchbyIdvariantAndVariantname,
  searchbyCategory,
  searchbyCreatedBy,
  searchbyCreatedByAndCategory,
  searchbyVariantnameAndCategory,
  searchbyCreatedByAndVariantnameAndCategory,
  metadatacontentNosearch,
  metadatacontentSearchBypage,
  checkpageSearchBylimitEven,
  checkpageSearchBylimitOdd,
  checktotalSkuSearchbyIdvariant,
  checkvaluesSearchbyIdvariant,
  searchbyCreatedByAndVariantname,
  listblankcategory,
  blankpage,
  blanklimit,
  blankpageBlanklimit,
  detailIdVariant,
  invalidToken,
};
