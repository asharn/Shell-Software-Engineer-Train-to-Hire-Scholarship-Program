function randomInteger(max) {
    return Math.floor(Math.random()*(max + 1));
}

function randomRgbColor() {
    let r = randomInteger(255);
    let g = randomInteger(255);
    let b = randomInteger(255);
    return [r,g,b];
}

function randomHexColor() {
    let [r,g,b] =randomRgbColor();
 
    let hr = r.toString(16).padStart(2, '0');
    let hg = g.toString(16).padStart(2, '0');
    let hb = b.toString(16).padStart(2, '0');
 
    return hr + hg + hb;
}

function getListOfColor(randomeNumber) {
    let colors = [];
    for(let i = 0; i <= randomeNumber; i++) {
        colors.push(randomHexColor());
    }
 
    return colors;
}


export function generateRandomProfilePic (username) {

    const listOfVariant = ['marble', 'beam', 'pixel', 'sunset', 'ring' ,  'bauhaus'];
    let variant = listOfVariant[Math.floor(Math.random()*listOfVariant.length)];
    let colors = getListOfColor(randomInteger(10));
    console.log(colors);
    let avatarUrl = 'https://source.boringavatars.com/' + variant+'/192/'+username+'?colors='+colors.join(',');
    return avatarUrl;
  }