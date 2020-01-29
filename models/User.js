var {ExpressCassandra,models} = require('../databaseconfig');


var User = models.loadSchema('User', {
    fields:{
        id: {
            type: "uuid",
            default: {"$db_function": "uuid()"}
        },
        email    : "text",
        username : "text",
        password : "text",
        created : { type:"timestamp", default: {"$db_function": "toTimestamp(now())"}}
    },
    key:["id"]
});



User.syncDB(function(err, result) {
    if (err) throw err;    
});

module.exports = {User,ExpressCassandra,models};

