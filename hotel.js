// hotel.js

const bookedRooms = []; // to track booked dates

function showLoader() {
  const loader = document.getElementById('loader');
  loader.style.display = 'flex';
  setTimeout(() => {
    loader.style.display = 'none';
  }, 850);
}

function checkAvailability(event) {
  event.preventDefault();
  const name = document.getElementById('name').value;
  const room = document.getElementById('room-type').value;
  const checkin = document.getElementById('checkin').value;
  const checkout = document.getElementById('checkout').value;
  const city = document.getElementById('city').value;
  const hotel = document.getElementById('hotel').value;
  const key = `${hotel}_${room}_${checkin}_${checkout}`;

  if (bookedRooms.includes(key)) {
    alert("Room already booked for these dates. Please select another.");
    return;
  }

  bookedRooms.push(key);
  const result = `
    <p><strong>Thank you, ${name}!</strong></p>
    <p>Your ${room} room at <strong>${hotel}</strong>, ${city} is being booked from ${checkin} to ${checkout}.</p>
  `;
  document.getElementById('booking-result').innerHTML = result;
}

function showMoreReviews() {
  const moreReviews = [
    { name: "Suleman", text: "Loved the service and the location. Very convenient and peaceful." },
    { name: "Razzaq", text: "Impressed with cleanliness and helpful staff. Good value for money." },
    { name: "Karthik", text: "Had a smooth check-in and comfortable stay. Highly recommend." },
    { name: "Anirudh", text: "Great experience, the food was delicious too!" },
    { name: "Ved", text: "Family-friendly hotel with great amenities. My kids loved it!" },
    { name: "Rama Krishna", text: "I've stayed at many hotels, but StayEase feels like home." },
    { name: "Adith", text: "Exceptional service and neat rooms. Worth every rupee." },
    { name: "Malik", text: "Affordable luxury. You get more than what you pay for." },
  ];

  const container = document.getElementById("more-reviews");
  moreReviews.forEach(review => {
    const box = document.createElement("div");
    box.className = "review-box";
    box.innerHTML = `<p>"${review.text}"</p><h4>- ${review.name}</h4>`;
    container.appendChild(box);
  });

  container.style.display = "block";
  event.target.style.display = "none";
}

const hotelOptions = {
  Hyderabad: ["Pearl Residency", "Charminar Palace", "Banjara Retreat"],
  Delhi: ["Red Fort Inn", "Capital Comfort", "Connaught Royale"],
  Mumbai: ["Marine View Hotel", "Gateway Residency", "Bollywood Stay"],
  Bangalore: ["Silicon Suites", "Gardenia Grand", "Cubbon Comfort"]
};

function updateHotels() {
  const city = document.getElementById("city").value;
  const hotelSelect = document.getElementById("hotel");
  hotelSelect.innerHTML = '<option value="">Select Hotel</option>';

  if (hotelOptions[city]) {
    hotelOptions[city].forEach(hotel => {
      const option = document.createElement("option");
      option.value = hotel;
      option.textContent = hotel;
      hotelSelect.appendChild(option);
    });
  }
}

function toggleProfilePopup() {
  const popup = document.getElementById("profile-popup");
  const profileData = JSON.parse(localStorage.getItem("userProfile"));
  const main = document.querySelector(".main-content");

  if (profileData) {
    document.getElementById("form-title").innerText = `Hi, ${profileData.name}`;
    document.querySelector('#popup-name').style.display = 'none';
    document.querySelector('#popup-email').style.display = 'none';
    document.querySelector('#popup-photo').style.display = 'none';
    document.getElementById('profile-pic-label').style.display = 'none';
    document.querySelector('#submit-btn').style.display = 'none';
    document.querySelector('#logout-btn').style.display = 'inline-block';
  } else {
    document.getElementById("form-title").innerText = "Login / Signup";
    document.querySelector('#popup-name').style.display = 'inline-block';
    document.querySelector('#popup-email').style.display = 'inline-block';
    document.querySelector('#popup-photo').style.display = 'inline-block';
    document.getElementById('profile-pic-label').style.display = 'inline-block';
    document.querySelector('#submit-btn').style.display = 'inline-block';
    document.querySelector('#logout-btn').style.display = 'none';
  }

  if (popup.style.display === "block") {
    popup.style.display = "none";
    document.body.classList.remove("blur-bg");
  } else {
    popup.style.display = "block";
    document.body.classList.add("blur-bg");
  }
}

function saveProfile() {
  const name = document.getElementById("popup-name").value;
  const email = document.getElementById("popup-email").value;
  const photo = document.getElementById("popup-photo").files[0];

  if (!name || !email) {
    alert("Please fill in all required fields.");
    return;
  }

  const reader = new FileReader();
  reader.onload = function () {
    const profile = {
      name,
      email,
      photo: reader.result
    };
    localStorage.setItem("userProfile", JSON.stringify(profile));
    updateProfileUI();
    toggleProfilePopup();
  };
  if (photo) {
    reader.readAsDataURL(photo);
  } else {
    const profile = { name, email, photo: "" };
    localStorage.setItem("userProfile", JSON.stringify(profile));
    updateProfileUI();
    toggleProfilePopup();
  }
}

function updateProfileUI() {
  const profileData = JSON.parse(localStorage.getItem("userProfile"));
  const icon = document.querySelector(".profile-button");

  if (profileData) {
    icon.innerHTML = profileData.photo
      ? `<img src="${profileData.photo}" style="width: 40px; height: 40px; border-radius: 50%;" title="${profileData.name}" />`
      : `<i class="fas fa-user-circle fa-2x" title="${profileData.name}"></i>`;
  } else {
    icon.innerHTML = '<i class="fas fa-user-circle fa-2x"></i>';
  }
}

function logout() {
  localStorage.removeItem("userProfile");
  updateProfileUI();
  const popup = document.getElementById("profile-popup");
  popup.style.display = "none";
  document.body.classList.remove("blur-bg");
}

window.onload = () => {
  updateProfileUI();
};
