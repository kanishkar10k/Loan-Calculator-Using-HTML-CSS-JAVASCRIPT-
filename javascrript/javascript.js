document.addEventListener('DOMContentLoaded', function() {
    const loanAmountInput = document.getElementById('loan-amount');
    const interestRateInput = document.getElementById('interest-rate');
    const loanTermInput = document.getElementById('loan-term');
    const calculateButton = document.getElementById('calculate-button');
    const monthlyPaymentOutput = document.getElementById('monthly-payment');
    const totalInterestOutput = document.getElementById('total-interest');
    const totalAmountOutput = document.getElementById('total-amount');

    calculateButton.addEventListener('click', calculate);

    function calculate() {
        const loanAmount = parseFloat(loanAmountInput.value);
        const interestRate = parseFloat(interestRateInput.value);
        const loanTerm = parseInt(loanTermInput.value);

        if (isNaN(loanAmount) || isNaN(interestRate) || isNaN(loanTerm) || loanAmount <= 0 || interestRate <= 0 || loanTerm <= 0) {
            alert("Please enter valid numbers for loan amount, interest rate, and loan term. Values must be greater than zero.");
            return;
        }

        const monthlyInterestRate = interestRate / 100 / 12;
        const loanTermInMonths = loanTerm * 12;

        // Avoid division by zero in case the interest rate is zero
        const monthlyPayment = monthlyInterestRate === 0
            ? loanAmount / loanTermInMonths
            : loanAmount * monthlyInterestRate * (1 + monthlyInterestRate) ** loanTermInMonths / ((1 + monthlyInterestRate) ** loanTermInMonths - 1);

        const totalInterest = monthlyPayment * loanTermInMonths - loanAmount;
        const totalAmount = monthlyPayment * loanTermInMonths;

        // Update output elements with formatted results
        monthlyPaymentOutput.textContent = `Monthly Payment: ${monthlyPayment.toFixed(2).toLocaleString()}`;
        totalInterestOutput.textContent = `Total Interest Paid: ${totalInterest.toFixed(2).toLocaleString()}`;
        totalAmountOutput.textContent = `Total Amount Paid: ${totalAmount.toFixed(2).toLocaleString()}`;
    }
});
