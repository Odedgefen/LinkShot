var buildScriptProblemsWrapper = document.getElementsByClassName("expandCollapseContainer")[0].children[0];
var problemDescriptions = buildScriptProblemsWrapper.getElementsByClassName("problemDescription");

var arrayLength = problemDescriptions.length;
for (var i = 0; i < arrayLength; i++) {
    var description = problemDescriptions[i];
    var descriptionText = description.innerHTML;
    var link = descriptionText.match(/Screenshot link: (.*)/)[1];
    var decodedLink = link.replace(/&amp;/g, '&');
    description.innerHTML = descriptionText.replace(/Screenshot link: (.*)/, "Screenshot: ");
    var a = document.createElement('a');
    a.target="_blank";
    a.href = decodedLink;
    a.innerHTML = "link";
    description.appendChild(a);
}


