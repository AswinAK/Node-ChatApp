var generateMessage = function(from, text){
   return {
        from,
        text,
        time : new Date().getTime()
   }
};

module.exports = {
    generateMessage
}