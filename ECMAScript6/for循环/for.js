const arr = [1, 2, 3, 4, 5];

for (let i = 0; i < arr.length; i++) {
    console.log('start', i);
    if (arr[i] === 3) {
        continue;
    }

    console.log('end', i);
}

for (let i = 0; i < arr.length; i++) {
    console.log('start', i);
    if (arr[i] === 3) {
        break;
    }

    console.log('end', i);
}
