const crypto = require('crypto');

const encrypt = async function (data) {
    let iv = crypto.getRandomValues(new Uint8Array(12));
    let algorithm = {
        name: "AES-GCM",
        iv: iv
    }
    let key = await crypto.subtle.generateKey({
            name: "AES-GCM",
            length: 256
        },
        true,
        ["encrypt", "decrypt"]
    )
    let data = await data.arrayBuffer()
    const result = await crypto.subtle.encrypt(algorithm, key, data)
    let exportedkey =  await crypto.subtle.exportKey("jwk", key)
 
    return {result, iv: iv.toString(), exportedkey}
}

const decrypt = async function(encdata, ivdata, exportedkey) {
    let key = await crypto.subtle.importKey(
        "jwk",
        exportedkey,
        { name: "AES-GCM" },
        true,
        ["encrypt", "decrypt"]
    );

    let iv = new Uint8Array(ivdata.split(','))

    let algorithm = {
        name: "AES-GCM",
        iv: iv
    }

    let data = await encdata.arrayBuffer();
    let decryptedData = await crypto.subtle.decrypt(algorithm, key, data)

    return decryptedData
}

module.exports = {
    encrypt,
    decrypt
}