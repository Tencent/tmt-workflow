
document.body.onclick = function(){
    require.ensure([], function() {
        require('./mod/mod.js')();
    });
}

let filename = 'entry.js';
let out = `my test is ${filename}`

console.log(out);
