var typeLabel = function (labelType) {
    return {
        type: labelType
    }
}
//template
// var indentPeriod = {
//     title: '',
//     type: '',
//     required: [],
//     properties: {

//     }

// }

var indentPeriod = {
    type: 'array',
    items: {
        type: 'object',
        required: ['value','label'],
        properties: {
            value: typeLabel('string'),
            label: typeLabel('string')
        }
    }
}

module.exports = {
    indentPeriod: indentPeriod
}