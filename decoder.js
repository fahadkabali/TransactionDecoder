const bitcoin = require('bitcoinjs-lib')
const rawTransactionHex = "020000000001010ccc140e766b5dbc884ea2d780c5e91e4eb77597ae64288a42575228b79e234900000000000000000002bd37060000000000225120245091249f4f29d30820e5f36e1e5d477dc3386144220bd6f35839e94de4b9cae81c00000000000016001416d31d7632aa17b3b316b813c0a3177f5b6150200140838a1f0f1ee607b54abf0a3f55792f6f8d09c3eb7a9fa46cd4976f2137ca2e3f4a901e314e1b827c3332d7e1865ffe1d7ff5f5d7576a9000f354487a09de44cd00000000"
const decodedTransaction = bitcoin.Transaction.fromHex(rawTransactionHex)
//version data to display in the terminal
console.log("VERSION:")
console.log(`Version: ${decodedTransaction.version}`)
//input data to display in terminal
console.log("INPUTS:")
decodedTransaction.ins.forEach((txin, index) => {
    console.log(`  Input ${index + 1}:`)
    console.log(`    Transaction Hash: ${txin.hash.reverse().toString('hex')}`)
    console.log(`    Output Index: ${txin.index}`);
    console.log(`    Script Length: ${txin.script.length}`)
    console.log(`    Sequence: ${txin.sequence}`)

    //Witness data to display in the terminal
    console.log(`    Witness Count: ${txin.witness.length}`)
    txin.witness.forEach((witness, witnessIndex) => {
        console.log(`      Witness ${witnessIndex + 1}: ${witness.toString('hex')}`)
    });
});

// Output data to display in the terminal
console.log("OUTPUTS");
decodedTransaction.outs.forEach((txout, index) => {
    console.log(`  Output ${index + 1}:`)
    console.log(`    Value: ${txout.value}`)
    console.log(`    Script Length: ${txout.script.length}`)
    console.log(`    Public Key Script: ${txout.script.toString('hex')}`)
});

// Locktime for the raw transaction to be included in the blockchain
console.log("LOCKTIME:")
console.log(`Locktime: ${decodedTransaction.locktime}`)
