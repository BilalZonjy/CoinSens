console.log('test')

// function createNode(element) {
//     return document.createElement(element);
// }

// function append(parent, el) {
//     return parent.appendChild(el);
// }

// const ul = document.getElementById('btc');
const url = 'https://min-api.cryptocompare.com/data/pricemulti?fsyms=ETH,DASH,BTC,LTC&tsyms=BTC,USD,EUR';


$.get(url, function(data) {
    $('#currentBTC').html(data.BTC.USD);
    var btcAmount = $('#currentBTC').data('cry').btc * data.BTC.USD;
    var btcText = $('#calcBTC').text();
    $('#calcBTC').text(btcText + btcAmount + ' USD');
    console.log(btcAmount);
    $('#currentBTC').addClass('counter');
    $('#currentETH').html(data.ETH.USD);
    var ethAmount = $('#currentETH').data('cry').eth * data.ETH.USD;
    var ethText = $('#calcETH').text();
    $('#calcETH').text(ethText + ethAmount + ' USD');
    $('#currentETH').addClass('counter');
    $('#currentLIT').html(data.LTC.USD);
    var litAmount = $('#currentLIT').data('cry').lit * data.LTC.USD;
    var litText = $('#calcLIT').text();
    $('#calcLIT').text(litText + litAmount + ' USD');

    $('#currentLIT').addClass('counter');

});

// var today = moment();
// var end = today.format('YYYY-MM-DD');
// var start = today.subtract(1, 'months').format('YYYY-MM-DD');
// var url_BTC_price = 'https://api.coindesk.com/v1/bpi/historical/close.json?start=' + start + '&end=' + end;
// // 'https://api.coindesk.com/v1/bpi/historical/close.json?start=2017-12-10&end=2018-01-10'

// console.log(url_BTC_price);

// fetch(url_BTC_price)
//     .then((resp) => resp.json()) // Transform the data into json
//     .then(function(data) {
//         console.log(data.bpi);
//     })








// fetch(url)
//     .then((resp) => resp.json())
//     .then(function(data) {
//         let btc = data.results;
//         console.log(btc);
//         // return btc.map(function (btc) {
//         //     let span = createNode('span');
//         //     span.innerHTML = `${btc.BTC.USD}`;
//         //     append(p);
//         // })
//     })
//     .catch(function(error) {
//         console.log(error);
//     });