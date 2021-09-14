const express = require('express');
const Redis = require('redis');
const cors = require('cors');
const http = require('http');
const { SSL_OP_EPHEMERAL_RSA } = require('constants');
const PORT = 5000;
const REDIS_PORT = 6379;

const redis = Redis.createClient(REDIS_PORT);

const app = express();
app.use(cors());

const GROUPNAME = "consumers";
const STREAMNAME = "messages";

async function createGroup(){
    redis.xgroup('CREATE', STREAMNAME, GROUPNAME, 0, 'MKSTREAM');
}

async function consume(WORKERNAME){
    //console.log(WORKERNAME + "is working...");
    for(var con = 1; con <= 3; con++){
        //console.log("iteration - " + con);
        redis.xreadgroup('GROUP', GROUPNAME, WORKERNAME, 'COUNT', 1, 'BLOCK', 2000, 'STREAMS', STREAMNAME, '>', function (err, stream) {
            if (err) {
                console.error(err);
            }

            if (stream) {
                var messages = stream[0][1];
                messages.forEach(function(message){
                    var id = message[0];
                    var values = message[1];                    
                    console.log(WORKERNAME + " says: " + JSON.stringify(values[1]));

                    redis.xack(STREAMNAME, GROUPNAME, id);
                });
                
            } else {
                console.log(WORKERNAME + " is not saying anything");
            }
        });
    }
}

async function consumers(){
    var workers = ["Taif", "Nuhash", "Abir", "Chakravarty"]
    var workingShifts = 100;
    while(workingShifts > 0){
        workers.forEach(consume);

        workingShifts--;
    }
}

createGroup();
consumers();

app.listen(5000, () => {
    console.log(`App listening on port ${PORT}`);
});