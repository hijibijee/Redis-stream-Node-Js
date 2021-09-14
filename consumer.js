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

async function consume(){
    for(var con = 1; con <= 10; con++){
        redis.xread('COUNT', 1, 'BLOCK', 0, 'STREAMS', "messages", '$', function (err, stream) {
            if (err) {
                console.error(err);
            }

            if (stream) {
                var messages = stream[0][1];
                messages.forEach(function(message){
                    var id = message[0];
                    var values = message[1];
                                        
                    console.log( "Consumer says: " + JSON.stringify(values[1]));
                });
                
            } else {
                console.log("No new message...");
            }
        });
    }
}

consume();

app.listen(5000, () => {
    console.log(`App listening on port ${PORT}`);
});