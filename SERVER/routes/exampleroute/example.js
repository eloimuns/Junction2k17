'use strict';

var mapIndex = function (req, res) {
    res.status(200);
    res.json({'msg': 'EA 2017 Q2'});
};


module.exports.mapIndex = mapIndex;