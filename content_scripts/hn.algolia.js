chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    let isSuccess = false;
    if (request.command === 'focus-next-link') {
        isSuccess = focusNextLink();
    }
    sendResponse({"isSuccess": isSuccess});
});

function focusNextLink() {
    if (!globalHNAlgoliaLength) {
        return false;
    }

    let $input = $globalHNAlgoliaLinks[globalHNAlgoliaIndex];
    $input.focus();
    return true;
}

let $globalHNAlgoliaLinks = null;
let globalHNAlgoliaLength = 0;
let globalHNAlgoliaIndex = 0;

window.addEventListener("load", onLoadCallback, false);

function onLoadCallback() {
    $globalHNAlgoliaLinks = $('ul.item-infos li:nth-child(4) a');
    globalHNAlgoliaLength = $globalHNAlgoliaLinks.length;

    // The actual results elements are rendered ansychronously with Angular
    // So let's poll until results are ready
    // https://stackoverflow.com/a/13917682
    let jsInitChecktimer = setInterval(checkForResultsVisible, 300);

    function checkForResultsVisible () {
        $globalHNAlgoliaLinks = $('ul.item-infos li:nth-child(4) a');
        globalHNAlgoliaLength = $globalHNAlgoliaLinks.length;

        if ($globalHNAlgoliaLinks.length >= 20) {
            clearInterval(jsInitChecktimer);
            focusListen();
        }
    }
}


function focusListen() {
    $globalHNAlgoliaLinks.on('focus', function(event) {
        let $el = $(this);
        // Force outline to be visible, using styles/hn.algolia.css in manifest is not working
        $el.css({'outline': 'auto 5px -webkit-focus-ring-color'});

        globalHNAlgoliaIndex = $globalHNAlgoliaLinks.index($el) + 1;
        if (globalHNAlgoliaIndex >= globalHNAlgoliaLength) {
            globalHNAlgoliaIndex = 0;
        }
    });

    $globalHNAlgoliaLinks.on('blur', function(event) {
        let $el = $(this);
        $el.css({'outline': 'none'});
    });
}
