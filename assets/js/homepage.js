var getUserRepos = function () {
    fetch("https://api.github.com/users/octocat/repos").then(function (response) {
response.json().then(function(data) {
    });
});
}
    console.log("outside");

var response = fetch("http://api.github.com/users/octocat/repos");
console.log(response);

getUserRepos(); 


