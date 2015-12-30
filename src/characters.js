const characters = [
    {
        id: "AMY_AND_RORY",
        name: "Amy and Rory",
        wakeMsgs: ['Amy and Rory, open your eyes and look lovingly at each other.']},
    {
        id: "ANGEL",
        name: "Weeping Angel",
        msgs: ["Weeping Angel, open your eyes.  Pick someone to consume.", 'Weeping Angels, open yours eyes.  Quickly, while no one is looking, pick a victim.'],
        winMsgs: ["The weeping angel has won."]
    },
    {
        id: "CYBERMAN",
        name: "Cyberman",
        msgs: ["Cybermen, open your eyes.  Pick someone to upgrade.", 'Cybermen, open you eyes.  Who do you wish to DELETE!'],
        winMsgs: ["The Cybermen have upgraded everyone."]
    },
    {
        id: "DALEK",
        name: 'Dalek',
        msgs: ['Dalek, open your eyes.  Pick someone to exterminate.', 'Dalek.  Exterminate!  Exterminate!'],
        winMsgs: ["The Dalek has exterminated everyone."]
    },
    {
        id: "DOCTOR",
        name: 'The Doctor',
        msgs: ['Doctor, open your eyes.  Pick someone to protect.', 'Doctor, open your eyes.  You can\'t save everyone.  Pick one person to save.']
    },
    {id: "JACK", name: 'Captain Jack Harkness'},
    {
        id: "K9",
        name: 'K9',
        msgs: ['K9, open your eyes.  Who would you like to scan?', 'K9, you are up.  Who do you think is evil?']
    },
    {
        id: "RIVER",
        name: 'River Song',
        msgs: ['River Song, open your eyes.  Pick one of our lovely players to kiss and knock out for a turn.', 'River, open your eyes.  Pick someone to kiss.']
    },
    {
        id: "SILENCE",
        name: 'Silence',
        msgs: ['The Silence, open your eyes.  Pick a target to kill.'],
        winMsgs: ["Silence will fall."]
    },
    {
        id: "TARDIS",
        name: 'Tardis',
        msgs: ['TARDIS, open your eyes.  Would you like to use your once per game ability?  If yes, who?']
    },
    {
        id: "SONTARAN",
        name: 'Sontaran',
        msgs: ['Sontarans, open your eyes.  Execute the stratagem.  Pick a target to kill.', 'Sontarans, it is your turn.  Pick a target to kill.'],
        winMsgs: ["The Sontaran Empire is victorious."]
    },
    {id: "COMPANION", name: 'Companion'}
];

export function getMsg(id) {
    let character = characters.find(n => n.id === id);
    if (character) {
        let msgs = character.msgs;
        return msgs[getRandomInt(0, msgs.length)];
    }
}

export function getWinMsg(id) {
    let character = characters.find(n => n.id === id);
    if (character) {
        let msgs = character.winMsgs;
        return msgs[getRandomInt(0, msgs.length)];
    }
}

export function getWakeMsg(id) {
    let character = characters.find(n => n.id === id);
    if (character) {
        let msgs = character.wakeMsgs;
        if (msgs) {
            return msgs[getRandomInt(0, msgs.length)];
        }
    }
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

export default characters;