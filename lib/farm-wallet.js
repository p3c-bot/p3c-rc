$('#sponsor').load("https://api.p3c.io/sponsor/");

// if saturn isn't installed 
if (typeof web3 == 'undefined') {
    alertify.alert(
        'Welcome to P3C', 
        'To use P3C, you need an Ethereum Classic wallet. Click here to install it. Users can join in less than 5 minutes.', function(){
            alertify.defaults.notifier.delay = 10000
            alertify.error('Please Install an <a target="_blank" style="color: white; text-decoration: underline;" href="https://chrome.google.com/webstore/detail/saturn-wallet/nkddgncdjgjfcddamfgcmfnlhccnimig">ETC Wallet</a>')
        
            $('#warning').transition({
                animation: 'shake',
                duration: '5s',
            });
        });
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


function copyAddress() {
  /* Get the text field */
  var copyText = document.getElementById("myCropAddress");

  /* Select the text field */
  copyText.select();

  /* Copy the text inside the text field */
  document.execCommand("copy");

  /* Alert the copied text */
  alert("Copied the text: " + copyText.value);
}