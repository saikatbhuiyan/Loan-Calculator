// List for submit

document.getElementById('loan-form').addEventListener('submit', (e) => {
    // HIDE RESULTS
    document.getElementById('results').style.display = 'none';

    // SHOW LOADER
    document.getElementById('loading').style.display = 'block';

    setTimeout(calculate, 2000);

    e.preventDefault();
});

// Calculate Results 

function calculate(e) {

    const amount = document.getElementById('amount');
    const interest = document.getElementById('interest');
    const period = document.getElementById('years');

    const periodlyPayment = document.getElementById('monthly-payment');
    const totalPayment = document.getElementById('total-payment');
    const totalInterest = document.getElementById('total-interest');

    // Compute per period payment
    const p = parseFloat(amount.value);
    const calculateInterest = parseFloat(interest.value) / 100 / period.value;
    const pay = p * calculateInterest;
    const calculatePayment = 1 - (Math.pow((1 + calculateInterest), -(period.value)));

    const periodly = pay / calculatePayment;

    if (isFinite(periodly)) {
        periodlyPayment.value = periodly.toFixed(2);
        totalPayment.value = (periodly * period.value).toFixed(2);
        totalInterest.value = ((periodly * period.value) - p).toFixed(2);

        // SHOW RESULTS
        document.getElementById('results').style.display = 'block';

        // HIDE LOADER
        document.getElementById('loading').style.display = 'none';

    } else {
        showError('Please check your number!');

    }

    e.preventDefault();
}

// SHOW ERROR 
function showError(error) {

    // HIDE RESULTS
    document.getElementById('results').style.display = 'none';

    // Hide loder 
    document.getElementById('loading').style.display = 'none';



    // CREATE A DIV 
    const errorDiv = document.createElement('div');

    // Get elements
    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');

    // Add class 
    errorDiv.className = 'alert alert-danger';

    // CREATE TEXT NODE AND APPEND TO DIV
    errorDiv.appendChild(document.createTextNode(error));

    // Insert error above heading 
    card.insertBefore(errorDiv, heading);


    // CLEAR ERROR 

    setTimeout(clearError, 3000);
}

function clearError() {
    document.querySelector('.alert').remove();
}