const github = new Github();

const SearchBar = document.querySelector("#searchUser");
SearchBar.focus();
SearchBar.addEventListener("keyup", (e) => {
    const userInput = e.target.value;
    if (userInput !== "") {
        github.getUsers(userInput).then((data) => {
            if (data.profile.message === "Not Found") {
                showAlert("error danger", "User not found");
            } else {
                // display user
                showUser(data.profile);
                showRepos(data.repos);
            }
        });
    } else {
        // clear profile
        clearProfile();
        // clearRepo();
    }
});

function showUser(user) {
    const UiProfile = document.querySelector("#profile");
    UiProfile.innerHTML = `
                     <div id="info">
                    <div class="profile-pic">
                        <img src="${user.avatar_url}" alt="" srcset="" />
                        
                        <a href="${user.html_url}" class="view-profile blue" target='_blank'>View Profile</a>
                    </div>
                    <div class="details">
                        <div class="public-sees">
                            <span class="public-repos blue">Public Repos: ${user.public_repos}</span>
                            <span class="public-gists grey">Public Gists: ${user.public_gists}</span>
                            <span class="followers green">Followers: ${user.followers}</span>
                            <span class="following blueviolet">Following:${user.following}</span>
                        </div>
                        <ul class="collection">
                            <li>Bio: ${user.bio}</li>
                            <li>Company: ${user.company}</li>
                            <li>Website/blog: ${user.blog}</li>
                            <li>Email: ${user.email}</li>
                            <li>Location: ${user.location}</li>
                            <li>Member since: ${user.created_at}</li>
                        </ul>
                    </div>
                </div>
                
                    `;
}

function showRepos(repos) {
    let output = "";
    repos.forEach(function(repo) {
        output += `
         <ul class="repo-collection">
                    <li>
                        <a href="${repo.html_url}" target='_blank'>${repo.name}</a>
                        <div class="repo-desc">
                            <span class="star blue">Stars: ${repo.stargazers_count}</span>
                            <span class="watchers grey">watchers: ${repo.watchers_count}</span>
                            <span class="forks green">Forks:${repo.forks_count}</span>
                        </div>
                    </li>
                   
                </ul>
        `;
    });
    document.querySelector("#repos").innerHTML = output;
}

function clearProfile() {
    document.querySelector("#profile").innerHTML = "";
}

// function clearRepo() {
//     document.querySelector("#repo").innerHTML = "";
// }

function showAlert(error, message) {
    this.clearAlert();
    const div = document.createElement("div");
    div.className = error;
    div.appendChild(document.createTextNode(message));
    const parent = document.querySelector(".searchContainer");
    const before = document.querySelector(".search");
    parent.insertBefore(div, before);
    // Timeout after 3 sec
    setTimeout(() => {
        this.clearAlert();
    }, 3000);
}

function clearAlert() {
    const currentAlert = document.querySelector(".error");

    if (currentAlert) {
        currentAlert.remove();
    }
}