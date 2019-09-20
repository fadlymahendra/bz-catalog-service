const extractedResult = {};

exports.getExtractedResult = function() {
    return this.extractedResult;
}

exports.extract = function(jsonToProcess, keyToProcess) {
    for (let key in jsonToProcess) {
        let value = jsonToProcess[key];

        if (key === keyToProcess) {
            extractedResult[key] = value;
        }
        
        if (typeof value === 'object') {
            this.extract(value, keyToProcess);
        }
    }

    return extractedResult;
}

module.exports = exports;