var linkRegex =/(.*)(https?:\/\/(?:www\.|(?!www))[^\s\.]+\.[^\s]{2,}|www\.[^\s]+\.[^\s]{2,})/;

var appendLinkToDescription = function (description, link) {
    var a = document.createElement('a');
    a.href = link;
    a.target = "_blank";
    a.innerHTML = "link";
    description.appendChild(a);
};

var extractDecodedLinkFromString = function (str) {
    var link = str.match(linkRegex)[2];
    return link.replace(/&amp;/g, '&');
};

var linkBuildProblems = function () {
    var buildScriptProblemsWrapper = document.getElementsByClassName("expandCollapseContainer")[0].children[0];
    var problemDescriptions = buildScriptProblemsWrapper.getElementsByClassName("problemDescription");
    var numOfProblems = problemDescriptions.length;
    for (var i = 0; i < numOfProblems; i++) {
        var descriptionText = problemDescriptions[i].innerHTML;
        var decodedLink = extractDecodedLinkFromString(descriptionText);
        problemDescriptions[i].innerHTML = descriptionText.match(linkRegex)[1];
        appendLinkToDescription(problemDescriptions[i], decodedLink);
    }
};

linkBuildProblems();




