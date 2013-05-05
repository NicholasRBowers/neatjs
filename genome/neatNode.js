(function(exports, selfBrowser, isBrowser){

//    var cantorPair = isBrowser ? selfBrowser['cantorPair'] : require('../utility/cantorPair.js');

    var neatNode = exports;

    exports.INPUT_LAYER = 0;
    exports.OUTPUT_LAYER = 10;

    exports.NeatNode = function(gid, aFunc, layer, typeObj) {

        var self = this;

        self.gid = gid;
        self.activationFunction = aFunc;

        self.type = typeObj.type;
        self.layer = layer;

        self.bias = 0;
    };

    exports.NeatNode.Copy = function(otherNode)
    {
        return new neatNode.NeatNode(otherNode.gid, otherNode.activationFunction, otherNode.layer, {type: otherNode.type});
    };


    //send in the object, and also whetehr or not this is nodejs
})(typeof exports === 'undefined'? this['neatNode']={}: exports, this, typeof exports === 'undefined'? true : false);