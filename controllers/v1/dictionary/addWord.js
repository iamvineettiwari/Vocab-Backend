const fetch = require("node-fetch");
const Dictionary = require("../../../models/v1/dictionary/dictionary");

// FUNCTION RESPONSIBLE TO HANDLE REQUEST AT /api/v1 - POST
exports.addWord = async (req, res, next) => {
    
    // EXTRACT WORD FROM THAT HAS TO BE ADDED FROM REQUEST BODY
    const word = req.body.word;

    try {
        
        // SEARCH FOR WORD IN EXISTING DOCUMENTS
        const checkWordInDb = await Dictionary.find({ word });

        // IF WORD IS ALREADY THERE IN ANY DOCUMENT, RETURN
        if (checkWordInDb.length > 0) {
            return res.status(200).json({
                error: true,
                message: 'Word already exists in dictionary !'
            });
        }

        // ELSE FETCH WORD'S DETAIL FROM OXFORD DICTIONAY API
        const request = await fetch(`https://od-api.oxforddictionaries.com/api/v2/entries/en-us/${word}?fields=etymologies,definitions,examples&strictMatch=true`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                app_id: process.env.APP_ID,
                app_key: process.env.APP_KEY,
            }
        });

        // IF REQUEST STATUS IS NOT ok ( < 200 OR > 300)
        // RETURN AN ERROR OF 404 NOT FOUND 
        if (!request.ok) {
            return res.status(404).json({
                error: true,
                message: "Could not find such word in dictionary !"
            });
        }

        // ELSE PARSE THE RESPONSE BODY TO JSON OBJECT
        const response = await request.json();

        // CREATE ONE DOCUMENT AND STORE IT IN COLLECTION
        const result = await Dictionary.create({
            word,
            information: response.results[0].lexicalEntries
        });

        // RETURN RESPONSE CREATED WITH STATUS 201 AND CREATED DOCUMENT
        return res.status(201).json({
            error: false,
            dict: result
        });
    } catch (error) {
        return res.status(500).send(error.message);
    }
}