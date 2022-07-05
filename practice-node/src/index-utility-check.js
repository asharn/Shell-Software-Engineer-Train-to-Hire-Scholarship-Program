const {sum,concat} = require('./utilities/first-two-methods');

const last_two_methods = require('./utilities/last-two-methods');

const arr = [1,2,3,4,5,6];

//Calling methods from first file
const sumOfArr = sum(arr);
console.log('Sum of original array is : ', sumOfArr);
const arrAfterConcat = concat(arr,[7,8,9]);
console.log('Array after concatination is : ',arrAfterConcat);

//Calling methods from second file
last_two_methods.cut3(arrAfterConcat);
console.log('Array after removing third element is : ',arrAfterConcat);
const lNum = last_two_methods.lgNum(arrAfterConcat);
console.log('Largest number from the remaining elements of array is : ',lNum);

