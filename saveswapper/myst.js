var mystProperties = [{
    gvas: ['VectorGameStates', 'PlayerLocation', 'Value'],
    html: 'myst-player-position',
    title: 'Player position',
    description: 'Stay relatively close to where you saved. This variable does not control what terrain is loaded, so you\'ll fall through the ground if you move too far.'

}, {
    gvas: ['RotatorGameStates', 'PlayerRotation', 'Value'],
    html: 'myst-player-rotation',
    title: 'Player rotation'

}, {
    gvas: ['IntGameStates', '308C65FD4C23714E48A66FB11C250B32', 'Value'],
    html: 'myst-compass-solution-button',
    title: 'Stoneship compass solution',
    type: 'dropdown',
    values: [
        { actual: 0, display: 'Button #1' },
        { actual: 1, display: 'Button #2' },
        { actual: 2, display: 'Button #3' },
        { actual: 3, display: 'Button #4' },
        { actual: 4, display: 'Button #5' },
        { actual: 5, display: 'Button #6' },
        { actual: 6, display: 'Button #7' },
        { actual: 7, display: 'Button #8' },
        { actual: 8, display: 'Button #9' },
        { actual: 9, display: 'Button #10' },
        { actual: 10, display: 'Button #11' },
        { actual: 11, display: 'Button #12' },
        { actual: 12, display: 'Button #13' },
        { actual: 13, display: 'Button #14' },
        { actual: 14, display: 'Button #15' },
        { actual: 15, display: 'Button #16' },
        { actual: 16, display: 'Button #17' },
        { actual: 17, display: 'Button #18' },
        { actual: 18, display: 'Button #19' },
        { actual: 19, display: 'Button #20' },
        { actual: 20, display: 'Button #21' },
        { actual: 21, display: 'Button #22' },
        { actual: 22, display: 'Button #23' },
        { actual: 23, display: 'Button #24' },
        { actual: 24, display: 'Button #25' },
        { actual: 25, display: 'Button #26' },
        { actual: 26, display: 'Button #27' },
        { actual: 27, display: 'Button #28' },
        { actual: 28, display: 'Button #29' },
        { actual: 29, display: 'Button #30' },
        { actual: 30, display: 'Button #31' },
        { actual: 31, display: 'Button #32' }
    ]
}, {
    html: 'myst-red-pages',
    title: 'Red pages',
    type: 'container',
    values: [{
        gvas: ['IntGameStates', 'C5A89B014CE01E07936702840743BF20', 'Value'],
        html: 'myst-red-pages-book',
        title: 'Pages in book',
        type: 'dropdown',
        values: [0, 1, 2, 3, 4, 5, 6]
    }, {
        gvas: 'RedPagesAccrued',
        html: 'myst-red-pages-accrued',
        title: 'Pages accrued',
        type: 'dropdown',
        values: [0, 1, 2, 3, 4, 5, 6]
    }, {
        gvas: ['IntGameStates', '1FB5FBEC46F1CC9B173C4DB90C321669', 'Value'],
        html: 'myst-red-pages-displayed',
        title: 'Pages displayed on shelf',
        type: 'dropdown',
        values: [0, 1, 2, 3, 4, 5, 6]
    }, {
        gvas: ['BoolGameStates', '9061C3CC40A2C1669F3B4B932AA70BAF', 'Value'],
        html: 'myst-red-pages-shelf',
        label: 'Collected page from shelf'
    }, {
        gvas: ['BoolGameStates', '9B367BB645A9E2985A2B8894777B5C8D', 'Value'],
        html: 'myst-red-pages-channelwood',
        label: 'Collected page from Channelwood'
    }, {
        gvas: ['BoolGameStates', '2BF0440B4BD0EF1D28ED56ABEE4CA0CB', 'Value'],
        html: 'myst-red-pages-stoneship',
        label: 'Collected page from Stoneship'
    }, {
        gvas: ['BoolGameStates', '52EFAC6F402821D619A3169A1FC96DB8', 'Value'],
        html: 'myst-red-pages-mechanical',
        label: 'Collected page from Mechanical'
    }, {
        gvas: ['BoolGameStates', '8E2EB304405936BB4E8BCCBD02F07326', 'Value'],
        html: 'myst-red-pages-selenitic',
        label: 'Collected page from Selenitic'
    }, {
        gvas: ['BoolGameStates', '04E4EA0D47A8ADBD0A66BD8609442B12', 'Value'],
        html: 'myst-red-pages-fireplace',
        label: 'Collected page from fireplace'
    }]
}, {
    html: 'myst-blue-pages',
    title: 'Blue pages',
    type: 'container',
    values: [{
        gvas: ['IntGameStates', '26A56BA54230F778BAAAFBB3C2DD4E2F', 'Value'],
        html: 'myst-blue-pages-book',
        title: 'Pages in book',
        type: 'dropdown',
        values: [0, 1, 2, 3, 4, 5, 6]
    }, {
        gvas: 'BluePagesAccrued',
        html: 'myst-blue-pages-accrued',
        title: 'Pages accrued',
        type: 'dropdown',
        values: [0, 1, 2, 3, 4, 5, 6]
    }, {
        gvas: ['IntGameStates', 'D0C19FD7470F5D2F18DEE687FAF216D3', 'Value'],
        html: 'myst-blue-pages-displayed',
        title: 'Pages displayed on shelf',
        type: 'dropdown',
        values: [0, 1, 2, 3, 4, 5, 6]
    }, {
        gvas: ['BoolGameStates', 'BC94889247AA708BE80ED08CE275AC11', 'Value'],
        html: 'myst-blue-pages-shelf',
        label: 'Collected page from shelf'
    }, {
        gvas: ['BoolGameStates', 'F3449E084DE16263C45D26815428DE5C', 'Value'],
        html: 'myst-blue-pages-channelwood',
        label: 'Collected page from Channelwood'
    }, {
        gvas: ['BoolGameStates', '89350DAF42B8245A4CC60FA78E75BC2B', 'Value'],
        html: 'myst-blue-pages-stoneship',
        label: 'Collected page from Stoneship'
    }, {
        gvas: ['BoolGameStates', '89678E8046D61D06A1A73F846E435E6B', 'Value'],
        html: 'myst-blue-pages-mechanical',
        label: 'Collected page from Mechanical'
    }, {
        gvas: ['BoolGameStates', '8D608861405BC31CC5FEA9AD0386E3CB', 'Value'],
        html: 'myst-blue-pages-selenitic',
        label: 'Collected page from Selenitic'
    }, {
        gvas: ['BoolGameStates', '80A4AFD24407F25C0FE06195763C6943', 'Value'],
        html: 'myst-blue-pages-fireplace',
        label: 'Collected page from fireplace'
    }]
}]