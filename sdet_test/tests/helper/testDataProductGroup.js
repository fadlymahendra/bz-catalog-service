/* eslint no-unused-vars: off */
/* eslint prefer-destructuring:off */


const queryProductGroupList = function (s) {
  return {
    search: s.search,
    c0: s.c0,
    c1: s.c1,
    c2: s.c2,
    c3: s.c3,
    sort: s.sort,
  };
};

const postDataProductGroup = (
  {
    name: 'Apple iphone 8 17110502',
    category_id: '7019',
    brand_id: '81',
    uom_id: '1',
    stocking_uom_id: '1',
    quantity_stocking_uom: '10000',
    manufacturing_number: 'APPLE10002',
    package_weight: '800',
    package_length: '100.00',
    package_width: '200.00',
    package_height: '300.00',
    package_content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris quis nulla placerat, dictum quam ut, congue neque. Morbi pharetra enim turpis. Donec felis ligula, accumsan at consequat ut, imperdiet finibus eros. Sed non ipsum dictum, molestie ipsum eu, pretium arcu. Duis feugiat erat sed pretium laoreet. Aenean et volutpat ligula, ut accumsan lectus. Mauris eget dignissim elit, eu commodo risus. Donec tincidunt turpis vitae turpis ultricies, sit amet commodo lectus porttitor. Quisque molestie posuere mauris non elementum. Praesent purus velit, rhoncus eget rutrum quis, tempor a ante. Donec a metus porttitor, volutpat dui luctus, vestibulum lacus. Vestibulum consectetur urna ex. Cras in convallis purus. Suspendisse fringilla libero blandit neque vulputate consequat. Vestibulum tempor consequat libero, eget volutpat libero vulputate ut. Nunc eu vehicula purus, ac luctus dui. Ut pulvinar et ipsum vulputate dignissim. Integer nec lobortis ex. Mauris tempor orci non cursus ornare. Phasellus congue ante ut orci dignissim, et blandit nisl egestas. In hac habitasse platea dictumst. Praesent posuere elementum fringilla. Mauris commodo quis ligula ac dictum. Pellentesque posuere vestibulum odio, vel vulputate orci lobortis at. In pharetra diam dolor, venenatis volutpat nisi viverra at. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec in orci ac tortor dictum posuere. Nulla lectus risus, placerat ut volutpat in, semper pulvinar massa. In lacinia felis mi. Nullam feugiat elementum tincidunt. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Etiam ac ex nulla. Suspendisse lorem ligula, porttitor quis ante vitae, lacinia porta nunc. Nulla facilisi. Duis ultricies ac diam id tincidunt. Curabitur malesuada metus quam, at condimentum sapien sagittis nec. Morbi eleifend placerat ullamcorper. Nulla lobortis, neque bibendum suscipit congue, libero lacus pharetra purus, non accumsan lectus sapien at felis. Sed posuere finibus massa nunc.',
    barcode: 'AP001',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris quis nulla placerat, dictum quam ut, congue neque. Morbi pharetra enim turpis. Donec felis ligula, accumsan at consequat ut, imperdiet finibus eros. Sed non ipsum dictum, molestie ipsum eu, pretium arcu. Duis feugiat erat sed pretium laoreet. Aenean et volutpat ligula, ut accumsan lectus. Mauris eget dignissim elit, eu commodo risus. Donec tincidunt turpis vitae turpis ultricies, sit amet commodo lectus porttitor. Quisque molestie posuere mauris non elementum. Praesent purus velit, rhoncus eget rutrum quis, tempor a ante. Donec a metus porttitor, volutpat dui luctus, vestibulum lacus. Vestibulum consectetur urna ex. Cras in convallis purus. Suspendisse fringilla libero blandit neque vulputate consequat. Vestibulum tempor consequat libero, eget volutpat libero vulputate ut. Nunc eu vehicula purus, ac luctus dui. Ut pulvinar et ipsum vulputate dignissim. Integer nec lobortis ex. Mauris tempor orci non cursus ornare. Phasellus congue ante ut orci dignissim, et blandit nisl egestas. In hac habitasse platea dictumst. Praesent posuere elementum fringilla. Mauris commodo quis ligula ac dictum. Pellentesque posuere vestibulum odio, vel vulputate orci lobortis at. In pharetra diam dolor, venenatis volutpat nisi viverra at. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec in orci ac tortor dictum posuere. Nulla lectus risus, placerat ut volutpat in, semper pulvinar massa. In lacinia felis mi. Nullam feugiat elementum tincidunt. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Etiam ac ex nulla. Suspendisse lorem ligula, porttitor quis ante vitae, lacinia porta nunc. Nulla facilisi. Duis ultricies ac diam id tincidunt. Curabitur malesuada metus quam, at condimentum sapien sagittis nec. Morbi eleifend placerat ullamcorper. Nulla lobortis, neque bibendum suscipit congue, libero lacus pharetra purus, non accumsan lectus sapien at felis. Sed posuere finibus massa nunc.',
    primary_image: 'https://cf.shopee.co.id/file/0eb2207f2d47ad314ab353f783cf2b01',
    status: '1',
    visibility: '0',
    specifications: [
      {
        attribute_code_id: '3',
        attribute_value_id: '5',
        text_input: '',
      },
      {
        attribute_code_id: '4',
        attribute_value_id: '',
        text_input: 'Dapat box saja',
      },
    ],
  }
);

const postDataExcNonMandatoryProductGroup = (
  {
    name: 'Apple iphone 8 17110502',
    category_id: '7019',
    brand_id: '81',
    uom_id: '1',
    stocking_uom_id: '1',
    quantity_stocking_uom: '10000',
    manufacturing_number: '',
    package_weight: '800',
    package_length: '100.00',
    package_width: '200.00',
    package_height: '300.00',
    package_content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris quis nulla placerat, dictum quam ut, congue neque. Morbi pharetra enim turpis. Donec felis ligula, accumsan at consequat ut, imperdiet finibus eros. Sed non ipsum dictum, molestie ipsum eu, pretium arcu. Duis feugiat erat sed pretium laoreet. Aenean et volutpat ligula, ut accumsan lectus. Mauris eget dignissim elit, eu commodo risus. Donec tincidunt turpis vitae turpis ultricies, sit amet commodo lectus porttitor. Quisque molestie posuere mauris non elementum. Praesent purus velit, rhoncus eget rutrum quis, tempor a ante. Donec a metus porttitor, volutpat dui luctus, vestibulum lacus. Vestibulum consectetur urna ex. Cras in convallis purus. Suspendisse fringilla libero blandit neque vulputate consequat. Vestibulum tempor consequat libero, eget volutpat libero vulputate ut. Nunc eu vehicula purus, ac luctus dui. Ut pulvinar et ipsum vulputate dignissim. Integer nec lobortis ex. Mauris tempor orci non cursus ornare. Phasellus congue ante ut orci dignissim, et blandit nisl egestas. In hac habitasse platea dictumst. Praesent posuere elementum fringilla. Mauris commodo quis ligula ac dictum. Pellentesque posuere vestibulum odio, vel vulputate orci lobortis at. In pharetra diam dolor, venenatis volutpat nisi viverra at. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec in orci ac tortor dictum posuere. Nulla lectus risus, placerat ut volutpat in, semper pulvinar massa. In lacinia felis mi. Nullam feugiat elementum tincidunt. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Etiam ac ex nulla. Suspendisse lorem ligula, porttitor quis ante vitae, lacinia porta nunc. Nulla facilisi. Duis ultricies ac diam id tincidunt. Curabitur malesuada metus quam, at condimentum sapien sagittis nec. Morbi eleifend placerat ullamcorper. Nulla lobortis, neque bibendum suscipit congue, libero lacus pharetra purus, non accumsan lectus sapien at felis. Sed posuere finibus massa nunc.',
    barcode: '',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris quis nulla placerat, dictum quam ut, congue neque. Morbi pharetra enim turpis. Donec felis ligula, accumsan at consequat ut, imperdiet finibus eros. Sed non ipsum dictum, molestie ipsum eu, pretium arcu. Duis feugiat erat sed pretium laoreet. Aenean et volutpat ligula, ut accumsan lectus. Mauris eget dignissim elit, eu commodo risus. Donec tincidunt turpis vitae turpis ultricies, sit amet commodo lectus porttitor. Quisque molestie posuere mauris non elementum. Praesent purus velit, rhoncus eget rutrum quis, tempor a ante. Donec a metus porttitor, volutpat dui luctus, vestibulum lacus. Vestibulum consectetur urna ex. Cras in convallis purus. Suspendisse fringilla libero blandit neque vulputate consequat. Vestibulum tempor consequat libero, eget volutpat libero vulputate ut. Nunc eu vehicula purus, ac luctus dui. Ut pulvinar et ipsum vulputate dignissim. Integer nec lobortis ex. Mauris tempor orci non cursus ornare. Phasellus congue ante ut orci dignissim, et blandit nisl egestas. In hac habitasse platea dictumst. Praesent posuere elementum fringilla. Mauris commodo quis ligula ac dictum. Pellentesque posuere vestibulum odio, vel vulputate orci lobortis at. In pharetra diam dolor, venenatis volutpat nisi viverra at. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec in orci ac tortor dictum posuere. Nulla lectus risus, placerat ut volutpat in, semper pulvinar massa. In lacinia felis mi. Nullam feugiat elementum tincidunt. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Etiam ac ex nulla. Suspendisse lorem ligula, porttitor quis ante vitae, lacinia porta nunc. Nulla facilisi. Duis ultricies ac diam id tincidunt. Curabitur malesuada metus quam, at condimentum sapien sagittis nec. Morbi eleifend placerat ullamcorper. Nulla lobortis, neque bibendum suscipit congue, libero lacus pharetra purus, non accumsan lectus sapien at felis. Sed posuere finibus massa nunc.',
    primary_image: 'https://cf.shopee.co.id/file/0eb2207f2d47ad314ab353f783cf2b01',
    status: '1',
    visibility: '0',
    specifications: [
      {
        attribute_code_id: '3',
        attribute_value_id: '5',
        text_input: '',
      },
      {
        attribute_code_id: '4',
        attribute_value_id: '',
        text_input: 'Dapat box saja',
      },
    ],
  }
);

const putDataProductGroup = (
  {
    name: 'Apple iphone 8 17110502',
    category_id: '7019',
    brand_id: '81',
    uom_id: '1',
    stocking_uom_id: '2',
    quantity_stocking_uom: '10000',
    manufacturing_number: '',
    package_weight: '800',
    package_length: '100.00',
    package_width: '200.00',
    package_height: '300.00',
    package_content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris quis nulla placerat, dictum quam ut, congue neque. Morbi pharetra enim turpis. Donec felis ligula, accumsan at consequat ut, imperdiet finibus eros. Sed non ipsum dictum, molestie ipsum eu, pretium arcu. Duis feugiat erat sed pretium laoreet. Aenean et volutpat ligula, ut accumsan lectus. Mauris eget dignissim elit, eu commodo risus. Donec tincidunt turpis vitae turpis ultricies, sit amet commodo lectus porttitor. Quisque molestie posuere mauris non elementum. Praesent purus velit, rhoncus eget rutrum quis, tempor a ante. Donec a metus porttitor, volutpat dui luctus, vestibulum lacus. Vestibulum consectetur urna ex. Cras in convallis purus. Suspendisse fringilla libero blandit neque vulputate consequat. Vestibulum tempor consequat libero, eget volutpat libero vulputate ut. Nunc eu vehicula purus, ac luctus dui. Ut pulvinar et ipsum vulputate dignissim. Integer nec lobortis ex. Mauris tempor orci non cursus ornare. Phasellus congue ante ut orci dignissim, et blandit nisl egestas. In hac habitasse platea dictumst. Praesent posuere elementum fringilla. Mauris commodo quis ligula ac dictum. Pellentesque posuere vestibulum odio, vel vulputate orci lobortis at. In pharetra diam dolor, venenatis volutpat nisi viverra at. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec in orci ac tortor dictum posuere. Nulla lectus risus, placerat ut volutpat in, semper pulvinar massa. In lacinia felis mi. Nullam feugiat elementum tincidunt. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Etiam ac ex nulla. Suspendisse lorem ligula, porttitor quis ante vitae, lacinia porta nunc. Nulla facilisi. Duis ultricies ac diam id tincidunt. Curabitur malesuada metus quam, at condimentum sapien sagittis nec. Morbi eleifend placerat ullamcorper. Nulla lobortis, neque bibendum suscipit congue, libero lacus pharetra purus, non accumsan lectus sapien at felis. Sed posuere finibus massa nunc.',
    barcode: '',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris quis nulla placerat, dictum quam ut, congue neque. Morbi pharetra enim turpis. Donec felis ligula, accumsan at consequat ut, imperdiet finibus eros. Sed non ipsum dictum, molestie ipsum eu, pretium arcu. Duis feugiat erat sed pretium laoreet. Aenean et volutpat ligula, ut accumsan lectus. Mauris eget dignissim elit, eu commodo risus. Donec tincidunt turpis vitae turpis ultricies, sit amet commodo lectus porttitor. Quisque molestie posuere mauris non elementum. Praesent purus velit, rhoncus eget rutrum quis, tempor a ante. Donec a metus porttitor, volutpat dui luctus, vestibulum lacus. Vestibulum consectetur urna ex. Cras in convallis purus. Suspendisse fringilla libero blandit neque vulputate consequat. Vestibulum tempor consequat libero, eget volutpat libero vulputate ut. Nunc eu vehicula purus, ac luctus dui. Ut pulvinar et ipsum vulputate dignissim. Integer nec lobortis ex. Mauris tempor orci non cursus ornare. Phasellus congue ante ut orci dignissim, et blandit nisl egestas. In hac habitasse platea dictumst. Praesent posuere elementum fringilla. Mauris commodo quis ligula ac dictum. Pellentesque posuere vestibulum odio, vel vulputate orci lobortis at. In pharetra diam dolor, venenatis volutpat nisi viverra at. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec in orci ac tortor dictum posuere. Nulla lectus risus, placerat ut volutpat in, semper pulvinar massa. In lacinia felis mi. Nullam feugiat elementum tincidunt. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Etiam ac ex nulla. Suspendisse lorem ligula, porttitor quis ante vitae, lacinia porta nunc. Nulla facilisi. Duis ultricies ac diam id tincidunt. Curabitur malesuada metus quam, at condimentum sapien sagittis nec. Morbi eleifend placerat ullamcorper. Nulla lobortis, neque bibendum suscipit congue, libero lacus pharetra purus, non accumsan lectus sapien at felis. Sed posuere finibus massa nunc.',
    primary_image: 'https://cf.shopee.co.id/file/0eb2207f2d47ad314ab353f783cf2b01',
    visibility: '1',
    specifications: [
      {
        id: '26',
        attribute_code_id: '3',
        attribute_value_id: '5',
        text_input: '',
      },
      {
        id: '27',
        attribute_code_id: '4',
        attribute_value_id: '',
        text_input: 'Dapat box saja',
      },
    ],
  }
);

const putVisibilityProductGroup = ({
  visibility: '1',
});

const postDataSkuProductGroup = ({
  product_variant_id: '9',
});

module.exports = {
  queryProductGroupList,
  postDataProductGroup,
  putDataProductGroup,
  putVisibilityProductGroup,
  postDataSkuProductGroup,
  postDataExcNonMandatoryProductGroup,
};
