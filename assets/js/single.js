var issueContainerEl = document.querySelector("#issues-container");
var limitWarningEl = document.querySelector("#limit-warning");
var repoNameEl = document.querySelector("#repo-name");

var getRepoIssues = function (repo) {
    var apiUrl = "https://api.github.com/repos/" + repo + "/issues?direction=asc";
    fetch(apiUrl).then(function (response) {
        //request was sucessful
        if (response.ok) {
            response.json().then(function (data) {
                // console.log(data);
                //pass response data to dom function
                displayIssues(data);

                //check if api has paginated issues
                if (response.headers.get("link")) {
                    displayWarning(repo)
                }
            });
        } else {
            // alert("There was a problem with your request!");
            //if not successful,r edirect to homepage
            document.location.replace("./index.html");
        }
    });
};

var getRepoName = function () {
    //grab repo name from url  query string
    var queryString = document.location.search;
    //by spliitng on the = you'll end up with an array with two elements. 
    var repoName = queryString.split("=")[1];
    
    if (repoName) {
        //display repo name on the page
        repoNameEl.textContent = repoName;
        getRepoIssues(repoName);

    }else {
        //if no repo was given, redirect to the homepage 
        document.location.replace("./index.html");
    }
};
getRepoName()


// getRepoIssues("facebook/react");

var displayIssues = function (issues) {
    if (issues.length === 0) {
        issueContainerEl.textContent = " This repo has no open issues!";
        return;
    }
    //need to  append <a> to the actual page, first created a reference then append
    for (var i = 0; i < issues.length; i++) {
        // create a link element to take users to the issue on github
        var issueEl = document.createElement("a");
        issueEl.classList = "list-item flex-row justify-space-between align-center";
        issueEl.setAttribute("href", issues[i].html_url);
        issueEl.setAttribute("target", "_blank");

        //added target= _blank attri to each <a> element, to open the link in a new tab instead of replacing the current webpage.

        // create span to hold issue title
        var titleEl = document.createElement("span");
        titleEl.textContent = issues[i].title;

        // append to container
        issueEl.appendChild(titleEl);

        // create a type element
        var typeEl = document.createElement("span");

        // check if issue is an actual issue or a pull request
        if (issues[i].pull_request) {
            typeEl.textContent = "(Pull request)";
        } else {
            typeEl.textContent = "(Issue)";
        }

        // append to container
        issueEl.appendChild(typeEl);
        issueEl.appendChild(titleEl);

        //append to container
        issueContainerEl.appendChild(issueEl);
    }
};

var displayWarning= function(repo) {
    //add text to warning container
    limitWarningEl.textContent ="To see more than 30 issues, visit ";
    var linkEl = document.createElement("a");
    linkEl.textContent = "See More Issues on GitHub.com";
    linkEl.setAttribute("href","https://github.com/" + repo + "/issues");

    //append to warning container
    limitWarningEl.appendChild(linkEl);
};
