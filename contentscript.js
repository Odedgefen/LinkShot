var descriptions = document.getElementsByClassName("problemDescription")
var firstDesc = descriptions[0];
var descriptionText = firstDesc.innerHTML;
var link = descriptionText.match(/Screenshot link: (.*)/)[1]
var decodedLink = link.replace(/&amp;/g, '&');
var newSpanDescriptionText = descriptionText.replace(/Screenshot link: (.*)/, "Screenshot: ");
firstDesc.innerHTML = newSpanDescriptionText;

var a = document.createElement('a');
a.href = decodedLink;
a.innerHTML = "link";
firstDesc.appendChild(a);