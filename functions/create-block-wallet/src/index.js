const sdk = require("node-appwrite");
const web3 = require('@solana/web3.js');
const crypt = require('crypt');

module.exports = async function (req, res) {
  const client = new sdk.Client();
  const database = new sdk.Database(client);

  const payload = JSON.parse(req.payload ?? '{}')

  if (!payload.userId || !req.env['KEY_COLLECTION_ID']) {
    console.error("Collection or user ID is not set.");
    return;
  }
  if (
    !req.env['ENDPOINT'] ||
    !req.env['API_KEY']
  ) {
    console.warn("Environment variables are not set.");
    return;
  }

  client
    .setEndpoint(req.env['ENDPOINT'])
    .setProject(req.env['PROJECT_ID'])
    .setKey(req.env['API_KEY'])
    .setSelfSigned(true);

  const connection = new web3.Connection(
    web3.clusterApiUrl(req.env['SOL_NET'] ?? 'devnet'),
    'confirmed',
  );

  if (!payload.privKey) {
    var wallet = web3.Keypair.generate();
  } else {
    var wallet = web3.Keypair.fromSecretKey(payload.privKey);
  }

  // Get account info
  await connection.getAccountInfo(wallet.publicKey);

  let {
    encSecret, 
    iv, 
    exportedkey
  } = await crypt.encrypt(wallet.secretKey)

  await database.createDocument(
    req.env['KEY_COLLECTION_ID'],
    payload.userId,
    {
      pubKey: wallet.publicKey,
      privKey: encSecret,
      iv: iv,
      exportedkey: exportedkey,
    }, 
    [`user:${payload.userId}`], 
    [`user:${payload.userId}`]
  );

  res.json({
    wallet: wallet.publicKey.toBase58()
  });
};
