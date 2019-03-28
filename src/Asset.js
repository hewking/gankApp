

const resources = {
    'back' : require('../res/ic_back_arrow.png'),
    'icon_browser_home_current' : require('../res/icon_browser_home_current.png'),
    'icon_browser_home' : require('../res/icon_browser_home.png'),
    'icon_contacts_current' : require('../res/icon_contacts_current.png'),
    'icon_contacts' : require('../res/icon_contacts.png'),
}

export function getAsssetByName(filename) {
    if (resources.hasOwnProperty(filename)) {
        return resources[filename]
    }
    return null
}