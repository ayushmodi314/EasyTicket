// // document.getElementById('bookNow').addEventListener('click', () => {
// //   alert('Redirecting to the booking page...');
// // });
// //COMMENTED OUT NOTIFICATION NOT REQUIRED

// document.getElementById('bookNow').addEventListener('click', () => {
//   document.getElementById('moviemenu').scrollIntoView({ behavior: 'smooth' });
// });
// const movieCards = document.querySelectorAll('.movie-card');
// movieCards.forEach(card => {
//   card.querySelector('.btn').addEventListener('click', () => {
//     // Redirect to the seating page (seating.html)
//     window.location.href = 'Seating/seating.html';
//   });
// });


// // const movieCards = document.querySelectorAll('.movie-card');
// // movieCards.forEach(card => {
// //   card.querySelector('.btn').addEventListener('click', () => {
// //     alert('Booking your ticket...');
// //   });
// // });

// //  document.addEventListener('DOMContentLoaded', () => {
// //   const ctx = document.getElementById('myChart').getContext('2d');
// //   new Chart(ctx, {
// //     type: 'bar',
// //     data: {
// //       labels: ['Jan', 'Feb', 'Mar', 'Apr'],
// //       datasets: [{
// //         label: 'Monthly Sales',
// //         data: [120, 190, 75, 95],
// //         backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
// //         borderColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
// //         borderWidth: 1
// //       }]
// //     },
// //     options: {
// //       responsive: true,
// //       scales: {
// //         y: { beginAtZero: true }
// //       }
// //     }
// //   });
// // });

// // Guest login handling
// document.getElementById('guestLoginBtn').addEventListener('click', () => {
//   alert('Logged in as Guest');
//   window.location.href = 'index.html'; // Redirect to the homepage
// });

// // WebSocket Notifications
// const socket = io('http://localhost:5001');
// socket.on('notification', message => {
//   const notifContainer = document.querySelector('.notifications');
//   if (notifContainer) {
//     const notifElement = document.createElement('div');
//     notifElement.textContent = message;
//     notifElement.className = 'notification bg-blue-500 text-white p-4 rounded shadow-lg mt-4';
//     notifContainer.appendChild(notifElement);

//     setTimeout(() => {
//       notifElement.remove();
//     }, 5000);
//   }
// });

// ///////////////////////////////////////////////////////////////////////////

document.addEventListener('DOMContentLoaded', () => {
  // Scroll to moviemenu section on 'Book Now' button click
  document.getElementById('bookNow').addEventListener('click', () => {
    document.getElementById('moviemenu').scrollIntoView({ behavior: 'smooth' });
  });

  // Redirect to seating page when movie card button is clicked
  const movieCards = document.querySelectorAll('.movie-card');
  movieCards.forEach(card => {
    card.querySelector('.btn').addEventListener('click', () => {
      window.location.href = '../Seating/seating.html';  // Update path as needed
    });
  });

  // // Guest login handling
  // document.getElementById('guestLoginBtn').addEventListener('click', () => {
  //   alert('Logged in as Guest');
  //   window.location.href = 'index.html';  // Redirect to the homepage
  // });

  // WebSocket Notifications
  const socket = io('http://localhost:5001');
  socket.on('notification', message => {
    const notifContainer = document.querySelector('.notifications');
    if (notifContainer) {
      const notifElement = document.createElement('div');
      notifElement.textContent = message;
      notifElement.className = 'notification bg-blue-500 text-white p-4 rounded shadow-lg mt-4';
      notifContainer.appendChild(notifElement);

      setTimeout(() => {
        notifElement.remove();
      }, 5000);
    }
  });
});

