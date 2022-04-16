# Create Block Wallet

## 🤖 Documentation

Creates a new wallet on the Solana blockchain and returns the address and account info.

_Example input:_

This function expects no input.

_Example output:_

```json
{
 "address": "base58encodedaddress",
 "data": "string"
}
```

## 📝 Environment Variables

List of environment variables used by this cloud function:

- **SOL_NET** - Which Solana network to use. Options are `main`, `dev-net`. Defaults to `dev-net`.
- **KEY_COLLECTION_ID** - The ID of the collection storing user keys
- **ENDPOINT** - The endpoint of the Appwrite instance
- **API_KEY** - The API Key for the Appwrite instance

## 🚀 Deployment

### Using CLI

Make sure you have [Appwrite CLI](https://appwrite.io/docs/command-line#installation) installed, and you have successfully logged into your Appwrite server. To make sure Appwrite CLI is ready, you can use the command `appwrite client --debug` and it should respond with green text `✓ Success`.

Make sure you are in the same folder as your `appwrite.json` file and run `appwrite deploy function` to deploy your function. You will be prompted to select which functions you want to deploy.

### Manual using tar.gz

Manual deployment has no requirements and uses Appwrite Console to deploy the tag. First, enter the folder of your function. Then, create a tarball of the whole folder and gzip it. After creating `.tar.gz` file, visit Appwrite Console, click on the `Deploy Tag` button and switch to the `Manual` tab. There, set the `entrypoint` to `src/index.js`, and upload the file we just generated.
