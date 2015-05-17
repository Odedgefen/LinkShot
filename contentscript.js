var linkRegex = /Screenshot link: (.*)/;

var appendLinkToDescription = function (description, link) {
    var a = document.createElement('a');
    a.href = link;
    a.target = "_blank";
    a.innerHTML = "link";
    description.appendChild(a);
};

var buildScriptProblemsWrapper = document.getElementsByClassName("expandCollapseContainer")[0].children[0];
var problemDescriptions = buildScriptProblemsWrapper.getElementsByClassName("problemDescription");
var arrayLength = problemDescriptions.length;
for (var i = 0; i < arrayLength; i++) {
    var description = problemDescriptions[i];
    var descriptionText = description.innerHTML;
    var link = descriptionText.match(linkRegex)[1];
    var decodedLink = link.replace(/&amp;/g, '&');
    description.innerHTML = descriptionText.replace(linkRegex, "Screenshot: ");
    appendLinkToDescription(description, decodedLink);
}




