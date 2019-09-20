'use strict';

const _ = require('lodash');

exports.TransformPOC = function (groupData, mappingData, sku, uomBizzy) {
    // Create multiple lists as container
    const groupList = [];
    const organizationCatalogIsMapped = [];
    const organizationIdCatalogId = [];
    const organizationIsMapped = [];
    const organizationCatalogIsMappedUom = [];
    let mapList = [];


    for (let i = 0; i < groupData.length; i++) {
        const groups = `${groupData[i].group_id}`;

        groupList.push(groups);
    }

    for (let i = 0; i < mappingData.length; i++) {
        const ocm = `${mappingData[i].payload.organization_id}-${mappingData[i].payload.catalog_id}-${mappingData[i].payload.mapped}`;
        const oic = `${mappingData[i].payload.organization_id}-${mappingData[i].payload.catalog_id}`;
        const om = `${mappingData[i].payload.organization_id}-${mappingData[i].payload.mapped}`;
        const map = `${mappingData[i].payload.mapped}`;
        const ocmu = `${mappingData[i].payload.organization_id}-${mappingData[i].payload.catalog_id}-${mappingData[i].payload.mapped}-${mappingData[i].payload.uom != null ? mappingData[i].payload.uom : '0'}`;


        organizationCatalogIsMapped.push(ocm);
        organizationIdCatalogId.push(oic);
        organizationIsMapped.push(om);
        organizationCatalogIsMappedUom.push(ocmu);
        mapList.push(map);
    }

    // Modify mapList to only have 1 unique map value
    mapList = _.uniq(mapList);

    // Run permutation on mapList and groupList
    const permutate = [];

    for (let i = 0; i < groupList.length; i++) {
        for (let j = 0; j < mapList.length; j++) {
            permutate.push(`${groupList[i]}-${mapList[j]}`);
        }
    }

    // Merge the list into a single list
    const result = {
        objectID: sku,
        sku_of: sku,
        organizationCatalogIsMapped,
        organizationCatalog: organizationIdCatalogId,
        groupIsMapped: permutate,
        organizationIsMapped,
        groups: groupList,
        organizationCatalogIsMappedUom,
        uomBizzy: {
            id: uomBizzy.Uom.id,
            name: uomBizzy.Uom.name
        }
    };

    return result;
};

module.exports = exports;
