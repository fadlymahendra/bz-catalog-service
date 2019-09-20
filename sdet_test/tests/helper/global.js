const response = {
  ok: 200,
  created: 201, // for created success
  accepted: 202,
  noContent: 204,
  badRequest: 400, // for blank or no key sent
  unauthorized: 401, // for no login
  forbidden: 403,
  invalidAuth: 403,
  notFound: 404,
  internalServerError: 500,
};

const codes = {
  unauthorized: 'UNAUTHORIZED', // 401
  invalidToken: 'INVALID_TOKEN', // 403
  badRequest: 'BadRequest', // 400
  notFound: 'NotFound', // 404
  forbidden: 'Forbidden', // 403
};

const period = {
  day: 'day',
  week: 'week',
  month: 'month',
  year: 'year',
  hari: 'Hari',
  minggu: 'Minggu',
  bulan: 'Bulan',
  tahun: 'Tahun',
};

const uoms = {
  unit: 'Unit',
  unit_id: 1,
  dozen: 'Dozen',
  dozen_id: 2,
  pack: 'Pack',
  pack_id: 3,
  box: 'Box',
  box_id: 4,
  set: 'Set',
  set_id: 5,
  each: 'Each',
  each_id: 6,
};

const stockingUoms = {
  box: 'Box',
  box_id: 1,
  carton: 'Carton',
  carton_id: 2,
  dozen: 'Dozen',
  dozen_id: 3,
  each: 'Each',
  each_id: 4,
  piece: 'Piece',
  piece_id: 5,
  pack: 'Pack',
  pack_id: 6,
  pack50: 'Pack 50',
  pack50_id: 7,
  pack100: 'Pack 100',
  pack100_id: 8,
  pair: 'Pair',
  pair_id: 9,
  roll: 'Roll',
  roll_id: 10,
  set: 'Set',
  set_id: 11,
  setOf3: 'Set of 3',
  setOf3_id: 12,
  setOf4: 'Set of 4',
  setOf4_id: 13,
  setOf5: 'Set of 5',
  setOf5_id: 14,
  single: 'Single',
  single_id: 15,
  sheet: 'Sheet',
  sheet_id: 16,
  tube: 'Tube',
  tube_id: 17,


};

const warranty = {
  noWarranty: 'no_warranty',
  labelNoWarranty: 'Tidak Bergaransi',
  officialWarranty: 'official_warranty',
  labelOfficial: 'Resmi',
  distributor: 'distributor',
  labelDistributor: 'Distributor',
  international: 'international',
  labelInternasional: 'Internasional',

};
const search = {
  page: 1,
  limit: 5,
};
module.exports = {
  response,
  codes,
  period,
  uoms,
  stockingUoms,
  warranty,
  search,

};
