
const resources = {
    'back' : require('../res/ic_back_arrow.png'),
    'icon_browser_home_current' : require('../res/icon_browser_home_current.png'),
    'icon_browser_home' : require('../res/icon_browser_home.png'),
    'icon_contacts_current' : require('../res/icon_contacts_current.png'),
    'icon_contacts' : require('../res/icon_contacts.png'),
    'icon_setting_normal' : require('../res/icon_setting_normal.png'),
    'icon_setting_focused':require('../res/icon_setting_focused.png'),
    'splash':require('../res/icon_splash.png')
}

export function getAsssetByName(filename) {
    if (resources.hasOwnProperty(filename)) {
        return resources[filename]
    }
    return null
}