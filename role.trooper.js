var roleTrooper = {

    /** @param {Creep} creep **/
    run: function(creep) {
        var roomName = '';
        var hostiles = creep.room.find(FIND_HOSTILE_CREEPS);
        
        if(hostiles.length > 0) {
            if(creep.attack(hostiles[0]) == ERR_NOT_IN_RANGE) {
                creep.say('D:alert!');
                creep.moveTo(hostiles[0]);
            }
            else {
                creep.say('D:attk!');
            }
        }
        else {
            if (Game.flags['defZone'] != null) {
                creep.moveTo(Game.flags['defZone']);
            }
        }
    }
};

module.exports = roleTrooper;