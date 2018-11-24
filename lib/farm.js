var farmContract = web3.eth.contract(contracts.farm.abi).at(contracts.farm.address);
var p3cContract = web3.eth.contract(contracts.p3c.abi).at(contracts.p3c.address);
var cropAbi = web3.eth.contract(contracts.crop.abi)

var myCropAddress;
var myCropTokens;
var myCropDividends;
var myCropDisabled;

function getMyCrop(onboard) {
    farmContract.myCrop.call(function (err, result) {
        // if onboard is true and we don't have a crop address already.
        if ((onboard == true) && (err || (result == '0x0000000000000000000000000000000000000000'))) {
            alertify.confirm('Welcome to P3C',
                `
                <p class="agreement">
                P3C is an autonomous smart contract. You can read it <a target="_blank" href="http://etherhub.io/addr/0xae5433263a626f397fed88421cc85ffd22bbc8dd#tab_addr_3">here</a>. By clicking OK, you accept that the contract will be run as written and that <b>code is law</b>.
                To accept you need an <a target="_blank" href="https://chrome.google.com/webstore/detail/saturn-wallet/nkddgncdjgjfcddamfgcmfnlhccnimig">Ethereum Classic Wallet</a>.
                </p>
                <img src="img/etc-logo.png" class="ui image etc-logo" 
                />
                `,
                function () {
                    deployCrop(0, '0x0000000000000000000000000000000000000000')
                },
                function () {
                    alertify.error('Not Connected')
                });
        }
        if (!err) {
            myCropAddress = result;
            $("#myCropAddress").replaceWith("<b>" + myCropAddress + "</b>")
            $("#masternodeLink").replaceWith('<a id="masternodeLink" href="/?mn=' + myCropAddress + '">https://p3c.io/index.html?mn=' + myCropAddress + '</a>')
        }
    });
}


function getMyCropDividends() {
    farmContract.myCropDividends.call(function (err, result) {
        if (!err) {
            myCropDividends = result;
            $("#myCropDividends").replaceWith("<b id='myCropDividends'>" + web3.fromWei(myCropDividends).toFixed(13) + "</b>")
        }
    });
}

function getMyCropTokens() {
    farmContract.myCropTokens.call(function (err, result) {
        if (!err) {
            myCropTokens = result;
            $("#myCropTokens").replaceWith("<b>" + web3.fromWei(myCropTokens).toFixed(2) + "</b>")
            p3cContract.sellPrice(function (e, r) {
                let sellPrice = web3.fromWei(r)
                $('#myETCValue').text((sellPrice * web3.fromWei(myCropTokens)).toFixed(4))
            })
        }
    });
}

function getMyCropDisabled() {
    farmContract.myCropDisabled.call(function (err, result) {
        if (!err) {
            myCropDisabled = result;
            if (myCropDisabled == false) {
                $('#autoReinvest').checkbox('set checked');
            } else {
                $('#autoReinvest').checkbox('set unchecked');
            }
        }
    })
}

function getCropInfo(onboard) {
    getMyCrop(onboard)
    getMyCropTokens()
    getMyCropDividends()
    getMyCropDisabled()
}

function deployCrop(amountToBuy, referrer) {
    amount = web3.toWei(amountToBuy)
    farmContract.createCrop.sendTransaction(
        // you are the referer
        referrer, {
            from: web3.eth.accounts[0],
            value: amount,
            gas: 964521
        },
        function (error, result) { //get callback from function which is your transaction key
            if (!error) {
                alertify.success("New User Created. Waiting for Blockchain.")
                console.log(result);
            } else {
                console.log(error);
            }
        })
}

function transferAllP3CToCrop() {
    farmContract.myCrop.call(function (err, cropAddress) {
        alert('This is my crop ' + cropAddress)
        p3cContract.myTokens.call(function (err, myTokens) {
            tokens = myTokens.toNumber()
            alert('Move this many tokens' + web3.fromWei(tokens))
            p3cContract.transfer.sendTransaction(
                cropAddress,
                tokens, {
                    from: web3.eth.accounts[0],
                },
                function (error, result) { //get callback from function which is your transaction key
                    if (!error) {
                        console.log(result);
                    } else {
                        console.log(error);
                    }
                })
        });
    })
}

function autoReinvestDisableToggle(state) {
    farmContract.myCrop.call(function (err, cropAddress) {
        cropAbi.at(cropAddress).disable.sendTransaction(
            // you are the referer
            state, {
                from: web3.eth.accounts[0],
            },
            function (error, result) { //get callback from function which is your transaction key
                if (!error) {
                    console.log(result);
                    alertify.success("Auto-Reinvest: " + state)

                } else {
                    console.log(error);
                }
            })
    })
}
$('#autoReinvest').checkbox({
    onChecked: function () {
        autoReinvestDisableToggle(false)
    },
    onUnchecked: function () {
        autoReinvestDisableToggle(true)
    }
})

// This buys P3C from the crop, but with you as the referrer
function buyFromCrop(amountToBuy, referrer) {
    farmContract.myCrop.call(function (err, cropAddress) {
        amount = web3.toWei(amountToBuy)
        cropAbi.at(cropAddress).buy.sendTransaction(
            // your crop is the referrer
            referrer, {
                from: web3.eth.accounts[0],
                value: amount,
                gas: 120561
            },
            function (error, result) { //get callback from function which is your transaction key
                if (!error) {
                    alertify.success("P3C Purchased. Waiting for Blockchain.")
                    console.log(result);
                } else {
                    console.log(error);
                }
            })
    })
}

// This buys P3C from the crop, but with you as the referrer
function sellFromCrop(amountToSell) {
    farmContract.myCrop.call(function (err, cropAddress) {
        amount = web3.toWei(amountToSell)
        cropAbi.at(cropAddress).sell.sendTransaction(
            // you are the referer
            amount, {
                from: web3.eth.accounts[0],
                gas: 98012
            },
            function (error, result) { //get callback from function which is your transaction key
                if (!error) {
                    alertify.success(amountToSell + " P3C Sold. Waiting for Blockchain.")
                    console.log(result);
                } else {
                    console.log(error);
                }
            })
    })
}

function reinvestFromCrop() {
    farmContract.myCrop.call(function (err, cropAddress) {
        cropAbi.at(cropAddress).reinvest.sendTransaction(
            cropAddress, {
                from: web3.eth.accounts[0],
            },
            function (error, result) { //get callback from function which is your transaction key
                if (!error) {
                    alertify.success("Reinvested P3C. Waiting for Blockchain.")
                    console.log(result);
                } else {
                    console.log(error);
                }
            })
    })
}

function withdrawFromCrop() {
    farmContract.myCrop.call(function (err, cropAddress) {
        cropAbi.at(cropAddress).withdraw.sendTransaction({
                from: web3.eth.accounts[0],
            },
            function (error, result) { //get callback from function which is your transaction key
                if (!error) {
                    alertify.success("Withdrawing Dividends.  Waiting for Blockchain.")
                    console.log(result);
                } else {
                    console.log(error);
                }
            })
    })
}

function transferFromCrop(destination, amountToTransfer) {
    amount = web3.toWei(amountToTransfer)
    farmContract.myCrop.call(function (err, cropAddress) {
        cropAbi.at(cropAddress).transfer.sendTransaction(
            destination,
            amount, {
                from: web3.eth.accounts[0],
            },
            function (error, result) { //get callback from function which is your transaction key
                if (!error) {
                    alertify.success("Transfering " + amountToTransfer + " P3C to " + destination.substring(0,7) + "...")
                    console.log(result);
                } else {
                    console.log(error);
                }
            })
    })

}