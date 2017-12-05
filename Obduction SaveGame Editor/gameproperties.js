var stringProperties = [
	{
		'identifier' : 'License Plate Solution',
		'id' : 'LicensePlateSolution',
		'after' : [0],
		'options' : ['Arizona','California','Colorado','DC','Florida','Minnesota','Missouri','Montana','New York','North Carolina','Ohio','Pennsylvania','Rhode Island','Texas','Washington'],
		'altOptions' : ['Arizona (259742)','California (259167)','Colorado (244153)','D.C. (164965)','Florida (629415)','Minnesota (172958)','Missouri (325247)','Montana (155520)','New York (441693)','North Carolina (686403)','Ohio (163107)','Pennsylvania (323961)','Rhode Island (258287)','Texas (787932)','Washington (356807)']
	},
	{
		'identifier' : 'Active Easter Egg Photo',
		'id' : 'ChainEEMachineEasterEgg',
		'after' : [0],
		'options' : ['94963302383952586419','89118429617127928948','20796280597791483927','62085360679298484072','10903640410977768000','42473318715481250036','87677157641487174867','97322106321420761459','31246700145194224615','65100045445457466787','32773205775779923923','21545483286235483289','15456788796324265526','48842383423898923563','00200546502155103247','83876904023474278393','21324166454465686551','54546987981981879666','84892365345378201910','00203893894048390028','22102154486210115444','29009384748920387456','01252157456585412211','87972348236328238649','21466547980534454441','78578945789578451457','84376475780821542542','01458547962541320475','34729207645839020234','54548751134543543543','73223923502154884681','01324679824042454008','04245457879105444589','43675745744562578587','76005004005060626003','44554548451104402443','00212154155445511424','05545754328305723902','04651842897312404516','41246654422701040404','54574574544949782146','44651424022416214145','45456140707979776647','15424219982424400451','98784763489636292992','02145467879457205467','05481851114841398347','01240457045457574444','83479348345873489344','00000000000000001017','81692257612596513996','46471464970745899589','03059912153694152926','60011617117982104067','46244204028245636138','47297039046285289665','52307083312855333931','23608245112299177601','79113886964167406703','39166488711641851871','98540222284362254836','77189501249998307770'],
		'altOptions' : ['Photo #1','Photo #2','Photo #3','Photo #4','Photo #5','Photo #6','Photo #7','Photo #8','Photo #9','Photo #10','Photo #11','Photo #12','Photo #13','Photo #14','Photo #15','Photo #16','Photo #17','Photo #18','Photo #19','Photo #20','Photo #21','Photo #22','Photo #23','Photo #24','Photo #25','Photo #26','Photo #27','Photo #28','Photo #29','Photo #30','Photo #31','Photo #32','Photo #33','Photo #34','Photo #35','Photo #36','Photo #37','Photo #38','Photo #39','Photo #40','Photo #41','Photo #42','Photo #43','Photo #44','Photo #45','Photo #46','Photo #47','Photo #48','Photo #49','Photo #50','Photo #51','Photo #52','Photo #53','Photo #54','Photo #55','Photo #56','Photo #57','Photo #58','Photo #59','Photo #60','Photo #61','Photo #62']
	},
	{
		'identifier' : 'Minecart Disabler Beam Color',
		'id' : 'CWMinecartBeamColor',
		'after' : [0],
		'options' : ['0','1','2','3','4'],
		'altOptions' : ['Green','Cyan','Blue (Default)','Purple','Black']
	},
	{
		'identifier' : 'Workshop Disabler Beam Color',
		'id' : 'HunrathCWWorkshopBeamColor',
		'after' : [0],
		'options' : ['0','1','2','3','4'],
		'altOptions' : ['Green','Cyan','Blue (Default)','Purple','Black']
	},
	{
		'identifier' : 'Maray Building Disabler Beam Color',
		'id' : 'SwampBeamBuildingBeamColor',
		'after' : [0],
		'options' : ['0','1','2','3','4'],
		'altOptions' : ['Green','Cyan','Blue (Default)','Purple','Black']
	},
	{
		'identifier' : 'Maray WMD Disabler Beam Color',
		'id' : 'SwampWMDBeamColor',
		'after' : [0],
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
