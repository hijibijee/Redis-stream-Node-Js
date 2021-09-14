const express = require('express');
const Redis = require('redis');
const cors = require('cors');
const http = require('http');
const { SSL_OP_EPHEMERAL_RSA } = require('constants');
const PORT = 3000;
const REDIS_PORT = 6379;

const redis = Redis.createClient(REDIS_PORT);

const app = express();
app.use(cors());

function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

async function produce(){
    for(var i = 0; i < 100000; i++){
        var curr_msg = "hello " + i.toString();
        console.log(redis.xadd("messages", '*', "curr_msg", curr_msg));
        await sleep(1000);
    }
}

produce();

app.listen(3000, () => {
    console.log(`App listening on port ${PORT}`);
});