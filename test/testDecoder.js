import { assert } from 'chai'
const { Transaction } = require('bitcoinjs-lib')

function decodeBitcoinTransaction(rawTransactionHex) {
    return bitcoin.Transaction.fromHex(rawTransactionHex)
}

const sampleRawTransactionHex = "020000000001010ccc140e766b5dbc884ea2d780c5e91e4eb77597ae64288a42575228b79e234900000000000000000002bd37060000000000225120245091249f4f29d30820e5f36e1e5d477dc3386144220bd6f35839e94de4b9cae81c00000000000016001416d31d7632aa17b3b316b813c0a3177f5b6150200140838a1f0f1ee607b54abf0a3f55792f6f8d09c3eb7a9fa46cd4976f2137ca2e3f4a901e314e1b827c3332d7e1865ffe1d7ff5f5d7576a9000f354487a09de44cd00000000"

//testing for assertions
describe('Bitcoin Transaction Decoding', () => {
    it('should correctly decode the version, inputs, outputs, and locktime', () => {
        const decodedTransaction = decodeBitcoinTransaction(sampleRawTransactionHex)
        assert.equal(decodedTransaction.version, 2, 'Version should be 2')
        assert.equal(decodedTransaction.ins.length, 1, 'Should have 1 input')
        const input = decodedTransaction.ins[0]
        assert.equal(input.witness.length, 1, 'Input should have 1 witness item')

        assert.equal(decodedTransaction.outs.length, 2, 'Should have 2 outputs')
        const output1 = decodedTransaction.outs[0]
        assert.equal(output1.value, 899990000, 'Output 1 value should be 899990000')

        assert.equal(decodedTransaction.locktime, 0, 'Locktime should be 0')
    });

    it('should correctly decode the witness data', () => {
        const decodedTransaction = decodeBitcoinTransaction(sampleRawTransactionHex)

        const input = decodedTransaction.ins[0]
        const witness = input.witness[0]
        assert.equal(witness.toString('hex'), '838a1f0f1ee607b54abf0a3f55792f6f8d09c3eb7a9fa46cd4976f2137ca2e3f4a901e314e1b827c3332d7e1865ffe1d7ff5f5d7576a9000f354487a09de44cd', 'Witness data does not match')
    })
})
