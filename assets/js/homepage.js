var repoContainerEl = document.querySelector("#repos-container");
var repoSearchTerm = document.querySelector("#repo-search-term");
var languageButtonsEl= document.querySelector("#language-buttons");

var getUserRepos = function (user) {
  //format the github api url
  var apiUrl = "https://api.github.com/users/" + user + "/repos";
  //make a request to the url
  fetch(apiUrl)
    .then(function (response) {
      //request was successful
      if (response.ok) {
        response.json().then(function (data) {
          displayRepos(data, user);
        });
      } else {
        alert("error: " + response.statusText);
      }
    })
    .catch(function (error) {
      //notice this '.catch() getting chained onto the end of the '.then()' method
      alert("Unable to connnect to GitHub");
    });
};

var userFormEl = document.querySelector("#user-form");
var nameInputEl = document.querySelector("#username");

var formSubmitHandler = function (event) {
  event.preventDefault();
  //get value from input element
  var username = nameInputEl.value.trim();
  if (username) {
    getUserRepos(username);
    //below clears the textarea/form after the submititng
    nameInputEl.value = "";
  } else {
    alert("Please enter a GitHub username");
  }
};

userFormEl.addEventListener("submit", formSubmitHandler);

var displayRepos = function (repos, searchTerm) {
  //clear content
  repoContainerEl.textContent = "";
  repoSearchTerm.textContent = searchTerm;

  //   console.log(repos);
  //   console.log(searchTerm);
  //loop over repos
  for (var i = 0; i < repos.length; i++) {
    //format repo name
    var repoName = repos[i].owner.login + "/" + repos[i].name;

    //create a container for each repo
    var repoEl = document.createElement("a");
    repoEl.classList = "list-item flex-row justify-space-between align-center";
    repoEl.setAttribute("href", "./single-repo.html?repo=" + repoName);

    //create a span element to hold repository name
    var titleEl = document.createElement("span");
    titleEl.textContent = repoName;

    var statusEl = document.createElement("span");
    statusEl.classList = "flex-row align-center";

    //check if current repo has issues or not
    if (repos[i].open_issues_count > 0) {
      statusEl.innerHTML =
        "<i class = 'fas fa-times status-icon icon-danger'></i>" +
        repos[i].open_issues_count +
        "issue(s)";
    } else {
      statusEl.innerHTML =
        "<i class = 'fas fa-check-square status-icon icon-success'></i> ";
    }

    //append to container
    repoEl.appendChild(titleEl);
    //append to container
    repoEl.appendChild(statusEl);
    //append container to the DOM
    repoContainerEl.appendChild(repoEl);
  }
};

var getFeaturedRepos = function (language) {
  var apiUrl = "https://api.github.com/search/repositories?q=" + language + "+is:featured&sort=help-wanted-issues";
  fetch(apiUrl).then(function (response) {
    if (response.ok) {
      //we need to use a method to extract the json from the response, to parse the response and log the data to the console.
      response.json().then(function(data){
      //but now we can dispaly it instead of console.log it 
        displayRepos(data.items, language)  
       });
    } else {
      alert("Error: " + response.statusText);
    }
  });
}

var buttonClickHandler= function(event){
  var language = event.target.getAttribute("data-language")
  if(language) {
    getFeaturedRepos(language);

    //clear old content
    repoContainerEl.textContent = "";
  }
  console.log(language)
}
languageButtonsEl.addEventListener("click", buttonClickHandler);