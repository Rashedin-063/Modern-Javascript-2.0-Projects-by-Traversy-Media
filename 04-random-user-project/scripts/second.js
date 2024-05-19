function loadUser() {
  showSpinner(true);
  fetch('https://randomuser.me/api')
    .then(res => res.json())
    .then(data => displayUser(data));
}


function displayUser(data) {
  showSpinner(false);
  const users = data.results[0];

  const userDisplay = document.querySelector('#user')

  if (users.gender === 'male') {
     document.body.style.backgroundColor = 'steelblue';
  } else {
     document.body.style.backgroundColor = 'rebeccapurple';
  }

  userDisplay.innerHTML = `
  <div class="flex justify-between">
  <div class="flex">
    <img
      class="w-48 h-48 rounded-full mr-8"
      src="${users.picture.large}"
    />
    <div class="space-y-3">
      <p class="text-xl">
        <span class="font-bold">Name: </span>${users.name.first} ${users.name.last}
      </p>
      <p class="text-xl">
        <span class="font-bold">Email: </span> ${users.email}
      </p>
      <p class="text-xl">
        <span class="font-bold">Phone: </span> ${users.phone}
      </p>
      <p class="text-xl">
        <span class="font-bold">Location: </span> ${users.location.city} ${users.location.country}
      </p>
      <p class="text-xl"><span class="font-bold">Age: </span> ${users.dob.age}</p>
    </div>
  </div>
</div>
  `;
  
}

function showSpinner(isShowing) {
  isShowing
    ? document.querySelector('.spinner').classList.remove('hidden')
    : document.querySelector('.spinner').classList.add('hidden');
}

document.querySelector('#generate').addEventListener('click', loadUser);

loadUser()