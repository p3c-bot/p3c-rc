// onboard
hasFarm = localStorage.getItem("hasFarm")
// getCropInfo(true)

$("#buy").click(function () {
    amountToBuy = $("#buyInput").val()
    // if we don't have a mn, null is my own crop address
    masternode = localStorage.getItem("mn")
    buyFromCrop(amountToBuy, masternode)
})

$("#sell").click(function () {
    amountToSell = $("#sellInput").val()
    sellFromCrop(amountToSell)
})

$("#reinvest").click(function () {
    reinvestFromCrop()
})

$("#withdraw").click(function () {
    withdrawFromCrop()
})

$("#transfer").click(function () {
    destination = $("#transferAddress").val()
    amountToTransfer = $("#transferTokenCount").val()
    transferFromCrop(destination, amountToTransfer)
})

$('#reinvestToggle').qtip({ // Grab some elements to apply the tooltip to
    content: {
        text: 'Allow bots to automatically reinvest your dividends for a 3% bonus. This enables faster compounding, and can be turned off at any time.'
    },
    style: {
        classes: 'info',
    }
})
