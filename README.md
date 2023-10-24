# Assignment

## 2. Create data from API 

API from <https://dummyjson.com/users>

- Your project must use Typescript, Typescript module, and HTTP framework (GRPC is plus)
- Tranforms JSON data from API to new data groupBy department
- We encourage you to write tests, which we will give you some extra score
- We will give you an extra score if you focus on performance.

--- sample response --

```json

department: [
    {
        "Marketing": {
            "male": 1,                      // ---> Male Summary
            "female": 1,                    // ---> Femlae Summary
            "ageRange": "XX-XX",            // ---> Range
            "ageMode": 1,                   // ---> Mode ฐานนิยม
            "hair": {                       // ---> "Color": Color Summary
                "Black": 1,                
                "Blond": 1,
                "Chestnut": 1,
                "Brown": 1
            },
            "addressUser": {                // ---> "firstNamelastName": postalCode (address)
                "TerryMedhurst": "XXXXX",
            }
        }
    }, 
    ...
]
```
