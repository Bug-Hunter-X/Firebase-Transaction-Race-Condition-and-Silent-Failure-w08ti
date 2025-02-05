The improved code below uses a transaction to ensure atomicity and includes robust error handling to prevent silent failures.
```javascript
function incrementCounter() {
  firebase.firestore().runTransaction(transaction => {
    return transaction.get(firebase.firestore().doc('path/to/doc'))
    .then(doc => {
      if (!doc.exists) {
        throw new Error('Document does not exist!');
      }
      const newCounter = doc.data().counter + 1;
      transaction.update(firebase.firestore().doc('path/to/doc'), { counter: newCounter });
      return newCounter;
    });
  })
  .then(newCounter => {
    console.log('Counter updated successfully:', newCounter);
  })
  .catch(error => {
    console.error('Error updating counter:', error);
    // Optionally retry the transaction
  });
}
```
This version handles potential errors, including the absence of the document, and logs informative messages for debugging purposes.