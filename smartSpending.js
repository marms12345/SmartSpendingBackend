function saveTransaction() {
    var amount = document.getElementById('amount').value;
    var desc = document.getElementById('desc').value;

    if (amount === "" || desc === "") {
        alert("Please enter both amount and description!");
        return;
    }

    // Retrieve the last transaction number from localStorage, or start from 1 if none exists
    var lastTransactionNumber = localStorage.getItem('lastTransactionNumber') || 0;

    // Increment the transaction number
    var transactionNumber = parseInt(lastTransactionNumber) + 1;

    // Ensure the transaction number is within the range of 1 to 1000
    if (transactionNumber > 1000) {
        alert("Transaction limit reached. No more transactions can be processed.");
        return;
    }

    // Format the transaction number to always show 4 digits (e.g., 0001, 0002, ...)
    var formattedTransactionNumber = transactionNumber.toString().padStart(4, '0');

    var transaction = {
        amount: amount,
        description: desc,
        transactionNumber: formattedTransactionNumber,
        date: new Date().toLocaleString()
    };

    localStorage.setItem('lastTransaction', JSON.stringify(transaction));


    // Save to localStorage
    var transactions = JSON.parse(localStorage.getItem('transactions')) || [];
    transactions.push(transaction);
    localStorage.setItem('transactions', JSON.stringify(transactions));

    // Update the last transaction number in localStorage
    localStorage.setItem('lastTransactionNumber', formattedTransactionNumber);

    // Show transaction details
    document.getElementById('transactionNumber').innerText = formattedTransactionNumber;
    document.getElementById('transactionDesc').innerText = desc;
    document.getElementById('transactionAmount').innerText = amount;

    // Display the transaction details section
    document.getElementById('transactionDetails').style.display = 'block';

    // Optionally simulate a payment (if you don't want this, you can remove this line)
    // window.location.href = 'upi://pay?pa=9182523900@ybl&pn=Ryali.swamy naidu&am=' + amount + '&cu=INR';
}


window.onload = function () {
    const lastTxn = JSON.parse(localStorage.getItem('lastTransaction'));
    if (lastTxn) {
        document.getElementById('transactionNumber').innerText = lastTxn.transactionNumber;
        document.getElementById('transactionDesc').innerText = lastTxn.description;
        document.getElementById('transactionAmount').innerText = lastTxn.amount;
        document.getElementById('transactionDetails').style.display = 'block';
    }
};

