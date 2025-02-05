The following code snippet demonstrates an uncommon error in Firebase where a transaction is unexpectedly rejected due to a race condition between multiple clients attempting to update the same data simultaneously.  The issue arises because the transaction callback function does not correctly handle potential conflicts and doesn't include sufficient error handling.

```javascript
firebase.firestore().doc('path/to/doc').update({ counter: firebase.firestore.FieldValue.increment(1) })
.then(() => {
  console.log('Counter updated successfully!');
})
.catch((error) => {
  console.error('Error updating counter:', error);
});
```
This code works in many cases, but might fail silently under heavy load.