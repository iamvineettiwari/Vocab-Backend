const Dictionary = require("../../../models/v1/dictionary/dictionary");

exports.searchWord = async (req, res, next) => {

    // GET THE WORD THAT IS BEING QUERIED
    const word = req.query.word;

    try {
        
        // IF WORD IS NOT DEFINED OR VALUE HAS NOT BEEN PASSED TO IT
        // RETURN ALL DOCUMENTS FORM COLLECTION
        if (!word) {
            const result = await Dictionary.find().lean();

            return res.status(200).json({
                error: false,
                length: result.length,
                result
            });
        }

        // ELSE CREATE A REGULAR EXPRESSION OBJECT WITH IGNORE CASE
        const searchWord = new RegExp(word, 'i');

        // SEARCH IN COLLECTION FOR DOCUMENT MATCHING WORD WITH REGULAR EXPRESSION
        const result = await Dictionary.find({ word: searchWord }).lean();

        // RETURN DOCUMENTS WITH THEIR TOTAL NUMBER
        return res.status(200).json({
            error: false,
            length: result.length,
            result
        });
    } catch (error) {
        return res.status(500).send(error.message);
    }
}