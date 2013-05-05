var assert = require('assert');
var should = require('should');

var neatNode = require('../genome/neatNode.js');
var neatActivationFactory = require('../../CPPN.js/activationFunctions/cppnActivationFactory.js');
var cppnNode = require('../../CPPN.js/components/cppnNode.js');

var testActivation = function(functionString, value, functionValue)
{
    var aFunc;
    before(function(done){
        aFunc = neatActivationFactory.Factory.getActivationFunction(functionString);
        done();
    });

    it(functionString + ' should have {functionID: ' + functionString + '}' ,function(){
        aFunc.should.have.property('functionID', functionString);
    });

    it(functionString + ' should calculate {f(' + value + ') = ' + functionValue + '}' ,function(){
        parseFloat(aFunc.calculate(value).toFixed(15)).should.equal(functionValue);
    });
};

//implemented the following:
//BipolarSigmoid
//PlainSigmoid
//Gaussian
//Linear
//NullFn
//Sine
//StepFunction

var activationFunctionIDs = [
    'BipolarSigmoid',
    'PlainSigmoid',
    'Gaussian',
    'Linear',
    'NullFn',
    'Sine',
    'StepFunction'
];

describe('Creating Activation Functions:',function(){
    testActivation('BipolarSigmoid', 0, 0);
    testActivation('PlainSigmoid', 0,.5);
    testActivation('Gaussian', 0,1);
    testActivation('Linear', -1,1);
    testActivation('NullFn', 1,0);
    testActivation('Sine', Math.PI/2, 0);
    testActivation('StepFunction', .00001,1);

    //finally, test out a fake activation function
    (function(){
        var aFunc = neatActivationFactory.Factory.getActivationFunction('FakeActivation')
    }).should.throw("Activation Function doesn't exist!");
});

describe('Random Activation Test',function(){
    var aFunc;
    before(function(done){
        aFunc = neatActivationFactory.Factory.getRandomActivationFunction()
        done();
    });

    it('should have random function from activationFunction IDs' ,function(){
        var whichFunction;

        activationFunctionIDs.forEach(function(aFunctionID){
            if(aFunctionID == aFunc.functionID)
            {
                whichFunction = aFunctionID;
            }
        });

        //if we don't pick one of our functions, then which function will be undefined
        //there will be a function ID (guaranteed by above test), so they won't be equal
        aFunc.functionID.should.equal(whichFunction);
    });
});

describe('Creating a new node',function(){
    var node;
    var aFunc;
    var inCount = 1;
    var outCount = 1;
    var gid = Math.floor(Math.random()*1000);
    var layer = 5;
    var aFunctionID = 'BipolarSigmoid';
    var type = cppnNode.NodeType.hidden;

//  cantorPair tests invalid now
//    before(function(done){
//        aFunc = neatActivationFactory.Factory.getActivationFunction(aFunctionID);
//        done();
//    });
//
//    it('should be able to tell node type from gid, ins, and outs',function(){
//
//        gid = cantorPair.xy2cp(0,0);
//        node = new neatNode.NeatNode(gid, aFunc, layer, {inCount: inCount, outCount: outCount});
//        node.type.should.equal(cppnNode.NodeType.bias);
//
//        gid = cantorPair.xy2cp(1,1);
//        node = new neatNode.NeatNode(gid, aFunc, layer, {inCount: inCount, outCount: outCount});
//        node.type.should.equal(cppnNode.NodeType.input);
//
//        gid = cantorPair.xy2cp(2,2);
//        node = new neatNode.NeatNode(gid, aFunc, layer, {inCount: inCount, outCount: outCount});
//        node.type.should.equal(cppnNode.NodeType.output);
//
//        gid = cantorPair.xy2cp(3,3);
//        node = new neatNode.NeatNode(gid, aFunc, layer, {inCount: inCount, outCount: outCount});
//        node.type.should.equal(cppnNode.NodeType.hidden);
//
//        gid = cantorPair.xy2cp(0,3);
//        node = new neatNode.NeatNode(gid, aFunc, layer, {inCount: inCount, outCount: outCount});
//        node.type.should.equal(cppnNode.NodeType.hidden);
//    });

    before(function(done){
        aFunc = neatActivationFactory.Factory.getActivationFunction(aFunctionID);
        node = new neatNode.NeatNode(gid, aFunc, layer, {type: type});
        done();
    });

    it('should have a gid, activation, layer, and type',function(){
        node.should.have.property('gid', gid);
        node.should.have.property('activationFunction',aFunc);
        node.should.have.property('layer',layer);
        node.should.have.property('type',type);
    });

});

describe('Copying a node',function(){
    var node;
    var aFunc;
    var gid = 0;
    var layer = 5;
    var aFunctionID = 'BipolarSigmoid';
    var type = cppnNode.NodeType.hidden;

    before(function(done){
        aFunc = neatActivationFactory.Factory.getActivationFunction(aFunctionID);
        node = new neatNode.NeatNode(gid, aFunc, layer, {type: type});
        node = new neatNode.NeatNode.Copy(node);
        done();
    });

    it('should have copied gid, activation, layer, and type',function(){
        node.should.have.property('gid', gid);
        node.should.have.property('activationFunction',aFunc);
        node.should.have.property('layer',layer);
        node.should.have.property('type',type);
    });
});