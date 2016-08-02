var URL_REGEX = /(https?:\/[-a-zA-Z0-9+&@#\/()%?=~_|!:,.;]*[-a-zA-Z0-9+&@#\/()%=~_|])/g;

function linkText(text, linkText) {
    var replaceValue = linkText ?
    '<a href="$1" target="_blank">' + linkText + '</a>' : '<a href="$1" target="_blank">$1</a>';
    return text.replace(URL_REGEX, replaceValue);
}

function getTeamCityVersion() {
    return document.querySelector('.greyNote').textContent.match(/\d+/)[0];
}

function waitForStackTraceAndLink(stackContainer) {
    var stackTraceWrapper = stackContainer.querySelector(".fullStacktrace");
    if (stackTraceWrapper && stackTraceWrapper.innerHTML) {
        var stackTrace = stackTraceWrapper.innerHTML;
        if (!stackTrace.includes('https://eyes.applitools.com')) {
            return;
        }

        stackTraceWrapper.innerHTML = linkText(stackTrace);
    } else {
        setTimeout(waitForStackTraceAndLink.bind(this, stackContainer), 500);
    }
}

function getProblemDescriptions() {
    var descriptionContainerSelector = getTeamCityVersion() >= 10 ? '.descriptionContainer' : '.problemDescription';
    var buildProblems = document.querySelector('#buildProblemsDl');

    return buildProblems.querySelectorAll(descriptionContainerSelector)
}

function linkBuildProblems() {
    var problemDescriptions = getProblemDescriptions();
    var numOfProblems = problemDescriptions.length;
    for (var i = 0; i < numOfProblems; i++) {
        var descriptionText = problemDescriptions[i].innerHTML;
        if (!descriptionText.includes('http')) {
            return;
        }

        problemDescriptions[i].innerHTML = linkText(descriptionText, 'link');
    }
}

function linkStackTrace() {
    var testLists = document.querySelector('#idfailedDl').querySelectorAll('.testList');
    var numOfTestLists = testLists.length;
    for (var currTestList = 0; currTestList < numOfTestLists; currTestList++) {
        var testsCollection = testLists[currTestList].rows;
        var testsArray = [].slice.call(testsCollection);
        var numOfTests = testsArray.length;
        for (var currTestTableRow = 0; currTestTableRow < numOfTests; currTestTableRow++) {
            var testWithDetailsWrapper = testsArray[currTestTableRow].querySelector('.testWithDetails');
            if (testWithDetailsWrapper && !testsArray[currTestTableRow].id) {
                testWithDetailsWrapper.click();
                testWithDetailsWrapper.click();
                waitForStackTraceAndLink(testsArray[currTestTableRow].nextSibling);
            } else if (testsArray[currTestTableRow].querySelector('.fullStacktrace')) {
                waitForStackTraceAndLink(testsArray[currTestTableRow]);
            }
        }
    }
}

linkBuildProblems();
linkStackTrace();




