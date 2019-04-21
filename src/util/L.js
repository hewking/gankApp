
export function i(msg,tag = 'guildchat') {
    console.log(`${tag} : ${msg}`)
}

export function e(msg,tag = 'guildchat') {
    console.error(`${tag} : ${msg}`)
}

export function w(msg,tag = 'guildchat') {
    console.warn(`${tag} : ${msg}`)
}

export function d(msg,tag = 'guildchat') {
    console.debug(`${tag} : ${msg}`)
}