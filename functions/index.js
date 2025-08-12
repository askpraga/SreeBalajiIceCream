const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

exports.onTransactionCreated = functions.firestore.document('transactions/{txId}').onCreate(async (snap, ctx) => {
  const tx = snap.data();
  console.log('Transaction created', tx);
  return null;
});
