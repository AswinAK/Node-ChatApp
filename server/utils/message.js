var moment = require('moment');
var generateMessage = function(from, text){
   return {
        from,
        text,
        time : new moment().valueOf()
   }
};

module.exports = {
    generateMessage
}