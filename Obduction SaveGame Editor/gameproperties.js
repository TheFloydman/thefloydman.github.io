var stringProperties = [
	{
		'identifier' : 'License Plate Solution',
		'id' : 'LicensePlateSolution',
		'options' : ['Arizona','California','Colorado','DC','Florida','Minnesota','Missouri','Montana','New York','North Carolina','Ohio','Pennsylvania','Rhode Island','Texas','Washington'],
		'altOptions' : ['Arizona (259742)','California (259167)','Colorado (244153)','D.C. (164965)','Florida (629415)','Minnesota (172958)','Missouri (325247)','Montana (155520)','New York (441693)','North Carolina (686403)','Ohio (163107)','Pennsylvania (323961)','Rhode Island (258287)','Texas (787932)','Washington (356807)']
	},
	{
		'identifier' : 'Active Easter Egg Image',
		'id' : 'ChainEEMachineEasterEgg',
		'options' : ['94963302383952586419','89118429617127928948','20796280597791483927','62085360679298484072','10903640410977768000','42473318715481250036','87677157641487174867','97322106321420761459','31246700145194224615','65100045445457466787','32773205775779923923','21545483286235483289','15456788796324265526','48842383423898923563','00200546502155103247','83876904023474278393','21324166454465686551','54546987981981879666','84892365345378201910','00203893894048390028','22102154486210115444','29009384748920387456','01252157456585412211','87972348236328238649','21466547980534454441','78578945789578451457','84376475780821542542','01458547962541320475','34729207645839020234','54548751134543543543','73223923502154884681','01324679824042454008','04245457879105444589','43675745744562578587','76005004005060626003','44554548451104402443','00212154155445511424','05545754328305723902','04651842897312404516','41246654422701040404','54574574544949782146','44651424022416214145','45456140707979776647','15424219982424400451','98784763489636292992','02145467879457205467','05481851114841398347','01240457045457574444','83479348345873489344','00000000000000001017','81692257612596513996','46471464970745899589','03059912153694152926','60011617117982104067','46244204028245636138','47297039046285289665','52307083312855333931','23608245112299177601','79113886964167406703','39166488711641851871','98540222284362254836','77189501249998307770'],
		'altOptions' : ['Image #1','Image #2','Image #3','Image #4','Image #5','Image #6','Image #7','Image #8','Image #9','Image #10','Image #11','Image #12','Image #13','Image #14','Image #15','Image #16','Image #17','Image #18','Image #19','Image #20','Image #21','Image #22','Image #23','Image #24','Image #25','Image #26','Image #27','Image #28','Image #29','Image #30','Image #31','Image #32','Image #33','Image #34','Image #35','Image #36','Image #37','Image #38','Image #39','Image #40','Image #41','Image #42','Image #43','Image #44','Image #45','Image #46','Image #47','Image #48','Image #49','Image #50','Image #51','Image #52','Image #53','Image #54','Image #55','Image #56','Image #57','Image #58','Image #59','Image #60','Image #61','Image #62']
	},
	{
		'identifier' : 'Minecart Disabler Beam Color',
		'id' : 'CWMinecartBeamColor',
		'options' : ['0','1','2','3','4'],
		'altOptions' : ['Green','Cyan','Blue (Default)','Purple','Black']
	},
	{
		'identifier' : 'Workshop Disabler Beam Color',
		'id' : 'HunrathCWWorkshopBeamColor',
		'options' : ['0','1','2','3','4'],
		'altOptions' : ['Green','Cyan','Blue (Default)','Purple','Black']
	},
	{
		'identifier' : 'Maray Building Disabler Beam Color',
		'id' : 'SwampBeamBuildingBeamColor',
		'options' : ['0','1','2','3','4'],
		'altOptions' : ['Green','Cyan','Blue (Default)','Purple','Black']
	},
	{
		'identifier' : 'Maray WMD Disabler Beam Color',
		'id' : 'SwampWMDBeamColor',
		'options' : ['0','1','2','3','4'],
		'altOptions' : ['Green','Cyan','Blue (Default)','Purple','Black']
	},
	{
		'identifier' : 'SwampArmoryLight (EXPERIMENTAL)',
		'id' : 'SwampArmoryLight',
		'options' : ['0','1','2','3','4','5','6','7','8','9'],
		'altOptions' : ['0','1','2','3','4','5','6','7','8','9']
	}
];

var booleanProperties = [
	{
		'identifier' : 'Easter Egg Mode',
		'name' : 'IsEasterEggModeEnabled',
		'falseId' : 'easterEggModeDisabled',
		'trueId' : 'easterEggModeEnabled',
		'falseText' : 'Disabled',
		'trueText' : 'Enabled'
	},
	{
		'identifier' : 'Russian Box',
		'name' : 'ChainEEMachineDecoupled',
		'falseId' : 'chainEEMachineCoupled',
		'trueId' : 'chainEEMachineDecoupled',
		'falseText' : 'Attached to Stairs',
		'trueText' : 'Detached from Stairs'
	},
	{
		'identifier' : 'Russian Box',
		'name' : 'ChainEEMachineDestroyed',
		'falseId' : 'chainEEMachineNotDestroyed',
		'trueId' : 'chainEEMachineDestroyed',
		'falseText' : 'Not Destroyed',
		'trueText' : 'Destroyed'
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
		'identifier' : 'Farley\'s Front Door',
		'name' : 'HunrathFarleyFrontDoorUnlocked',
		'falseId' : 'hunrathFarleyFrontDoorLocked',
		'trueId' : 'hunrathFarleyFrontDoorUnlocked',
		'falseText' : 'Locked',
		'trueText' : 'Unlocked'
	},
	{
		'identifier' : 'Electricity at Farley\'s House',
		'name' : 'PowerToFarleysHouseEnabled',
		'falseId' : 'powerToFarleysHouseDisabled',
		'trueId' : 'powerToFarleysHouseEnabled',
		'falseText' : 'Off',
		'trueText' : 'On'
	},
	{
		'identifier' : 'Electricity in Downtown Hunrath',
		'name' : 'PowerToDowntownEnabled',
		'falseId' : 'powerToDowntownDisabled',
		'trueId' : 'powerToDowntownEnabled',
		'falseText' : 'Off',
		'trueText' : 'On'
	},
	{
		'identifier' : 'Electricity at Gas Station',
		'name' : 'PowerToGarageEnabled',
		'falseId' : 'powerToGarageDisabled',
		'trueId' : 'powerToGarageEnabled',
		'falseText' : 'Off',
		'trueText' : 'On'
	},
	{
		'identifier' : 'Electricity at Sphere',
		'name' : 'PowerToSphereEnabled',
		'falseId' : 'powerToSphereDisabled',
		'trueId' : 'powerToSphereEnabled',
		'falseText' : 'Off',
		'trueText' : 'On'
	},
	{
		'identifier' : 'Electricity in Tower',
		'name' : 'PowerToTowerEnabled',
		'falseId' : 'powerToTowerDisabled',
		'trueId' : 'powerToTowerEnabled',
		'falseText' : 'Off',
		'trueText' : 'On'
	},
	{
		'identifier' : 'Gas Station Garage Door',
		'name' : 'HunrathGarageOpen',
		'falseId' : 'garageClosed',
		'trueId' : 'garageOpen',
		'falseText' : 'Closed',
		'trueText' : 'Open'
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
		'identifier' : 'Battery Grill',
		'name' : 'CWBatteryGrillOpen',
		'falseId' : 'batteryGrillClosed',
		'trueId' : 'batteryGrillOpen',
		'falseText' : 'Closed',
		'trueText' : 'Open'
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
		'identifier' : 'HunrathCWWorkshopBackdoor (EXPERIMENTAL)',
		'name' : 'HunrathCWWorkshopBackdoorEnabled',
		'falseId' : 'hunrathCWWorkshopBackdoorDisabled',
		'trueId' : 'hunrathCWWorkshopBackdoorEnabled',
		'falseText' : 'Disabled',
		'trueText' : 'Enabled'
	},
	{
		'identifier' : 'Entry Canyon Imager',
		'name' : 'HunrathEntryCanyonImagerBroken',
		'falseId' : 'hunrathEntryCanyonImagerWorking',
		'trueId' : 'hunrathEntryCanyonImagerBroken',
		'falseText' : 'Working',
		'trueText' : 'Broken'
	},
	{
		'identifier' : 'Community Center Imager',
		'name' : 'HunrathFarleyImagerBroken',
		'falseId' : 'hunrathFarleyImagerWorking',
		'trueId' : 'hunrathFarleyImagerBroken',
		'falseText' : 'Working',
		'trueText' : 'Broken'
	},
	{
		'identifier' : 'Hunrath Tree Imager',
		'name' : 'HunrathTreeImagerBroken',
		'falseId' : 'hunrathTreeImagerWorking',
		'trueId' : 'hunrathTreeImagerBroken',
		'falseText' : 'Working',
		'trueText' : 'Broken'
	},
	{
		'identifier' : 'Downtown Hunrath Imager',
		'name' : 'HunrathDowntownImagerBroken',
		'falseId' : 'hunrathDowntownImagerWorking',
		'trueId' : 'hunrathDowntownImagerBroken',
		'falseText' : 'Working',
		'trueText' : 'Broken'
	},
	{
		'identifier' : 'Waterfall Imager',
		'name' : 'HunrathWaterfallImagerBroken',
		'falseId' : 'hunrathWaterfallImagerWorking',
		'trueId' : 'hunrathWaterfallImagerBroken',
		'falseText' : 'Working',
		'trueText' : 'Broken'
	},
	{
		'identifier' : 'Workshop Imager',
		'name' : 'HunrathCWWorkshopImagerBroken',
		'falseId' : 'hunrathCWWorkshopImagerWorking',
		'trueId' : 'hunrathCWWorkshopImagerBroken',
		'falseText' : 'Working',
		'trueText' : 'Broken'
	},
	{
		'identifier' : 'HunrathTowerPowerOn (EXPERIMENTAL)',
		'name' : 'HunrathTowerPowerOn',
		'falseId' : 'hunrathTowerPowerOff',
		'trueId' : 'hunrathTowerPowerOn',
		'falseText' : 'Off',
		'trueText' : 'On'
	},
	{
		'identifier' : 'Hunrath Connected to Hub? (EXPERIMENTAL)',
		'name' : 'HunrathConnectedToHub',
		'falseId' : 'hunrathDisonnectedToHub',
		'trueId' : 'hunrathConnectedToHub',
		'falseText' : 'No',
		'trueText' : 'Yes'
	},
	{
		'identifier' : 'Kaptar Connected to Hub? (EXPERIMENTAL)',
		'name' : 'ChainConnectedToHub',
		'falseId' : 'chainDisconnectedToHub',
		'trueId' : 'chainConnectedToHub',
		'falseText' : 'No',
		'trueText' : 'Yes'
	},
	{
		'identifier' : 'Maray Connected to Hub? (EXPERIMENTAL)',
		'name' : 'SwampConnectedToHub',
		'falseId' : 'swampDisconnectedToHub',
		'trueId' : 'swampConnectedToHub',
		'falseText' : 'No',
		'trueText' : 'Yes'
	},
	{
		'identifier' : 'Soria Connected to Hub? (EXPERIMENTAL)',
		'name' : 'SoariaConnectedToHub',
		'falseId' : 'soariaConnectedToHub',
		'trueId' : 'soariaConnectedToHub',
		'falseText' : 'No',
		'trueText' : 'Yes'
	},
	{
		'identifier' : 'Tower Elevator',
		'name' : 'HunrathTowerElevatorEnabled',
		'falseId' : 'hunrathTowerElevatorDisabled',
		'trueId' : 'hunrathTowerElevatorEnabled',
		'falseText' : 'Unpowered',
		'trueText' : 'Powered'
	},
	{
		'identifier' : 'SwampWMDDisabled (EXPERIMENTAL)',
		'name' : 'SwampWMDDisabled',
		'falseId' : 'swampWMDDEnabled',
		'trueId' : 'swampWMDDisabled',
		'falseText' : 'Enabled',
		'trueText' : 'Disabled'
	},
	{
		'identifier' : 'SwampHunrathDisabled (EXPERIMENTAL)',
		'name' : 'SwampHunrathDisabled',
		'falseId' : 'swampHunrathEnabled',
		'trueId' : 'swampHunrathDisabled',
		'falseText' : 'Enabled',
		'trueText' : 'Disabled'
	},
	{
		'identifier' : 'SwampSoariaSeedMachineDisabled (EXPERIMENTAL)',
		'name' : 'SwampSoariaSeedMachineDisabled',
		'falseId' : 'swampSoariaSeedMachineEnabled',
		'trueId' : 'swampSoariaSeedMachineDisabled',
		'falseText' : 'Enabled',
		'trueText' : 'Disabled'
	},
	{
		'identifier' : 'HunrathWorkshopDoor (EXPERIMENTAL)',
		'name' : 'HunrathWorkshopDoor',
		'falseId' : 'hunrathWorkshopDoorOpen',
		'trueId' : 'hunrathWorkshopDoorClosed',
		'falseText' : 'False',
		'trueText' : 'True'
	},
	{
		'identifier' : 'bCanBeDamage (EXPERIMENTAL)',
		'name' : 'bCanBeDamaged',
		'falseId' : 'bCannotBeDamaged',
		'trueId' : 'bCanBeDamaged',
		'falseText' : 'Cannot',
		'trueText' : 'Can'
	}
];
