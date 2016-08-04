var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRepairer = require('role.repairer');

module.exports.loop = function () {
    //Some Settings:
    var roomLvl = 2;
    var doSpawn = true; //PANIC BUTTON!
    var workersRatio = new Array();
    workersRatio['harversters'] = 1.5;
    workersRatio['builders'] = 1.5;
    workersRatio['upgraders'] = 1.5;
    workersRatio['repairers'] = 0;

    //Tick Control:
    console.log("----------[ New Tick ]----------");
    
    //Creaps Auto creation:
    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }
    
    //Manage harvester:
    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    console.log('harvesters: ' + harvesters.length);
    
    if(harvesters.length < (roomLvl * workersRatio['harversters']) && doSpawn) {
        //Lets find a free name:
        var newName = "harvester";
        var num = 1;
        var exist = false;
        while (!exist) {
            exist = true;
            newName = "harvester"+String(num);
            for(var name in Game.creeps) {
                if (name == newName) {
                    exist = false;
                }
            }
            num++;
        }
        
        //Then we spawn one:
        if (harvesters.length == 0 && Game.spawns['Spawn1'].spawning == null) {
            //OMG NO HARVESTERS!!! Build a basic one
            var newName = Game.spawns['Spawn1'].createCreep([WORK, CARRY, MOVE], newName, {role: 'harvester'});
            console.log('Spawning new harvester: ' + newName);
        }
        else if (Game.spawns['Spawn1'].spawning == null) {
            switch (roomLvl) {
                case 1:
                    var newName = Game.spawns['Spawn1'].createCreep([WORK, CARRY, MOVE], newName, {role: 'harvester'});
                    break;
                case 2:
                    var newName = Game.spawns['Spawn1'].createCreep([WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE], newName, {role: 'harvester'});
                    break;
                default:
                    //PASS
            }
            console.log('Spawning new harvester: ' + newName);
        }
    }

    //Manage upgraders:
    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    console.log('upgraders: ' + upgraders.length);

    if(upgraders.length < (roomLvl * workersRatio['upgraders']) && doSpawn) {
        //Lets find a free name:
        var newName = "upgrader";
        var num = 1;
        var exist = false;
        while (!exist) {
            exist = true;
            newName = "upgrader"+String(num);
            for(var name in Game.creeps) {
                if (name == newName) {
                    exist = false;
                }
            }
            num++;
        }
        
        //Then we spawn one:
        switch (roomLvl) {
            case 1:
                var newName = Game.spawns['Spawn1'].createCreep([WORK, CARRY, MOVE], newName, {role: 'upgrader'});
                break;
            case 2:
                var newName = Game.spawns['Spawn1'].createCreep([WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE], newName, {role: 'upgrader'});
                break;
            default:
                //PASS
        }
        console.log('Spawning new upgrader: ' + newName);
    }
    
    //Manage builders:
    var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    console.log('builders: ' + upgraders.length);

    if(builders.length < (roomLvl * workersRatio['builders']) && doSpawn) {
        //Lets find a free name:
        var newName = "builder";
        var num = 1;
        var exist = false;
        while (!exist) {
            exist = true;
            newName = "builder"+String(num);
            for(var name in Game.creeps) {
                if (name == newName) {
                    exist = false;
                }
            }
            num++;
        }
        
        //Then we spawn one:
        switch (roomLvl) {
            case 1:
                var newName = Game.spawns['Spawn1'].createCreep([WORK, CARRY, MOVE], newName, {role: 'builder'});
                break;
            case 2:
                var newName = Game.spawns['Spawn1'].createCreep([WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE], newName, {role: 'builder'});
                break;
            default:
                //PASS
        }
        console.log('Spawning new builder: ' + newName);
    }
    
    //Manage Repairers:
    var repairers = _.filter(Game.creeps, (creep) => creep.memory.role == 'repairer');
    console.log('repairers: ' + repairers.length);

    if(repairers.length < (roomLvl * workersRatio['repairers']) && doSpawn) {
        //Lets find a free name:
        var newName = "repairer";
        var num = 1;
        var exist = false;
        while (!exist) {
            exist = true;
            newName = "repairer" + String(num);
            for(var name in Game.creeps) {
                if (name == newName) {
                    exist = false;
                }
            }
            num++;
        }
        
        //Then we spawn one:
        switch (roomLvl) {
            case 1:
                //var newName = Game.spawns['Spawn1'].createCreep([WORK, CARRY, MOVE], newName, {role: 'repairer'});
                break;
            case 2:
                var newName = Game.spawns['Spawn1'].createCreep([WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE], newName, {role: 'repairer'});
                break;
            default:
                //PASS
        }
        console.log('Spawning new repairer: ' + newName);
    }
    
    //Assign work loop:
    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
        if(creep.memory.role == 'repairer') {
            roleRepairer.run(creep);
        }
    }
}