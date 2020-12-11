const Dictionary = require("../../../models/v1/dictionary/dictionary");

exports.getAllWords = async (req, res, next) => {
    try {
        
        // QUERY DOCUMENTS FROM COLLECTION AND LEAN THEM TO SIMPLE JSON OBJECTS
        const result = await Dictionary.find().lean();

        // RETURN RESPONSE WITH NO OF DOCUMENTS AND THERE BODY
        return res.status(200).json({
            error: false,
            length: result.length,
            result
        });
        
    } catch (error) {
        return res.status(500).send(error.message);
    }
}