document.addEventListener('DOMContentLoaded', function () {
    const movieSelector = document.getElementById('movieSelector');
    const seatLayout = document.getElementById('seatLayout');
    const selectedSeatsElement = document.getElementById('selectedSeats');
    const totalSeatsElement = document.getElementById('totalSeats');
    const movieTitle = document.getElementById('movieTitle');
    const posterImage = document.getElementById('posterImage');
    const submitButton = document.getElementById('submitBooking');
  
    const movies = {
      movie1: {
        title: "Zindagi Na Milegi Dobara",
        poster: "assets/Posters/1.jpeg", // Image for Movie 1
        seats: ["A1", "A2", "A3", "A4", "B1", "B2", "B3", "B4", "C1", "C2", "C3", "C4", "D1", "D2", "D3", "D4"]
      },
      movie2: {
        title: "Interstellar",
        poster: "assets/Posters/2.jpg", // Image for Movie 2
        seats: ["C1", "C2", "C3", "C4", "D1", "D2", "D3", "D4", "E1", "E2", "E3", "E4", "F1", "F2", "F3", "F4"]
      },
      movie3: {             
        title: "Dilwale Dulhania Le Jayenge",
        poster: "assets/Posters/ddlj_cover.jpeg", // Image for Movie 3
        seats: ["E1", "E2", "E3", "E4", "F1", "F2", "F3", "F4", "G1", "G2", "G3", "G4", "H1", "H2", "H3", "H4"]
      }
    };
  
    //Function to store the seats in internal storage 
    let selectedSeats = [];
  
    // Function to render seats based on selected movie
    function renderSeats(movie) {
      seatLayout.innerHTML = '';  // Clear the existing seats
  
      movie.seats.forEach(seat => {
        const seatElement = document.createElement('div');
        seatElement.classList.add('seat', 'w-12', 'h-12', 'bg-gray-300', 'rounded', 'cursor-pointer', 'flex', 'items-center', 'justify-center');
        seatElement.textContent = seat;
  
        // Add event listener to handle seat selection
        seatElement.addEventListener('click', () => selectSeat(seat, seatElement));
  
        seatLayout.appendChild(seatElement);
      });
    }
  
    // Function to handle seat selection and highlighting
    function selectSeat(seat, seatElement) {
      if (selectedSeats.includes(seat)) {
        // Deselect the seat if already selected
        selectedSeats = selectedSeats.filter(s => s !== seat);
        seatElement.classList.remove('bg-green-500');
      } else {
        // Select the seat and highlight it in green
        selectedSeats.push(seat);
        seatElement.classList.add('bg-green-500');
      }
  
      updateSeatInfo();
    }
  
    // Function to update the seat selection info
    function updateSeatInfo() {
      const pricePerSeat = 300;
      selectedSeatsElement.textContent = selectedSeats.length ? selectedSeats.join(', ') : 'None';
      totalSeatsElement.textContent = selectedSeats.length;
      document.getElementById('totalPrice').textContent = selectedSeats.length * pricePerSeat;
    }
    

    
    
    // Handle movie change
    movieSelector.addEventListener('change', function () {
      const selectedMovieKey = movieSelector.value;
      const selectedMovie = movies[selectedMovieKey];
  
      movieTitle.textContent = selectedMovie.title;
      posterImage.src = selectedMovie.poster;
      renderSeats(selectedMovie);
    });
  
    // Handle booking submission
    submitButton.addEventListener('click', function () {
      if (selectedSeats.length === 0) {
        alert("Please select at least one seat.");
        return;
      }
    
      const selectedMovieKey = movieSelector.value;
      const selectedMovie = movies[selectedMovieKey];
      const totalPrice = selectedSeats.length * 300;

 // Store booking details in localStorage for the payment page
 localStorage.setItem('selectedMovie', selectedMovie.title);
 localStorage.setItem('selectedSeats', JSON.stringify(selectedSeats));
 localStorage.setItem('totalPrice', totalPrice);


      //DEBUGGING
      console.log("Selected Movie:", selectedMovie.title);  // Debug
      console.log("Selected Seats:", selectedSeats);        // Debug
      console.log("Total Price:", totalPrice);              // Debug
    

     



    
      // Send selected seats and movie title to the backend
      fetch('http://localhost:5001/api/book-seats', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ movie: selectedMovie.title, seats: selectedSeats }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            alert(`Booking confirmed! Your selected seats: ${data.seats.join(", ")}\nTotal Price: ₹${data.totalPrice}`);
            // Redirect to the payment page
            window.location.href = '../public/Payments/gateway.html';

            


          }
        })
        .catch((error) => {
          console.error('Error:', error);
          alert('Error confirming booking.');
        });
    });
    
    // Initialize with the first movie
    renderSeats(movies.movie1);
  });
          