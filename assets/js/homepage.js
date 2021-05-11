var userFormElem = document.querySelector("#user-form");
var nameInputElem = document.querySelector("#username");

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
            console.log(data);
        });
    });
};

userFormElem.addEventListener("submit", formSubmitHandler);