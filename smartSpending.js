function saveTransaction() {
    var amount = document.getElementById('amount').value;
    var desc = document.getElementById('desc').value;

    if (amount === "" || desc === "") {
        alert("Please enter both amount and description!");
        return;
    }

    var transaction = {
        amount: amount,
        description: desc,
        date: new Date().toLocaleString()
    };

    // Save to localStorage
    var transactions = JSON.parse(localStorage.getItem('transactions')) || [];
    transactions.push(transaction);
    localStorage.setItem('transactions', JSON.stringify(transactions));

    // Open PhonePe
    window.location.href = 'phonepe://';
}
