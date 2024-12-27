document.addEventListener('DOMContentLoaded', function () {
  const totalAmount = localStorage.getItem('totalPrice') || '0';
  document.getElementById('totalAmount').textContent = `₹${totalAmount}`;

  const paymentForm = document.getElementById('paymentForm');
  
  paymentForm.addEventListener('submit', async function (e) {
    e.preventDefault();

    // Collect payment details
    const cardNumber = document.getElementById('cardNumber').value.trim();
    const expiryDate = document.getElementById('expiryDate').value.trim();
    const cvv = document.getElementById('cvv').value.trim();

    // Validate inputs
    if (cardNumber.length !== 16 || !/^\d+$/.test(cardNumber)) {
      alert('Invalid card number. Please enter a valid 16-digit card number.');
      return;
    }
    if (!/^\d{2}\/\d{2}$/.test(expiryDate)) {
      alert('Invalid expiry date format. Use MM/YY.');
      return;
    }
    if (cvv.length !== 3 || !/^\d+$/.test(cvv)) {
      alert('Invalid CVV. Please enter a valid 3-digit number.');
      return;
    }
// //FUNCTION TO SHOW NUMBER OF SEATS IN RELEVANT INFO ON THE TICKET PAGE
// document.addEventListener('DOMContentLoaded', function () {
//   // Retrieve data from localStorage
//   const movieName = localStorage.getItem('selectedMovie');
//   const seatList = JSON.parse(localStorage.getItem('selectedSeats')).join(', ');
//   const totalAmount = localStorage.getItem('totalPrice');

//   // Populate the payment form with the stored data
//   document.getElementById('movieName').textContent = movieName;
//   document.getElementById('seatList').textContent = seatList;
//   document.getElementById('totalAmount').textContent = totalAmount;
// });




    // Simulate API call
    try {
      const response = await fetch('http://localhost:5001/api/process-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ totalAmount, cardNumber, expiryDate, cvv }),
      });

      const result = await response.json();

      if (result.success) {
        alert('Payment Successful! Thank you for booking.');
        //localStorage.clear();
        window.location.href = 'confirmationpage.html'; // Redirect to confirmation page
      } else {
        alert(`Payment failed: ${result.message}`);
      }
    } catch (error) {
      console.error('Payment error:', error);
      alert('An error occurred while processing the payment. Please try again.');
    }
  });
});
