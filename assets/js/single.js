//reference to issues container
var issueContainerElem = document.querySelector("#issues-container");

function getRepoIssue(repo)
{
    var apiURL = "https://api.github.com/repos/" + repo + "/issues?direction=asc";
    fetch(apiURL).then(function(response){
        //request was successful
        if (response.ok){
            response.json().then(function(data){
                //pass response data to DOM function
                displayIssues(data);
            });
        }
        else
        {
            alert("There was a problem with your request.");
        }
    });
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



getRepoIssue("antellitocci/run-buddy");