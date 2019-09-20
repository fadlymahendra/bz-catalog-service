const createCategories = [
  {
    C0: {
      id: 10,
      name: 'Peralatan Hotel, Restoran & Kafe',
      unspsc: 53000000,
    },
    C1: {
      id: 117,
      name: 'Makanan laut',
      unspsc: 53120000,
    },
    C2: {
      id: 734,
      name: 'Kerang',
      unspsc: 53121600,
    },
    C3: [
      {
        name: 'First C3 from Kerang',
        unspsc: 53121661,
      },
      {
        name: 'Second C3 from Kerang',
        unspsc: 53121663,
      },
    ],
  },
  {
    C0: {
      id: 10,
      name: 'Peralatan Hotel, Restoran & Kafe',
      unspsc: 53000000,
    },
    C1: {
      id: 117,
      name: 'Makanan laut',
      unspsc: 53120000,
    },
    C2: {
      id: 0,
      name: 'First C2 from Makanan Laut',
      unspsc: 53129400,
    },
    C3: [
      {
        name: 'First C3 from First C2 from Makanan Laut',
        unspsc: 53129494,
      },
    ],
  },
  {
    C0: {
      id: 10,
      name: 'Peralatan Hotel, Restoran & Kafe',
      unspsc: 53000000,
    },
    C1: {
      id: 0,
      name: 'First C1 from Peralatan Hotel, Restoran & Kafe',
      unspsc: 53770000,
    },
    C2: {
      id: 0,
      name: 'First C2 from First C1 from Peralatan Hotel, Restoran & Kafe',
      unspsc: 53779500,
    },
    C3: [
      {
        name: 'First C3 from First C2 from First C1 from Peralatan Hotel, Restoran & Kafe',
        unspsc: 53779595,
      },
    ],
  },
  {
    C0: {
      id: 0,
      name: 'this is new c0',
      unspsc: 99000000,
    },
    C1: {
      id: 0,
      name: 'this is new c1 from new c0',
      unspsc: 99960000,
    },
    C2: {
      id: 0,
      name: 'this is new c2 from new c0',
      unspsc: 99969600,
    },
    C3: [{
      name: 'this is new c3 from new c0',
      unspsc: 99969696,
    }],
  },
];

const createCategoriesExistName = ({
  C0: {
    id: 12,
    name: 'this is c0',
    unspsc: 52000000,
  },
  C1: {
    id: 75,
    name: 'this is c1',
    unspsc: 52150000,
  },
  C2: {
    id: 140,
    name: 'this is c2',
    unspsc: 52151700,
  },
  C3: [
    {
      name: 'Axes',
      unspsc: 52151799,
    },
  ],
});

const createCategoriesExistUNSPSC = ({
  C0: {
    id: 12,
    name: 'this is c0',
    unspsc: 52000000,
  },
  C1: {
    id: 75,
    name: 'this is c1',
    unspsc: 52150000,
  },
  C2: {
    id: 140,
    name: 'this is c2',
    unspsc: 52151700,
  },
  C3: [
    {
      name: 'this is c3 one2',
      unspsc: 52151719,
    },
    {
      name: 'this is c3 two3',
      unspsc: 52151799,
    },
  ],
});

const createCategoriesEmptyMandatory = ({
  C1: {
    id: 75,
    name: 'this is c1',
    unspsc: 52150000,
  },
  C2: {
    id: 140,
    name: 'this is c2',
    unspsc: 52151700,
  },
  C3: [
    {
      name: 'this is c3 one2',
      unspsc: 52151719,
    },
    {
      name: 'this is c3 two3',
      unspsc: 52151799,
    },
  ],
});

const createCategoriesInvalid = [{
  C0: {
    name: 'this is c0',
    unspsc: 52000000,
  },
  C1: {
    id: 75,
    unspsc: 52150000,
  },
  C2: {
    id: 140,
    name: 'this is c2',
  },
  C3: [
    {
      name: 'this is c3 one2',
      unspsc: 52151719,
    },
    {
      name: 'this is c3 two3',
      unspsc: 52151799,
    },
  ],
},
{
  C0: {
    id: 12,
    name: 'this is c0',
    unspsc: 52000000,
  },
  C1: {
    id: 75,
    name: 'this is c1',
    unspsc: 52150000,
  },
  C2: {
    id: 140,
    name: 'this is c2',
    unspsc: 52151700,
  },
  C3: [
    {
      unspsc: 52151719,
    },
    {
      name: 'this is c3 two3',
    },
  ],
}];

const updateCategoriesC0 = ({
  name: 'AT API CategoryC0 -UpdateC0',
  unspsc: 66000000,

});

const updateCategoriesC1 = ({
  name: 'AT API CategoryC1 -UpdateC1',
  unspsc: 66550000,

});

const updateCategoriesC2 = ({
  name: 'AT API CategoryC2 -UpdateC2',
  unspsc: 66554400,

});

const updateCategoriesC3 = ({
  name: 'AT API CategoryC3-UpdateC3',
  unspsc: 66554433,

});

const updateLevelCategories = ({
  name: 'wrench',
  level: 'C1',
});

const updateUNSPSCCategories = ({
  name: 'wrench',
  unspsc: 27111729,
});

const updateParentIDCategories = ({
  name: 'wrench',
  parent_id: '281',
});

const updateCategoriesEmptyMandatory = ({
  name: '',

});

const changeStatusCategories = ({
  is_active: 1,

});

const token = ({
  invalidToken: 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluQGJpenp5LmNvLmlkIiwiZmlyc3RfbmFtZSI6IkFkbWluIEJpenp5IiwibGFzdF9uYW1lIjpudWxsLCJzY29wZSI6ImVtcGxveWVlIiwicHVuY2hvdXQiOnsiaXNfcHVuY2hvdXQiOmZhbHNlLCJpc191c2VyX3B1bmNob3V0IjpmYWxzZSwic2FsZXNfYWRtaW5faWQiOjAsImRhdGEiOnt9fSwiZW1wbG95ZWUiOnsiaWQiOjIsIm5hbWUiOiJBZG1pbiIsImVtYWlsIjoiYWRtaW5AYml6enkuY28uaWQiLCJodWJfaWQiOjAsInRlYW1faWQiOjMsInRlYW1fbmFtZSI6IkVuZ2luZWVyaW5nIChUZWNoKSIsInRpdGxlX2lkIjo3OCwidGl0bGVfbmFtZSI6IlNvZnR3YXJlIERldmVsb3BtZW50IEVuZ2luZWVyIGluIFRlc3QiLCJzdGF0dXMiOjEsInJvbGVzIjpbeyJyb2xlX2lkIjozNywicm9sZV9uYW1lIjoiSGVhZCBvZiBFbmdpbmVlcmluZyJ9LHsicm9sZV9pZCI6NzcsInJvbGVfbmFtZSI6IlNvZnR3YXJlIERldmVsb3BtZW50IEVuZ2luZWVyIn0seyJyb2xlX2lkIjo3OCwicm9sZV9uYW1lIjoiU29mdHdhcmUgRGV2ZWxvcG1lbnQgRW5naW5lZXIgaW4gVGVzdCJ9LHsicm9sZV9pZCI6NzksInJvbGVfbmFtZSI6IlNvZnR3YXJlIERldmVsb3BtZW50IEVuZ2luZWVyIExlYWQifV0sInBlcm1pc3Npb25zIjpbeyJpZCI6NCwiY29kZSI6ImxlZ2FsX3JlZ2lzdHJhc2lfY3VzdG9tZXJfbGloYXRfbnB3cCIsImVuZHBvaW50IjpudWxsfSx7ImlkIjo1LCJjb2RlIjoibGVnYWxfcmVnaXN0cmFzaV9jdXN0b21lcl9saWhhdF9zaXVwIiwiZW5kcG9pbnQiOm51bGx9LHsiaWQiOjU5LCJjb2RlIjoiYWxsX2NydWRfYWxsIiwiZW5kcG9pbnQiOm51bGx9XX0sImlhdCI6MTUzMjMyMjYyNSwiZXhwIjoxNTMyMzI5ODI1fQ.FOK20-qpTvLiiPJEqU7scS3CHIwPdSu3RtOugtwkn8Z9H2E-lRqnng2u1O4OyWG4kToOFB6RXcO6sfofBglkyf5LuHKz3WaRs0aH2n1Z5ob68VHoQRRilnCCXnoeqUMREeILmljLoIHHP2LaMn2eUsOqsZNNTNk4TJ0BD4DLoOEYLOvRGn8hO36lHYzZAo3pxYqPO-wXD_dA-xs3BUOjaC8dl1XaVaOTzb4TYbiZBzafjiAepJres9cWCJ44UNkkrgblezZ3Mv4HPd57FxDL7R72uh_AgbP4i2O6-bwOeIiaghW26U6YV3iDB0mLBMKc7wSJPLikb3dzSeCjn7glwA',

});

const dataAssert = ({
  afterUpdateC0: {
    unspscC0: 66000000,
    unspscC1: 66660000,
    unspscC2: 66667700,
    unspscC3: 66667788,
  },
  afterUpdateC1: {
    unspscC0: 66000000,
    unspscC1: 66550000,
    unspscC2: 66557700,
    unspscC3: 66557788,
  },
  afterUpdateC2: {
    unspscC0: 66000000,
    unspscC1: 66550000,
    unspscC2: 66554400,
    unspscC3: 66554488,
  },
  afterUpdateC3: {
    unspscC0: 66000000,
    unspscC1: 66550000,
    unspscC2: 66554400,
    unspscC3: 66554433,
  },
});


module.exports = {
  dataAssert,
  createCategories,
  createCategoriesEmptyMandatory,
  updateCategoriesC0,
  updateCategoriesC1,
  updateCategoriesC2,
  updateCategoriesC3,
  updateCategoriesEmptyMandatory,
  updateLevelCategories,
  updateUNSPSCCategories,
  updateParentIDCategories,
  createCategoriesExistName,
  createCategoriesExistUNSPSC,
  changeStatusCategories,
  createCategoriesInvalid,
  token,
};
