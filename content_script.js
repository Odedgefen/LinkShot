var linkRegex =/(.*)(https?:\/[-a-zA-Z0-9+&@#\/()%?=~_|!:,.;]*[-a-zA-Z0-9+&@#\/()%=~_|])((.|\n)*)/;

var appendLinkToDescription = function (description, href, linkText) {
    var a = document.createElement('a');
    a.href = href;
    a.target = "_blank";
    a.innerHTML = linkText;
    description.appendChild(a);
};

var appendSpanWithInnerText = function (parent, text) {
    var span = document.createElement('span');
    span.innerHTML = text;
    parent.appendChild(span);
};

var extractDecodedLinkFromString = function (str) {
    var link = str.match(linkRegex)[2];
    return link.replace(/&amp;/g, '&');
};

var waitForStackTraceAndLink = function (testLink) {
    var stackTrace = testLink.nextSibling.getElementsByClassName("fullStacktrace")[0];
    if (stackTrace && stackTrace.innerHTML) {
        var stack = stackTrace.innerHTML;
        if (stack.indexOf("applitools") == -1) {
            return;
        }

        var beforeURL = stack.match(linkRegex)[1];
        var decodedLink = extractDecodedLinkFromString(stack);
        var afterUrl = stack.match(linkRegex)[3];
        stackTrace.innerHTML = "";
        appendSpanWithInnerText(stackTrace, beforeURL);
        appendLinkToDescription(stackTrace, decodedLink, decodedLink);
        appendSpanWithInnerText(stackTrace, afterUrl);
    } else {
        setTimeout(waitForStackTraceAndLink, 500, testLink);
    }
};

var linkBuildProblems = function () {
    var expandCollapseContainer = document.getElementsByClassName("expandCollapseContainer")[0];
    if (!expandCollapseContainer) {
        return;
    }
    var buildScriptProblemsWrapper = expandCollapseContainer.children[0];
    var problemDescriptions = buildScriptProblemsWrapper.getElementsByClassName("problemDescription");
    var numOfProblems = problemDescriptions.length;
    for (var i = 0; i < numOfProblems; i++) {
        var descriptionText = problemDescriptions[i].innerHTML;
        var decodedLink = extractDecodedLinkFromString(descriptionText);
        problemDescriptions[i].innerHTML = descriptionText.match(linkRegex)[1];
        appendLinkToDescription(problemDescriptions[i], decodedLink, "link");
    }
};

var linkStackTraceLinks = function () {
    var testsCollection = document.getElementsByClassName("testList")[0].rows;
    var tests = [].slice.call(testsCollection);
    var numOfTests = tests.length;
    for (var i = 0; i < numOfTests; i++) {
        var testLink = tests[i].getElementsByClassName("testWithDetails")[0];
        testLink.click();
        testLink.click();
        waitForStackTraceAndLink(tests[i]);
    }
};

linkBuildProblems();
linkStackTraceLinks();




