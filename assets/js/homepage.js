var userFormElem = document.querySelector("#user-form");
var nameInputElem = document.querySelector("#username");
var repoContainerElem = document.querySelector("#repos-container");
var repoSearchTerm = document.querySelector("#repo-search-term");

var formSubmitHandler = function(event)
{
    event.preventDefault();
    var username = nameInputElem.value.trim();

    if(username){
        getUserRepos(username);
        nameInputElem.value ='';
    }
    else
    {
        alert("Please enter a GitHub username");
    }
};


var getUserRepos = function(user) 
{
    //format github api url
    var apiUrl = "https://api.github.com/users/" + user + "/repos";

    //make a request to the url
    fetch(apiUrl).then(function(response){
        response.json().then(function(data){
            console.log(data, user);
            displayRepos(data, user);
        });
    });
};

var displayRepos = function(repos, searchTerm)
{
    console.log(repos);
    console.log(searchTerm);

    //clear old content
    repoContainerElem.textContent="";
    repoSearchTerm.textContent = searchTerm;

    //loop over repos
    for (var i =0; i < repos.length; i ++)
    {
        //format repo name
        var repoName = repos[i].owner.login + "/" + repos[i].name;

        //create a container for each repo
        var repoElem = document.createElement("div");
        repoElem.classList = "list-item flex-row justify-space-between align-center";

        //create a span element to hold repository name
        var titleElem = document.createElement("span");
        titleElem.textContent = repoName;

        //append to container
        repoElem.appendChild(titleElem);

        //create a status element
        var statusElem = document.createElement("span");
        statusElem.classList = "flex-row align-center";

        //check if repo has issues or not
        if (repos[i].open_issues_count > 0)
        {
            statusElem.innerHTML = "<i class='fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + " issue(s)";
        }
        else
        {
            statusElem.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
        }

        //append to container
        repoElem.appendChild(statusElem);

        //append container to the dom
        repoContainerElem.appendChild(repoElem);
    }
};

userFormElem.addEventListener("submit", formSubmitHandler);