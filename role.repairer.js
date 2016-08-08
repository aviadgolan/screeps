var roleRepairer = {

    /** @param {Creep} creep **/
    run: function(creep) {
	    if(creep.memory.repairing && creep.carry.energy == 0) {
            creep.memory.repairing = false;
            creep.say('R:hvst');
	    }
	    if(!creep.memory.repairing && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.repairing = true;
	    }

	    if(creep.memory.repairing) {
            var targets = creep.room.find(FIND_STRUCTURES, {
                filter: object => object.hits < object.hitsMax
            });
            
            targets.sort((a,b) => a.hits - b.hits);
            
            if(targets.length > 0) {
                if(creep.repair(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.say('R:trgt?');
                    creep.moveTo(targets[0]);
                }
                else {
                    creep.say('R:rpr!');
                }
            }
            //Nothing to repair, Build!
            else {
    	        var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
                if (targets.length > 0) {
                    if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                        creep.say('R:trgt?');
                        creep.moveTo(targets[0]);
                    }
                    else {
                        creep.say('R:bld!');
                    }
                }
            }
	    }
	    else {
	        var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) {
                creep.say('R:rsrc?');
                creep.moveTo(sources[1]);
            }
	    }
	}
};

module.exports = roleRepairer;