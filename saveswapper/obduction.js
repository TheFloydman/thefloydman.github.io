const obductionProperties = [{
    gvas: 'PlayerPosition',
    html: 'player-position',
    title: 'Player position',
    description: 'Stay relatively close to where you saved. This variable does not control what terrain is loaded, so you\'ll fall through the ground if you move too far.'
}, {
    gvas: 'PlayerRotation',
    html: 'player-rotation',
    title: 'Player rotation'
}, {
    html: 'domes-unlocked',
    title: 'Cell membranes unlocked',
    children: [{
        gvas: 'HunrathDomeEnabled',
        html: 'domes-unlocked-hunrath',
        label: 'Hunrath (desert)'
    }, {
        gvas: 'ChainDomeEnabled',
        html: 'domes-unlocked-kaptar',
        label: 'Kaptar (cliffs)'
    }, {
        gvas: 'SwampDomeEnabled',
        html: 'domes-unlocked-maray',
        label: 'Maray (swamp)'
    }, {
        gvas: 'SoariaDomeEnabled',
        html: 'domes-unlocked-soria',
        label: 'Soria (melted)'
    }]
}, {
    html: 'connected-to-hub',
    title: 'Worlds connected to the Heart (underground hub)',
    children: [{
        gvas: 'HunrathConnectedToHub',
        html: 'connected-to-hub-hunrath',
        label: 'Hunrath (desert)'
    }, {
        gvas: 'ChainConnectedToHub',
        html: 'connected-to-hub-kaptar',
        label: 'Kaptar (cliffs)'
    }, {
        gvas: 'SwampConnectedToHub',
        html: 'connected-to-hub-swamp',
        label: 'Maray (swamp)'
    }, {
        gvas: 'SoariaConnectedToHub',
        html: 'connected-to-hub-soria',
        label: 'Soria (melted)'
    }]
}, {
    gvas: 'LicensePlateSolution',
    html: 'license-plate-solution',
    title: 'License plate solution',
    type: 'select',
    values: [
        { actual: 'Arizona', display: 'Arizona (259742)' },
        { actual: 'California', display: 'California (259167)' },
        { actual: 'Colorado', display: 'Colorado (244153)' },
        { actual: 'DC', display: 'D.C. (164965)' },
        { actual: 'Florida', display: 'Florida (629415)' },
        { actual: 'Minnesota', display: 'Minnesota (172958)' },
        { actual: 'Missouri', display: 'Missouri (325247)' },
        { actual: 'Montana', display: 'Montana (155520)' },
        { actual: 'New York', display: 'New York (441693)' },
        { actual: 'North Carolina', display: 'North Carolina (686403)' },
        { actual: 'Ohio', display: 'Ohio (163107)' },
        { actual: 'Pennsylvania', display: 'Pennsylvania (323961)' },
        { actual: 'Rhode Island', display: 'Rhode Island (258287)' },
        { actual: 'Texas', display: 'Texas (787932)' },
        { actual: 'Washington', display: 'Washington (356807)' }
    ]
}, {
    gvas: 'ActiveLicensePlates',
    html: 'active-license-plates',
    title: 'Active license plates',
    description: 'Duplicated plates will be displayed as Minnesota.',
    type: 'selects-comma',
    quantity: 10,
    labels: [
        'Far right',
        'Middle left',
        'Bottom left',
        'Bottom right',
        'Top center',
        'Top right',
        'Bottom center',
        'Middle right',
        'Top left',
        'Middle center'
    ],
    values: [
        { actual: '0', display: 'Minnesota (1R2958)' },
        { actual: '1', display: 'California (FLW167)' },
        { actual: '2', display: 'Missouri (3BK247)' },
        { actual: '3', display: 'New York (4H1693)' },
        { actual: '4', display: 'Washington (DJM807)' },
        { actual: '5', display: 'North Carolina (NT6403)' },
        { actual: '6', display: 'Montana (15J520)' },
        { actual: '7', display: 'Arizona (AL9742)' },
        { actual: '8', display: 'Texas (PV7932)' },
        { actual: '9', display: 'Florida (6A9415)' },
        { actual: '10', display: 'Ohio (1ME107)' },
        { actual: '11', display: 'Rhode Island (CLU287)' },
        { actual: '12', display: 'Pennsylvania (3ADX61)' },
        { actual: '13', display: 'Colorado (BG4153)' },
        { actual: '14', display: 'D.C. (1NH965)' }
    ]
}, {
    html: 'easter-egg-mode',
    title: 'Easter egg mode',
    description: 'When enabled, this mode allows you to view Easter egg images using the projector in Farley\'s Community Center.',
    children: [{
        gvas: 'IsEasterEggModeEnabled',
        html: 'easter-egg-mode-enabled',
        label: 'Mode enabled'
    }, {
        gvas: 'ChainEEMachineEasterEgg',
        html: 'easter-egg-mode-image',
        label: 'Active image',
        type: 'select',
        values: [
            { actual: '0', display: 'None' },
            { actual: '94963302383952586419', display: 'Image #1' },
            { actual: '89118429617127928948', display: 'Image #2' },
            { actual: '20796280597791483927', display: 'Image #3' },
            { actual: '62085360679298484072', display: 'Image #4' },
            { actual: '10903640410977768000', display: 'Image #5' },
            { actual: '42473318715481250036', display: 'Image #6' },
            { actual: '87677157641487174867', display: 'Image #7' },
            { actual: '97322106321420761459', display: 'Image #8' },
            { actual: '31246700145194224615', display: 'Image #9' },
            { actual: '65100045445457466787', display: 'Image #10' },
            { actual: '32773205775779923923', display: 'Image #11' },
            { actual: '21545483286235483289', display: 'Image #12' },
            { actual: '15456788796324265526', display: 'Image #13' },
            { actual: '48842383423898923563', display: 'Image #14' },
            { actual: '00200546502155103247', display: 'Image #15' },
            { actual: '83876904023474278393', display: 'Image #16' },
            { actual: '21324166454465686551', display: 'Image #17' },
            { actual: '54546987981981879666', display: 'Image #18' },
            { actual: '84892365345378201910', display: 'Image #19' },
            { actual: '00203893894048390028', display: 'Image #20' },
            { actual: '22102154486210115444', display: 'Image #21' },
            { actual: '29009384748920387456', display: 'Image #22' },
            { actual: '01252157456585412211', display: 'Image #23' },
            { actual: '87972348236328238649', display: 'Image #24' },
            { actual: '21466547980534454441', display: 'Image #25' },
            { actual: '78578945789578451457', display: 'Image #26' },
            { actual: '84376475780821542542', display: 'Image #27' },
            { actual: '01458547962541320475', display: 'Image #28' },
            { actual: '34729207645839020234', display: 'Image #29' },
            { actual: '54548751134543543543', display: 'Image #30' },
            { actual: '73223923502154884681', display: 'Image #31' },
            { actual: '01324679824042454008', display: 'Image #32' },
            { actual: '04245457879105444589', display: 'Image #33' },
            { actual: '43675745744562578587', display: 'Image #34' },
            { actual: '76005004005060626003', display: 'Image #35' },
            { actual: '44554548451104402443', display: 'Image #36' },
            { actual: '00212154155445511424', display: 'Image #37' },
            { actual: '05545754328305723902', display: 'Image #38' },
            { actual: '04651842897312404516', display: 'Image #39' },
            { actual: '41246654422701040404', display: 'Image #40' },
            { actual: '54574574544949782146', display: 'Image #41' },
            { actual: '44651424022416214145', display: 'Image #42' },
            { actual: '45456140707979776647', display: 'Image #43' },
            { actual: '15424219982424400451', display: 'Image #44' },
            { actual: '98784763489636292992', display: 'Image #45' },
            { actual: '02145467879457205467', display: 'Image #46' },
            { actual: '05481851114841398347', display: 'Image #47' },
            { actual: '01240457045457574444', display: 'Image #48' },
            { actual: '83479348345873489344', display: 'Image #49' },
            { actual: '00000000000000001017', display: 'Image #50' },
            { actual: '81692257612596513996', display: 'Image #51' },
            { actual: '46471464970745899589', display: 'Image #52' },
            { actual: '03059912153694152926', display: 'Image #53' },
            { actual: '60011617117982104067', display: 'Image #54' },
            { actual: '46244204028245636138', display: 'Image #55' },
            { actual: '47297039046285289665', display: 'Image #56' },
            { actual: '52307083312855333931', display: 'Image #57' },
            { actual: '23608245112299177601', display: 'Image #58' },
            { actual: '79113886964167406703', display: 'Image #59' },
            { actual: '39166488711641851871', display: 'Image #60' },
            { actual: '98540222284362254836', display: 'Image #61' },
            { actual: '77189501249998307770', display: 'Image #62' }
        ]
    }]
}, {
    html: 'disabler-beam-colors',
    title: 'Disabler beam colors',
    description: 'The disabler beams are all one color in <i>Obduction</i>, and that color can\'t be changed in-game. However, altering your save will let you choose between several different colors for each beam.',
    children: [{
        gvas: 'CWMinecartBeamColor',
        html: 'disabler-beam-colors-minecart',
        label: 'Minecart',
        type: 'select',
        values: [
            { actual: '0', display: 'Green' },
            { actual: '1', display: 'Cyan' },
            { actual: '2', display: 'Blue (default)' },
            { actual: '3', display: 'Purple' },
            { actual: '4', display: 'Black' }
        ]
    }, {
        gvas: 'HunrathCWWorkshopBeamColor',
        html: 'disabler-beam-colors-workshop',
        label: 'C.W.\'s workshop mini',
        type: 'select',
        values: [
            { actual: '0', display: 'Green' },
            { actual: '1', display: 'Cyan' },
            { actual: '2', display: 'Blue (default)' },
            { actual: '3', display: 'Purple' },
            { actual: '4', display: 'Black' }
        ]
    }, {
        gvas: 'SwampBeamBuildingBeamColor',
        html: 'disabler-beam-colors-maray-roof',
        label: 'Roof-mounted in Maray',
        type: 'select',
        values: [
            { actual: '0', display: 'Green' },
            { actual: '1', display: 'Cyan' },
            { actual: '2', display: 'Blue (default)' },
            { actual: '3', display: 'Purple' },
            { actual: '4', display: 'Black' }
        ]
    }, {
        gvas: 'SwampWMDBeamColor',
        html: 'disabler-beam-colors-maray-wmd',
        label: 'Near WMD',
        type: 'select',
        values: [
            { actual: '0', display: 'Green' },
            { actual: '1', display: 'Cyan' },
            { actual: '2', display: 'Blue (default)' },
            { actual: '3', display: 'Purple' },
            { actual: '4', display: 'Black' }
        ]
    }]
}, {
    html: 'doors-maray',
    title: 'Maray doors',
    children: [{
        gvas: 'SwampArmoryDoorState',
        html: 'doors-maray-entry',
        label: 'Entry door',
        type: 'select',
        values: [
            { actual: '0', display: 'Empty' },
            { actual: '1', display: 'Framed' },
            { actual: '2', display: 'Basic' },
            { actual: '3', display: 'Complete' }
        ]
    }, {
        gvas: 'SwampCryoToEntryDoor',
        html: 'doors-maray-cryo-to-entry',
        label: 'Door between cryo-chamber and entry',
        type: 'select',
        values: [
            { actual: '0', display: 'Empty' },
            { actual: '1', display: 'Framed' },
            { actual: '2', display: 'Basic' },
            { actual: '3', display: 'Complete' }
        ]
    }, {
        gvas: 'SwampCryoWMDToEntryDoor',
        html: 'doors-maray-wmd-to-entry',
        label: 'Door between entry and WMD area',
        type: 'select',
        values: [
            { actual: '0', display: 'Empty' },
            { actual: '1', display: 'Framed' },
            { actual: '2', display: 'Basic' },
            { actual: '3', display: 'Complete' }
        ]
    }, {
        gvas: 'TramGate_1_Material',
        html: 'doors-maray-tram-1',
        label: 'First tram door',
        type: 'select',
        values: [
            { actual: '0', display: 'Empty' },
            { actual: '1', display: 'Framed' },
            { actual: '2', display: 'Basic' },
            { actual: '3', display: 'Complete' }
        ]
    }, {
        gvas: 'TramGate_2_Material',
        html: 'doors-maray-tram-2',
        label: 'Second tram door',
        type: 'select',
        values: [
            { actual: '0', display: 'Empty' },
            { actual: '1', display: 'Framed' },
            { actual: '2', display: 'Basic' },
            { actual: '3', display: 'Complete' }
        ]
    }, {
        gvas: 'TramGate_3_Material',
        html: 'doors-maray-tram-3',
        label: 'Third tram door',
        type: 'select',
        values: [
            { actual: '0', display: 'Empty' },
            { actual: '1', display: 'Framed' },
            { actual: '2', display: 'Basic' },
            { actual: '3', display: 'Complete' }
        ]
    }]
}, {
    html: 'bridges-maray',
    title: 'Maray bridges',
    children: [{
        gvas: 'SwampExtrusionBridge1',
        html: 'bridges-maray-1',
        label: 'Bridge between WMD and Tree',
        type: 'select',
        values: [
            { actual: '00000;00000', display: 'Not yet used' },
            { actual: '00000', display: 'Empty' },
            { actual: '11111', display: 'Framed' },
            { actual: '22222', display: 'Basic' },
            { actual: '33333', display: 'Complete' }
        ]
    }, {
        gvas: 'SwampExtrusionBridge2',
        html: 'bridges-maray-2',
        label: 'Bridge between mine rotation and pod dispenser',
        type: 'select',
        values: [
            { actual: '00000;00000', display: 'Not yet used' },
            { actual: '00000', display: 'Empty' },
            { actual: '11111', display: 'Framed' },
            { actual: '22222', display: 'Basic' },
            { actual: '33333', display: 'Complete' }
        ]
    }, {
        gvas: 'SwampExtrusionBridge3',
        html: 'bridges-maray-3',
        label: 'Bridge between Armory and disabler beam building',
        type: 'select',
        values: [
            { actual: '00000;00000', display: 'Not yet used' },
            { actual: '00000', display: 'Empty' },
            { actual: '11111', display: 'Framed' },
            { actual: '22222', display: 'Basic' },
            { actual: '33333', display: 'Complete' }
        ]
    }, {
        gvas: 'SwampExtrusionBridge4',
        html: 'bridges-maray-4',
        label: 'Bridge between Armory and junkyard swapping area',
        type: 'select',
        values: [
            { actual: '00000;00000', display: 'Not yet used' },
            { actual: '00000', display: 'Empty' },
            { actual: '11111', display: 'Framed' },
            { actual: '22222', display: 'Basic' },
            { actual: '33333', display: 'Complete' }
        ]
    }, {
        gvas: 'SwampExtrusionBridge7',
        html: 'bridges-maray-7',
        label: 'Bridge between Maray entry and WMD area',
        type: 'select',
        values: [
            { actual: '00000;00000', display: 'Not yet used' },
            { actual: '00000', display: 'Empty' },
            { actual: '11111', display: 'Framed' },
            { actual: '22222', display: 'Basic' },
            { actual: '33333', display: 'Complete' }
        ]
    }, {
        gvas: 'ExtrusionBridgeVilleinA',
        html: 'bridges-maray-a',
        label: 'Bridge between mine rotation and maze',
        type: 'select',
        values: [
            { actual: '00000;00000', display: 'Not yet used' },
            { actual: '00000', display: 'Empty' },
            { actual: '11111', display: 'Framed' },
            { actual: '22222', display: 'Basic' },
            { actual: '33333', display: 'Complete' }
        ]
    }, {
        gvas: 'ExtrusionBridgeVilleinB',
        html: 'bridges-maray-b',
        label: 'Bridge between mine rotation and locking beam',
        type: 'select',
        values: [
            { actual: '00000;00000', display: 'Not yet used' },
            { actual: '00000', display: 'Empty' },
            { actual: '11111', display: 'Framed' },
            { actual: '22222', display: 'Basic' },
            { actual: '33333', display: 'Complete' }
        ]
    }]
}, {
    gvas: 'HunrathTreeDeviceProgress',
    html: 'tree-swapper-progress',
    title: 'C.W.\'s giant swapper progress',
    description: '0 is 0% and 10 is 100%. Value will go over 10 if you increase it outside the game and then do something in-game to increment it.',
    min: 0
}, {
    gvas: 'HunrathSwingBridgeYaw',
    html: 'hunrath-swing-bridge-position',
    title: 'Position of Hunrath swing bridge',
    description: 'The game normally settles on one of three values: 0 (town-side), 0.5 (across river), and 1 (mine-side).',
    min: 0,
    max: 1
}, {
    gvas: 'SwampWMDDisabled',
    html: 'wmd-disabled',
    title: 'Mofang WMD',
    description: 'Disabling the WMD will close certain end area doors in Maray.',
    label: 'Disabled'
}]