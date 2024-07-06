const rivenProperties = [{
    gvas: ['VectorGameStates', 'PlayerLocation', 'Value'],
    html: 'player-position',
    title: 'Player position',
    description: 'Stay relatively close to where you saved. This variable does not control what terrain is loaded, so you\'ll fall through the ground if you move too far.'

}, {
    gvas: ['RotatorGameStates', 'PlayerRotation', 'Value'],
    html: 'player-rotation',
    title: 'Player rotation'
}, {
    html: 'telescope-solution',
    title: 'Telescope Solution',
    children: [{
        gvas: ['IntGameStates', 'C116916F4877D735A418D2916F65B733', 'Value'],
        html: 'telescope-solution-1',
        title: 'Digit 1',
        type: 'dropdown',
        values: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    }, {
        gvas: ['IntGameStates', '93C1592A4D719CB404CCA5810798FC26', 'Value'],
        html: 'telescope-solution-2',
        title: 'Digit 2',
        type: 'dropdown',
        values: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    }, {
        gvas: ['IntGameStates', 'E5B348FD453245493FD4B38C6B46BEA8', 'Value'],
        html: 'telescope-solution-3',
        title: 'Digit 3',
        type: 'dropdown',
        values: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    }, {
        gvas: ['IntGameStates', '818975CF4A6364CDC451B99FE7C88E52', 'Value'],
        html: 'telescope-solution-4',
        title: 'Digit 4',
        type: 'dropdown',
        values: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    }, {
        gvas: ['IntGameStates', 'B674A7294B3207EB744C0DA03971446A', 'Value'],
        html: 'telescope-solution-5',
        title: 'Digit 5',
        type: 'dropdown',
        values: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    }, {
        gvas: ['IntGameStates', '3E823B5F40A18302191E0D83280C683C', 'Value'],
        html: 'telescope-solution-6',
        title: 'Digit 6',
        type: 'dropdown',
        values: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    }, {
        gvas: ['IntGameStates', 'B32BF0644C06B3421E351881FF6CE557', 'Value'],
        html: 'telescope-solution-7',
        title: 'Digit 7',
        type: 'dropdown',
        values: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    }, {
        gvas: ['IntGameStates', '9B2E0ECA4C7071519EF5DABD682358D0', 'Value'],
        html: 'telescope-solution-8',
        title: 'Digit 8',
        type: 'dropdown',
        values: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    }, {
        gvas: ['IntGameStates', '82328056403E25E44D9857B2DD05289C', 'Value'],
        html: 'telescope-solution-9',
        title: 'Digit 9',
        type: 'dropdown',
        values: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    }, {
        gvas: ['IntGameStates', '4D8246E643268E7B68ECF5BB8AC22E20', 'Value'],
        html: 'telescope-solution-10',
        title: 'Digit 10',
        type: 'dropdown',
        values: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    }]
}]