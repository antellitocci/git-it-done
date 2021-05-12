//reference to issues container
var issueContainerElem = document.querySelector("#issues-container");
//reference over 30 warning container
var limitWarningElem = document.querySelector("#limit-warning");
//get repo name element
var repoNameElem = document.querySelector("#repo-name");

function getRepoName()
{
    //grab repo name from url query string
    var queryString = document.location.search;
    var repoName = queryString.split("=")[1];

    if(repoName)
    {
        //display repo name on the page
        getRepoIssue(repoName);
        repoNameElem.textContent = repoName;
    }
    else
    {
        //if no repo given, redirect to homepage
        document.location.replace("./index.html");
    }


};

function getRepoIssue(repo)
{
    var apiURL = "https://api.github.com/repos/" + repo + "/issues?direction=asc";
    fetch(apiURL).then(function(response){
        //request was successful
        if (response.ok){
            response.json().then(function(data){
                //pass response data to DOM function
                displayIssues(data);

                //check if api has paginated issues
                if(response.headers.get("Link"))
                {
                    displayWarning(repo);
                }
            });
        }
        else
        {
            //if not successful, redirect to homepage
            document.location.replace("./index.html");
        }
    });
};

function displayWarning(repo)
{
    //add text to the warning container
    limitWarningElem.textContent = "To see more than 30 issues, visit ";

    //create link content
    var linkElem = document.createElement("a");
    linkElem.textContent = "See More Issues on Github.com";
    linkElem.setAttribute("href", "https://github.com/" + repo + "/issues");
    linkElem.setAttribute("target", "_blank");

    //append to warning container
    limitWarningElem.appendChild(linkElem);
};

function displayIssues(issues)
{
    if(issues.length === 0)
    {
        issueContainerElem.textContent = "This repo has no open issues!";
        return;
    }

    for(var i =0; i < issues.length; i++)
    {
        //create a link element to take users to the issue on github
        var issueElem = document.createElement("a");
        issueElem.classList = "list-item flex-row justify-space-between align-center";
        issueElem.setAttribute("href", issues[i].html_url);
        issueElem.setAttribute("target", "_blank");

        //create a span to hold issue title
        var titleElem = document.createElement("span");
        titleElem.textContent= issues[i].title;

        //append to container
        issueElem.appendChild(titleElem);

        //create a type element
        var typeElem = document.createElement("span");

        //check if issues is an actual issue or pull request
        if (issues[i].pull_request)
        {
            typeElem.textContent = "(Pull Request)";
        }
        else
        {
            typeElem.textContent = "(Issue)";
        }

        //append to container
        issueElem.appendChild(typeElem);

        //append to issues container
        issueContainerElem.appendChild(issueElem);
    }
};

getRepoName();