# Vocab-Backend
Backend for Vocab

#### API Endpoints

```
[GET] https://vocabbackend.herokuapp.com/api/v1 
// Return all words with their information like definition, etymologies etc.
// Response Body :
   {
       error: boolean,
       length: number,
       result: Array(Objects)
   }
```
```
[GET] https://vocabbackend.herokuapp.com/api/v1/search?word=|value|
// Return all words with their information like definition, etymologies etc. for
// searched value
// Response Body :
   {
       error: boolean,
       length: number,
       result: Array(Objects)
   }
```
```
[POST] https://vocabbackend.herokuapp.com/api/v1/
// Adds word to dictionary
// Request Body :
   {
       word: String
   }
// Response Body :
   {
       error: boolean,
       dict: Object
   }
```
