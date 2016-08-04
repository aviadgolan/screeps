Screeps Game stuff <3

Important Info: upgradeController Room.energyAvailable StructureSpawn.renewCreep - http://support.screeps.com/hc/en-us/articles/205990342-StructureSpawn#renewCreep
Spawn Harvester: Game.spawns['Spawn1'].createCreep( [WORK, CARRY, MOVE], 'Upgrader1' );
Spawn and modify to Upgrader/Harvester: Game.creeps['Harvester1'].memory.role = 'harvester'; Game.creeps['Upgrader1'].memory.role = 'upgrader';
Spawn Builder: Game.spawns['Spawn1'].createCreep( [WORK, CARRY, MOVE], 'Builder1', { role: 'builder' } );
