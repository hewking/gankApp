

const resources = {
    'back' : require('../res/ic_back_arrow.png')
}

export function getAsssetByName(filename) {
    if (resources.hasOwnProperty(filename)) {
        return resources[filename]
    }
    return null
}