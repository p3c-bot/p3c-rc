var farmContract = web3.eth.contract(contracts.farm.abi).at(contracts.farm.address);
var oldP3C = web3.eth.contract(contracts.oldP3C.abi).at(contracts.oldP3C.address);
var p3c = web3.eth.contract(contracts.p3c.abi).at(contracts.p3c.address);


$("#deployCrop").click(function () {
    amountToBuy = $("#buyInput").val()
    deployCrop(amountToBuy, web3.eth.accounts[0])
})

$("#transfer").click(function () {
    transferAddress = $("#transferAddress").val()
    transferTokenCount = $("#transferTokenCount").val()
    transferFromCrop()
})

$("#liquidate-old").click(function () {
    oldP3C.exit.sendTransaction({
            from: web3.eth.accounts[0],
        },
        function (error, result) { //get callback from function which is your transaction key
            if (!error) {
                alertify('Turning old P3C into Ethereum Classic')
                console.log(result);
            } else {
                console.log(error);
            }
        })
})

$("#transferCrop").click(function () {
    transferAllP3CToCrop()
})


oldP3C.myTokens.call(function (err, oldTokens) {
    tokens = web3.fromWei(oldTokens)
    if (tokens == 0){
        $("#get-rid-of-old-tokens").hide()
        $("#fresh-p3c-title").replaceWith("<span>" + "Step 1" + "</span>")
        $("#transfer-p3c-title").replaceWith("<span>" + "Step 2" + "</span>")
    }

    p3c.myTokens.call(function (err, newTokens) {
        newP3C = Number(web3.fromWei(newTokens))
        console.log(newP3C)
        if (newP3C == 0){
            $("#transfer-new-p3c").hide()
        }
    });
});


// get the crop information initially and then every 2 seconds
getCropInfo(false)
setInterval(function(){
  getCropInfo(false)
}, 2000);

new ClipboardJS('.button');
$('.ui.primary.basic.button.copy').on('click', function (){
  alertify.success('Copied', 2)
})

$('#buyInput').on('input change', function () {
  var value = parseFloat($(this).val())
  if (value > 0) {
    buyAmount = (value / buyPrice).toFixed(2)
    $('#buyAmount').text("Approximately " + buyAmount + " P3C")
  } else {
    $('#buyAmount').hide()
  }
})
