var roleHarvester = {
    
    /** @param {Creep} creep **/
    run: function(creep) {
        if (creep.carry.energy == 0) {
            creep.memory.building = false;
        }
	    if(creep.carry.energy < creep.carryCapacity && !creep.memory.building) {
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) {
                creep.say('H:rsrc?');
                creep.moveTo(sources[1]);
            }
            else {
                creep.say('H:hvst!');
            }
        }
        else {
            var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) &&
                            structure.energy < structure.energyCapacity;
                    }
            });
            if(targets.length > 0) {
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.say('H:home?');
                    creep.moveTo(targets[0]);
                }
            }
            else {
                //Do some construction work ya lazy!
                creep.memory.building = true;
                var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
                if(targets.length > 0) {
                    if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                        creep.say('H:trgt?');
                        creep.moveTo(targets[0]);
                    }
                    else {
                        creep.say('H:bld!');
                    }
                }
                else {
                    creep.memory.building = false;
                }
            }
        }
	}
};

module.exports = roleHarvester;