# Redis stream using Node.js

## Overview
In this practice project I have explored the world of Redis stream via Node.js. 
* **producer.js:**&nbsp;&nbsp;&nbsp;&nbsp;Producer produces messages in "**hello msg_no**" format for a redis stream named **messages** using **XADD** command. 
* **consumer.js:**&nbsp;&nbsp;&nbsp;&nbsp;Consumer consumes messages from the "messages" stream and displays them using **XREAD** command.
* **consumer_group.js:**&nbsp;&nbsp;&nbsp;&nbsp;Here I have worked with the concept of consumer group introduced by redis stream. Firstly it creates a consumer group named **consumers**. Four workers work in this group. They consumes three messages per worker from the "messages" stream as they arrive in serial using **XREADGROUP** command. As soon as they displayed/worked with a particular message, they send an acknowledgement to the stream "messages" using **XACK** command.
#
## How to run
* Start a redis server. (Head over [here](https://redis.io/topics/quickstart) if you are new in redis)
* Run ```npm i express redis``` to install express and redis for Node.js
* Run ```npm run produce``` to run producer.js
* Run ```npm run consume``` to run consumer.js
* Run ```npm run consumergroup``` to run consumer_group.js
#
