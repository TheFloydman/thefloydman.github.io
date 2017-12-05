var stringProperties = [
	{
		'identifier' : 'License Plate Solution',
		'id' : 'LicensePlateSolution',
		'after' : [0x00,0x14,0x00,0x00,0x00],
		'options' : ['Arizona','California','Colorado','DC','Florida','Minnesota','Missouri','Montana','New York','North Carolina','Ohio','Pennsylvania','Rhode Island','Texas','Washington'],
		'altOptions' : ['Arizona (259742)','California (259167)','Colorado (244153)','D.C. (164965)','Florida (629415)','Minnesota (172958)','Missouri (325247)','Montana (155520)','New York (441693)','North Carolina (686403)','Ohio (163107)','Pennsylvania (323961)','Rhode Island (258287)','Texas (787932)','Washington (356807)']
	},
	{
		'identifier' : 'Minecart Disabler Beam Color',
		'id' : 'CWMinecartBeamColor',
		'after' : [0x00,0x19,0x00,0x00,0x00],
		'options' : ['0','1','2','3','4'],
		'altOptions' : ['Green','Cyan','Blue (Default)','Purple','Black']
	},
	{
		'identifier' : 'Workshop Disabler Beam Color',
		'id' : 'HunrathCWWorkshopBeamColor',
		'after' : [0x00,0x21,0x00,0x00,0x00],
		'options' : ['0','1','2','3','4'],
		'altOptions' : ['Green','Cyan','Blue (Default)','Purple','Black']
	},
	{
		'identifier' : 'Maray Building Disabler Beam Color',
		'id' : 'SwampBeamBuildingBeamColor',
		'after' : [0x00,0x1E,0x00,0x00,0x00],
		'options' : ['0','1','2','3','4'],
		'altOptions' : ['Green','Cyan','Blue (Default)','Purple','Black']
	},
	{
		'identifier' : 'Maray WMD Disabler Beam Color',
		'id' : 'SwampWMDBeamColor',
		'after' : [0x00,0x15,0x00,0x00,0x00],
		'options' : ['0','1','2','3','4'],
		'altOptions' : ['Green','Cyan','Blue (Default)','Purple','Black']
	}
];

var booleanProperties = [
	{
		'identifier' : 'Gas Station Garage Door',
		'name' : 'HunrathGarageOpen',
		'falseId' : 'garageClosed',
		'trueId' : 'garageOpen',
		'falseText' : 'Closed',
		'trueText' : 'Open'
	},
	{
		'identifier' : 'Minecart Beam',
		'name' : 'CWMinecartBeamEnabled',
		'falseId' : 'mineBeamDisabled',
		'trueId' : 'mineBeamEnabled',
		'falseText' : 'Off',
		'trueText' : 'On'
	},
	{
		'identifier' : 'Hunrath Cell Membrane',
		'name' : 'HunrathDomeEnabled',
		'falseId' : 'hunrathDomeDisabled',
		'trueId' : 'hunrathDomeEnabled',
		'falseText' : 'Locked',
		'trueText' : 'Unlocked'
	},
	{
		'identifier' : 'Kaptar Cell Membrane',
		'name' : 'ChainDomeEnabled',
		'falseId' : 'chainDomeDisabled',
		'trueId' : 'chainDomeEnabled',
		'falseText' : 'Locked',
		'trueText' : 'Unlocked'
	},
	{
		'identifier' : 'Maray Cell Membrane',
		'name' : 'SwampDomeEnabled',
		'falseId' : 'swampDomeDisabled',
		'trueId' : 'swampDomeEnabled',
		'falseText' : 'Locked',
		'trueText' : 'Unlocked'
	},
	{
		'identifier' : 'Soria Cell Membrane',
		'name' : 'SoariaDomeEnabled',
		'falseId' : 'soariaDomeDisabled',
		'trueId' : 'soariaDomeEnabled',
		'falseText' : 'Locked',
		'trueText' : 'Unlocked'
	},
	{
		'identifier' : 'Battery Grill',
		'name' : 'CWBatteryGrillOpen',
		'falseId' : 'batteryGrillClosed',
		'trueId' : 'batteryGrillOpen',
		'falseText' : 'Closed',
		'trueText' : 'Open'
	},
	{
		'identifier' : 'Hunrath Swing Bridge Stairs',
		'name' : 'HunrathSwingBridgeBlockerEnabled',
		'falseId' : 'hunrathSwingBlockerDisabled',
		'trueId' : 'hunrathSwingBlockerEnabled',
		'falseText' : 'Lowered',
		'trueText' : 'Not Lowered'
	},
	{
		'identifier' : 'Hunrath Tree Gate',
		'name' : 'HunrathTreeGateOpen',
		'falseId' : 'hunrathTreeGateClosed',
		'trueId' : 'hunrathTreeGateOpen',
		'falseText' : 'Closed',
		'trueText' : 'Open'
	},
	{
		'identifier' : 'Water Tower Valve',
		'name' : 'HunrathWaterTowerValveOpen',
		'falseId' : 'waterTowerValveClosed',
		'trueId' : 'waterTowerValveOpen',
		'falseText' : 'Closed',
		'trueText' : 'Open'
	},
	{
		'identifier' : 'Prairie Imager Rocks',
		'name' : 'HunrathPrairieRocksDisabled',
		'falseId' : 'hunrathPrairieRocksEnabled',
		'trueId' : 'hunrathPrairieRocksDisabled',
		'falseText' : 'Enabled',
		'trueText' : 'Disabled'
	},
	{
		'identifier' : 'Quarry Imager Rocks',
		'name' : 'HunrathQuarryRocksDisabled',
		'falseId' : 'hunrathQuarryRocksEnabled',
		'trueId' : 'hunrathQuarryRocksDisabled',
		'falseText' : 'Enabled',
		'trueText' : 'Disabled'
	},
	{
		'identifier' : 'Soria Tunnel Imager Rocks',
		'name' : 'HunrathSoariaTunnelRocksDisabled',
		'falseId' : 'hunrathSoariaTunnelRocksEnabled',
		'trueId' : 'hunrathSoariaTunnelRocksDisabled',
		'falseText' : 'Enabled',
		'trueText' : 'Disabled'
	},
	{
		'identifier' : 'Tower Bleeder-side Door',
		'name' : 'HunrathLatchDoorUnlockedTowerA',
		'falseId' : 'hunrathLatchDoorTowerALocked',
		'trueId' : 'hunrathLatchDoorTowerAUnlocked',
		'falseText' : 'Locked',
		'trueText' : 'Unlocked'
	},
	{
		'identifier' : 'Tower Tree-side Door',
		'name' : 'HunrathLatchDoorUnlockedTowerB',
		'falseId' : 'hunrathLatchDoorTowerBLocked',
		'trueId' : 'hunrathLatchDoorTowerBUnlocked',
		'falseText' : 'Locked',
		'trueText' : 'Unlocked'
	},
	{
		'identifier' : 'Upper Workshop Door',
		'name' : 'HunrathLatchDoorUnlockedWorkshop',
		'falseId' : 'hunrathLatchDoorWorkshopLocked',
		'trueId' : 'hunrathLatchDoorWorkshopUnlocked',
		'falseText' : 'Locked',
		'trueText' : 'Unlocked'
	},
	{
		'identifier' : 'Lantern',
		'name' : 'HunrathEntrySphereLanternLit',
		'falseId' : 'hunrathEntrySphereLanternUnlit',
		'trueId' : 'hunrathEntrySphereLanternLit',
		'falseText' : 'Unlit',
		'trueText' : 'Lit'
	},
	{
		'identifier' : 'Slide Projector',
		'name' : 'ProjectorSwitchOn',
		'falseId' : 'projectorSwitchOff',
		'trueId' : 'projectorSwitchOn',
		'falseText' : 'Off',
		'trueText' : 'On'
	},
	{
		'identifier' : 'Junkyard Ramp',
		'name' : 'JunkyardStaircaseLowered',
		'falseId' : 'junkyardStaircaseUnlowered',
		'trueId' : 'junkyardStaircaseLowered',
		'falseText' : 'Unlowered',
		'trueText' : 'Lowered'
	},
	{
		'identifier' : 'Waterfall Sluice Gate',
		'name' : 'HunrathSluiceGateOpen',
		'falseId' : 'hunrathSluiceGateClosed',
		'trueId' : 'hunrathSluiceGateOpen',
		'falseText' : 'Closed',
		'trueText' : 'Open'
	},
	{
		'identifier' : 'Farley\'s Front Door',
		'name' : 'HunrathFarleyFrontDoorUnlocked',
		'falseId' : 'hunrathFarleyFrontDoorLocked',
		'trueId' : 'hunrathFarleyFrontDoorUnlocked',
		'falseText' : 'Locked',
		'trueText' : 'Unlocked'
	},
	{
		'identifier' : 'Kaptar Swing Bridge',
		'name' : 'ChainBridgeFanOn',
		'falseId' : 'chainBridgeFanOff',
		'trueId' : 'chainBridgeFanOn',
		'falseText' : 'Unpowered',
		'trueText' : 'Powered'
	},
	{
		'identifier' : 'Kaptar Swinging Stairs',
		'name' : 'ChainStairsLowered',
		'falseId' : 'chainStairsUnlowered',
		'trueId' : 'chainStairsLowered',
		'falseText' : 'Unlowered',
		'trueText' : 'Lowered'
	},
	{
		'identifier' : 'Easter Egg Mode',
		'name' : 'IsEasterEggModeEnabled',
		'falseId' : 'easterEggModeDisabled',
		'trueId' : 'easterEggModeEnabled',
		'falseText' : 'Disabled',
		'trueText' : 'Enabled'
	},
	{
		'identifier' : 'Electricity at Farley\'s House',
		'name' : 'PowerToFarleysHouseEnabled',
		'falseId' : 'powerToFarleysHouseDisabled',
		'trueId' : 'powerToFarleysHouseEnabled',
		'falseText' : 'Off',
		'trueText' : 'On'
	}
];
