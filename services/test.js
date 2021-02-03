const k = require('../data/keyword').keyword


for (i in k) {
    if (i.includes('ส ')) {
        console.log(i)
    }
}