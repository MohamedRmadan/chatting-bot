const request = require('request');
const senderAction = require('../templates/senderAction');
const sendMessage = require('../templates/sendMessage');

module.exports = function processMessage(event) {
    if (!event.message.is_echo) {
        const message = event.message;
        const senderID = event.sender.id;
        console.log("Received message from senderId: " + senderID);
        console.log("Message is: " + JSON.stringify(message));
        if (message.text) {
            // now we will take the text recieved and send it to an food tracking API.
            let text = message.text;

            var request = require("request");

            let options = {
                method: 'GET',
                url: 'http://www.omdbapi.com/?t='+text+'&apikey=18719f09',
                json: true
            };

            request(options, function (error, response, body) {
                if (error) throw new Error(error);
                senderAction(senderID);
                // after the response is recieved we will send the details in a Generic template
                if (body.Title) {
                    sendMessage(senderID, {text: 'Movie Title:'+body.Title}).then(() =>{
                        sendMessage(senderID, {text: 'Released On:'+body.Released}).then(()=> {
                            sendMessage(senderID, {text: 'Genre:'+body.Genre}).then(()=> {
                                sendMessage(senderID, {text: 'Actors:'+body.Actors}).then(()=> {
                                    sendMessage(senderID, {text: 'IMBD Rating:'+body.imdbRating}).then(()=> {
                                        sendMessage(senderID, {text: 'Director:'+body.Director}).then(()=> {
                                        })                
                                    })
                                })
                            })
                        })
                    })    
                }else{
                    sendMessage(senderID, {text: 'Something wrong, Maybe you spilled the title incorrectly.'})
                }
            });
            
        }
    }
}