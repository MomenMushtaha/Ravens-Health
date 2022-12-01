const arr = [
  { "SupplierName" : "John", "Category " : "A", "Points" : 3 },
  { "SupplierName" : "John", "Category " : "A", "Points" : 11 },
  { "SupplierName" : "John", "Category " : "A", "Points" : undefined },
  { "SupplierName" : "John", "Category " : "B", "Points" : 2 },
  { "SupplierName" : "John", "Category " : "B", "Points" : 6 },
  { "SupplierName" : "Praveen", "Category " : "A", "Points" : 3 },
  { "SupplierName" : "Praveen", "Category " : "A", "Points" : 7 }
];
const groupAndAverage = (arr = []) => {
  const groups = arr.reduce((acc, obj) => {
      const name = obj.SupplierName + obj.Category;
     if (acc[name]) {
        if (obj.Points) (acc[name].Points += obj.Points) && ++acc[name].Average;
     }
     else { acc[name] = obj;
        acc[name].Average = 1;
        // taking 'Average' attribute as an items counter(on the first phase)
     };
     return acc;
  }, {});
  // getting "average of Points" 
  const res = Object.keys(groups).map( name => {       groups[name].Average = Math.round(groups[name].Points/groups[name].Average);
     return groups[name];
  });
  return res;
}; console.log(JSON.stringify(groupAndAverage(arr), undefined, 4));


export default groupAndAverage();