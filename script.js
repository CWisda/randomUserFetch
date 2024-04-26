function getUserData(userCount = 1) {
    fetch(`https://randomuser.me/api/?results=${userCount}`)
    .then((response) => {
        return response.json();
        //converting the responses body from JSON in JS object
    })
    .then((data) => {
        console.log(data);
        clearUsers();
        //sort users by last name 
        const sortedUsers = data.results.toSorted((a, b) => {
            if (a.name.last < b.name.last) {
                return -1;
            } else if (a.name.last > b.name.last) {
                return 1;
            }
            return 0;
        });

        for (let i = 0; i < sortedUsers.length; i++) {
        displayUser(sortedUsers[i]);
        }
    })
    .catch(console.error)
}

const usersCountInput = document.getElementById("usersCount");
usersCountInput.addEventListener("mouseup", (event) => {
    console.log(event.target.value);
    getUserData(event.target.value);
});

function clearUsers() {
    const divs = document.getElementsByClassName("userContainer")
    console.log(divs);
    const upperBound = divs.length;
    for (let i = 0; i < upperBound; i++) {
        console.log(divs[0]);
        divs[i].remove();
    }

    // for (const div of divs) {
    //     console.log(div);
    //     div.remove();
    //}
}

//getUserData();

/**
 * Parses the user object and displays it on the DOM
 * @param {*Object} userData One user's data object
 */
function displayUser(userData) {
    const picture = userData.picture.large
    const name = userData.name.title + " " + userData.name.first + " " + userData.name.last;
    //const city = userData.location.city;
    //const country = userData.location.country;
    //Destructuring ---- see below -- combined the previous 2 lines
    const { city, country } = userData.location;
    const email = userData.email;

    //DOM Manipulation Steps:
    // create all the element
    const userContainer = document.createElement("userContainer");
    const avatarImg = document.createElement("img");
    const namePara = document.createElement("p");
    const cityPara = document.createElement("p");
    const countryPara = document.createElement("p");
    const emailPara = document.createElement("p");


    //modify allthe elements
    userContainer.classList.add("userContainer");
    avatarImg.src = picture;
    avatarImg.alt = name;
    namePara.textContent = name; 
    cityPara.textContent = city;
    countryPara.textContent = country;
    emailPara.textContent = email;

    // append all the elements
    userContainer.append(avatarImg, namePara, cityPara, countryPara, emailPara);
    const userBox = document.getElementById("userBox");
    userBox.append(userContainer);

}

