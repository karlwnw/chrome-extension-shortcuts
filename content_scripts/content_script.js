chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    let isSuccess = false;
    if (request.command === 'focus-next-input') {
        isSuccess = focusNextInput();
    } else if (request.command === 'focus-previous-input') {
        console.log("unimplemented");
    }
    sendResponse({"isSuccess": isSuccess});
});


function focusNextInput() {
    if (!globalInputsLength) {
        return false;
    }

    let $input = $globalInputs[globalIndex];
    $input.focus();
    return true;
}


let $globalInputs = $('input[type=text],input[type=email],input[type=password],input[type=number],input[type=search],textarea,select').filter(':visible');
let globalInputsLength = $globalInputs.length;
let globalIndex = 0;

window.addEventListener("load", onLoadCallback, false);

function onLoadCallback() {
    $globalInputs.on('focus', function(event){
        globalIndex = $globalInputs.index($(this)) + 1;
        if (globalIndex >= globalInputsLength) {
            globalIndex = 0;
        }
    });
}
