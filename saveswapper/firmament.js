const firmamentProperties = [{
    gvas: ['VectorGameStates', 'PlayerLocation', 'Value'],
    html: 'player-position',
    title: 'Player position',
    description: 'Stay relatively close to where you saved. This variable does not control what terrain is loaded, so you\'ll fall through the ground if you move too far.'

}, {
    gvas: ['RotatorGameStates', 'PlayerRotation', 'Value'],
    html: 'player-rotation',
    title: 'Player rotation'
}, {
    gvas: ['FloatGameStates', 'B549462A48A68E96DB0D4CA42AF77CD4', 'Value'],
    html: 'ice-crane-position',
    title: 'Curievale ice crane position',
    description: '"All the way back" (above the ice blocks) has a value of 0.'
}, {
    gvas: ['FloatGameStates', 'DFC56D6142240BFCFF5119A62F8C00E7', 'Value'],
    html: 'ice-crane-lift',
    title: 'Curievale ice crane height',
    description: '"All the way up" (against the rail) has a value of -1000.'
}, {
    html: 'battery-towers',
    title: 'Julestone battery pool towers',
    description: 'While it can\'t be rotated in-game, the uncolored tower (#2) can be rotated by editing its value here.',
    image: 'battery-towers.png',
    alt: 'The battery tower layout in Juleston.',
    children: [{
        gvas: ['FloatGameStates', '38D0BBBC4858C4C2EC5A8CB7C97EE6A2', 'Value'],
        html: 'battery-tower-0',
        title: '#0'
    }, {
        gvas: ['FloatGameStates', '118B5C2E44EA7C8A23DF589A193C48F5', 'Value'],
        html: 'battery-tower-1',
        title: '#1'
    }, {
        gvas: ['FloatGameStates', 'E3694D824E4E7F8293B2CB812EDC9E5C', 'Value'],
        html: 'battery-tower-2',
        title: '#2'
    }, {
        gvas: ['FloatGameStates', '1045877C4D6D80ABAB07D694FE2F53C9', 'Value'],
        html: 'battery-tower-3',
        title: '#3'
    }, {
        gvas: ['FloatGameStates', '2C2E4D374F21CCC82E1923AB65D3F2F6', 'Value'],
        html: 'battery-tower-4',
        title: '#4'
    }, {
        gvas: ['FloatGameStates', 'FF9724D44055884FBA6091B327360C9D', 'Value'],
        html: 'battery-tower-5',
        title: '#5'
    }, {
        gvas: ['FloatGameStates', '941E9FB948842BF547F6D79430AB6436', 'Value'],
        html: 'battery-tower-6',
        title: '#6'
    }, {
        gvas: ['FloatGameStates', '41D6A8CC41D34FF9ADE8E7A1B8C30659', 'Value'],
        html: 'battery-tower-7',
        title: '#7'
    }, {
        gvas: ['FloatGameStates', '264E50D046C0B9F46B49F59A67B9D09A', 'Value'],
        html: 'battery-tower-8',
        title: '#8'
    }, {
        gvas: ['FloatGameStates', '3509EECD4494DCEBE399C4981E991045', 'Value'],
        html: 'battery-tower-9',
        title: '#9'
    }, {
        gvas: ['FloatGameStates', '74AAEC22417F8022C30C7E9224F5F044', 'Value'],
        html: 'battery-tower-10',
        title: '#10'
    }, {
        gvas: ['FloatGameStates', '171691F54B64FC0C4E17C38D5E4305D0', 'Value'],
        html: 'battery-tower-11',
        title: '#11'
    }]
}]