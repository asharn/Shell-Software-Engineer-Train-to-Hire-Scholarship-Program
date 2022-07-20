var utensils = ['fork', 'knife', 'spoon'];

function isUtensilAvailable(utensil){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
        utensils.includes(utensil)
            ? resolve(true)
            : reject('No utensils found.')
        }, 2000);
    });
}

module.exports = isUtensilAvailable;