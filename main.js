var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRepairer = require('role.repairer');
var roleTrooper = require('role.trooper');


module.exports.loop = function () {
    //Some Settings:
    var roomLvl = Game.spawns['Spawn1'].room.controller.level;
    var doSpawn = true; //PANIC BUTTON!
    var workersRatio = new Array();
    workersRatio['harversters'] = 1.5;
    workersRatio['builders'] = 1.5;
    workersRatio['upgraders'] = 1;
    workersRatio['repairers'] = 0.5;
    workersRatio['troopers'] = 0;

    //Tick Control:
    console.log("----------[ New Tick ]----------");
    
    //Creaps Auto creation:
    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }
    
    //Print room energy:
    var roomStructures = Game.spawns['Spawn1'].room.find(FIND_STRUCTURES, {
        filter: (structure) => {
            return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN);
        }
    });
    var totalEnery = 0;
    for (var tmpStructure in roomStructures) {
        totalEnery += roomStructures[tmpStructure].energy;
    }
    console.log("Room Energy = " + totalEnery)
    
    
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
        if (harvesters.length == 0 && roomLvl > 0 && Game.spawns['Spawn1'].spawning == null) {
            //OMG NO HARVESTERS!!! Build a basic one
            var newName = Game.spawns['Spawn1'].createCreep([WORK, CARRY, MOVE], newName, {role: 'harvester'});
            console.log('Spawning new harvester: ' + newName);
        }
        else if (Game.spawns['Spawn1'].spawning == null) {
            switch (roomLvl) {
                case 0:
                    var newName = Game.spawns['Spawn1'].createCreep([WORK, CARRY, MOVE], newName, {role: 'harvester'});
                    break;
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
            case 2:
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
        if (builders.length == 0 && roomLvl > 1) {
            //Panic! no builders:
            var newName = Game.spawns['Spawn1'].createCreep([WORK, CARRY, MOVE], newName, {role: 'builder'});
        }
        else {
            switch (roomLvl) {
                case 1:
                    var newName = Game.spawns['Spawn1'].createCreep([WORK, CARRY, MOVE], newName, {role: 'builder'});
                    break;
                case 2:
                    var newName = Game.spawns['Spawn1'].createCreep([WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE], newName, {role: 'builder'});
                    break;
                case 3:
                    var newName = Game.spawns['Spawn1'].createCreep([WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE], newName, {role: 'builder'});
                    break;
                default:
                    //PASS
        }
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
    
    //Manage Troopers:
    var troopers = _.filter(Game.creeps, (creep) => creep.memory.role == 'trooper');
    console.log('troopers: ' + troopers.length);

    if(troopers.length < (roomLvl * workersRatio['troopers']) && doSpawn) {
        //Lets find a free name:
        var newName = "trooper";
        var num = 1;
        var exist = false;
        while (!exist) {
            exist = true;
            newName = "trooper" + String(num);
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
                var newName = Game.spawns['Spawn1'].createCreep([TOUGH, ATTACK, MOVE], newName, {role: 'repairer'});
                break;
            case 2:
                //var newName = Game.spawns['Spawn1'].createCreep([ATTACK, ATTACK, ATTACK, ATTACK, TOUGH, TOUGH, MOVE, MOVE], newName, {role: 'trooper'});
                var newName = Game.spawns['Spawn1'].createCreep([TOUGH, TOUGH, ATTACK, ATTACK, MOVE], newName, {role: 'trooper'});
                break;
            default:
                //PASS
        }
        console.log('Spawning new trooper: ' + newName);
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
        if(creep.memory.role == 'trooper') {
            roleTrooper.run(creep);
        }
    }
}