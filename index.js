"use strict";
var gitHubBaseURL = "https://api.github.com";

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const logger = function(func) {
  console.log(func.name, " is running!");
};

const copyrightListner = function() {
  logger(copyrightListner);
  $(".github-button").on("click", function(e) {
    e.preventDefault();
    console.log("click");
    window.open("https://trevjnels.github.io/portfolio/", "_blank");
  });
};
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

const pageRender = function() {
  logger(pageRender);
  $(".one").html(`<h1 class="title">Github Repo Lister</h1>`);
  $(".three")
    .html(`  <form class="searchform" for="searching applicant's repo info">
      <input focus class="search-input" placeholder="input github handle">
      </input>
      <button type="submit" class="submit-button">Search
      </button>
    </form>`);
};

const listRender = function(repoArray, userName) {
  logger(listRender);

  // console.log(repoArray[0].url);
  var name = "";
  var url = "";
  $(".four").append(`<h2 class="output-title">${userName}'s repoList:</h2>`);
  $(".four").append(`<ol class="output"></ol>`);
  repoArray.forEach(function(repo) {
    name = repo.name;
    url = repo.url;
    $(".output").append(
      `<li>${name} <a href="${url}"class="repoButton">github</a>`
    );
  });
};

const gitHubCaller = function(userName) {
  logger(gitHubCaller);
  var repoArray = [];
  fetch(`${gitHubBaseURL}/users/${userName}/repos`)
    .then(function(response) {
      if (response.status === 404) {
        $(".four").html(`<h2>USER DOES NOT EXIST</h2>`);
        return;
      } else if (response.status === 403) {
        $(".four").html(`<h2>GitHubAPI unauthenticated</h2>`);
      } else {
        return response;
      }
    })
    .then(response => response.json())
    .then(responseJson => listRender(responseJson, userName))
    .catch(e => console.log(e));
};

const searchListner = function() {
  $(document).on("click", ".submit-button", function(event) {
    event.preventDefault();
    $(".four").html("");
    var githubUser = $(".search-input").val();
    gitHubCaller(githubUser);
    $(".searchform").each(function() {
      this.reset();
    });
  });
};

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

const autoRunner = function() {
  logger(autoRunner);
  $(copyrightListner);
  $(searchListner);
  $(pageRender);
};
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

$(document).ready(autoRunner());
