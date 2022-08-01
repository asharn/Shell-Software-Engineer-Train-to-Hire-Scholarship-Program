const fs = require('fs');

// // blocking loop 2B
// for (let i = 0; i < 2000000000; i++) {
//   if (i === 1999999999) {
//     console.log('blocking loop');
//   }
// }

// timers phase 4
setTimeout(() => {
  console.log('timeout - 5s ----- Timers 4');
}, 5000);

// Mainline
console.log('Hello, ----------- mainline');

// timers phase 1
setTimeout(() => {
  console.log('timeout - 0s ----- Timers 1');
}, 0);

// Before Exit
process.on('beforeExit', () => {
  console.log('process.on ------- beforeExit');
});

// timers phase 1
setImmediate(() => {
  console.log('immediate -------- Timers 1');
});

// begin polling phase
fs.readFile(__filename, () => {
  // timers phase 3
  setTimeout(() => {
    console.log('timeout i/0 3s --- Timers 3');
    // blocking loop 3B
    for (let i = 0; i < 3000000000; i++) {
      if (i === 2999999999) {
        console.log('blocking loop');
      }
    }
  }, 3000);
  // check phase
  setImmediate(() => {
    console.log('immediate i/o ---- Check');
  });
  // timers phase 2
  setTimeout(() => {
    console.log('timeout i/0 0s --- Timers 2');
  }, 0);
  // end poll phase
  process.nextTick(() => {
    console.log('nexttick i/o ----- After Polling');
  });
});
// end mainline / pre timers phase 1
process.nextTick(() => {
  console.log('nexttick --------- before event loop');
});

console.log('world. ----------- mainline');

// timers phase 1
setTimeout(() => {
  console.log('timeout - 0s ----- Timers 1');
}, 0);