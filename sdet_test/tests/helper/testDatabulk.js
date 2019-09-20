// download Update

const invalidVendorId = 5;

// history update
const searchByFilename = ({
  limit: 20,
  page: 1,
  search: 'BULKUPDATE_VENDOR_31_1534670860825.xlsx',
});

const searchByUploader = ({
  limit: 20,
  page: 1,
  search: 'DJ Vendor PKP 2',
});

const searchByDate = ({
  limit: 20,
  page: 1,
  start_date: '2018-08-01',
  end_date: '2018-08-20',
});

const searchByFilenameAndDate = ({
  limit: 20,
  page: 1,
  start_date: '2018-08-19',
  end_date: '2018-08-20',
  search: 'BULKUPDATE_VENDOR_31_1534670860825.xlsx',
});

const searchByUploaderAndDate = ({
  limit: 20,
  page: 1,
  start_date: '2018-08-19',
  end_date: '2018-08-20',
  search: 'DJ Vendor PKP 2',
});

const searchByInvalidDate = ({
  limit: 20,
  page: 1,
  start_date: 'aa',
  end_date: 'aa',
});

const searchByInvalidStartDate = ({
  limit: 20,
  page: 1,
  start_date: '1990-10-10',
  end_date: '1990-10-10',
});

module.exports = {
  invalidVendorId,
  searchByFilename,
  searchByUploader,
  searchByDate,
  searchByFilenameAndDate,
  searchByUploaderAndDate,
  searchByInvalidDate,
  searchByInvalidStartDate,
};
