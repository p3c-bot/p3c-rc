$('#sponsor').load("https://api.p3c.io/sponsor/");

// if saturn isn't installed 
if (typeof web3 == 'undefined') {
    $('#warning').transition({
        animation: 'shake',
        duration: '5s',
    });
    alertify.defaults.notifier.delay = 10000
    alertify.error('Please Install an <a target="_blank" style="color: white; text-decoration: underline;" href="https://chrome.google.com/webstore/detail/saturn-wallet/nkddgncdjgjfcddamfgcmfnlhccnimig">ETC Wallet</a>')
}

masternode = localStorage.getItem("ref")
if (masternode == null) {
    masternode = "0x0000000000000000000000000000000000000000";
}

$("#buy").click(function () {
    amountToBuy = $("#buyInput").val()

    buyFromCrop(amountToBuy, masternode)
})

$("#sell").click(function () {
    amountToSell = $("#sellInput").val()
    sellFromCrop(amountToSell)
})

$("#reinvest").click(function () {
    reinvestFromCrop(masternode)
})

$("#withdraw").click(function () {
    withdrawFromCrop()
})

$("#transfer").click(function () {
    destination = $("#transferAddress").val()
    amountToTransfer = $("#transferTokenCount").val()
    transferFromCrop(destination, amountToTransfer)
})

$('#infoButton')
    .popup({
        content: "Allow bots to automatically compound your dividends in exchange for a referral bonus. This enables faster compounding, and can be turned off at any time.",
        position: 'top center'
    });