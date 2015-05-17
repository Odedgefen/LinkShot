var descriptions = document.getElementsByClassName("problemDescription");

var arrayLength = descriptions.length;
for (var i = 0; i < arrayLength - 1; i++) {
    var description = descriptions[i];
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


