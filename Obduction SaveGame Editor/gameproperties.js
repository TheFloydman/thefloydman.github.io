var stringProperties = [
	{
		'name' : 'LicensePlateSolution',
		'after' : [0x00,0x14,0x00,0x00,0x00]
	},
	{
		'name' : 'CWMinecartBeamColor',
		'after' : [0x00,0x19,0x00,0x00,0x00]
	},
	{
		'name' : 'HunrathCWWorkshopBeamColor',
		'after' : [0x00,0x21,0x00,0x00,0x00]
	},
	{
		'name' : 'SwampBeamBuildingBeamColor',
		'after' : [0x00,0x1E,0x00,0x00,0x00]
	},
	{
		'name' : 'SwampWMDBeamColor',
		'after' : [0x00,0x15,0x00,0x00,0x00]
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