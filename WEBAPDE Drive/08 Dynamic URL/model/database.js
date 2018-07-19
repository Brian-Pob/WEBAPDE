function databaseQuery(id){
    switch(id){
    case 1: return 'mysql';
    case 2: return 'cassandra';
    case 3: return 'mongodb';
    case 4: return 'mariadb';
    case 5: return 'dynamo';
    case 6: return 'postgress-sql';
   }
}

module.exports.databaseQuery = databaseQuery;

function animQuery(id){
    switch(id){
    case 1: return 'Ape';
    case 2: return 'Bear';
    case 3: return 'Cat';
    case 4: return 'Dog';
    case 5: return 'Elephant';
    case 6: return 'Ferret';
   }
}

module.exports.animQuery = animQuery;

function foodQuery(id){
    switch(id){
    case 1: return 'apple pie';
    case 2: return 'baked mac';
    case 3: return 'corned beef';
    case 4: return 'dragon fruit';
    case 5: return 'eggplant (fried)';
    case 6: return 'french fries';
   }
}

module.exports.foodQuery = foodQuery;