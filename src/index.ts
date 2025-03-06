

function createHeader(bytes) {
    let data = new Uint8Array(bytes);
    console.log(data);
    const dataView = new DataView(data.buffer, data.byteOffset, data.length);
}


createHeader('lol');