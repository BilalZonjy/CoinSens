function get_ticker_price_and_change_color(url, divID) {
    // var btc_url_change = 'https://api.cryptonator.com/api/ticker/btc-usd';
    $.get(url, function(data) {
        var change = Math.round(data.ticker.change * 100) / 100;
        $('#' + divID).text(Math.abs(change));
        if (change < 0) {
            $('#' + divID).css('color', '#b83942');
        } else {
            $('#' + divID).css('color', '#4aaaa5');
        }
    });



}





const url = 'https://min-api.cryptocompare.com/data/pricemulti?fsyms=ETH,DASH,BTC,LTC&tsyms=BTC,USD,EUR';

function get_prices() {



    $.get(url, function(data) {
        $('#currentBTC').removeClass('counter');
        $('#currentETH').removeClass('counter');
        $('#currentLIT').removeClass('counter');
        $('#currentBTC').html(data.BTC.USD);
        var btcAmount = $('#currentBTC').data('cry').btc * data.BTC.USD;
        var btcText = $('#calcBTC').text().slice(0, 7);
        $('#calcBTC').text(btcText + Math.round(btcAmount * 100) / 100 + ' USD');
        $('#currentBTC').addClass('counter');
        $('#currentETH').html(data.ETH.USD);
        var ethAmount = $('#currentETH').data('cry').eth * data.ETH.USD;
        var ethText = $('#calcETH').text();
        $('#calcETH').text(ethText + Math.round(ethAmount * 100) / 100 + ' USD');
        $('#currentETH').addClass('counter');
        $('#currentLIT').html(data.LTC.USD);
        var litAmount = $('#currentLIT').data('cry').lit * data.LTC.USD;
        var litText = $('#calcLIT').text();
        $('#calcLIT').text(litText + Math.round(litAmount * 100) / 100 + ' USD');

        $('#currentLIT').addClass('counter');

    });
    get_ticker_price_and_change_color('https://api.cryptonator.com/api/ticker/btc-usd', 'btccoin');
    get_ticker_price_and_change_color('https://api.cryptonator.com/api/ticker/eth-usd', 'ethcoin');
    get_ticker_price_and_change_color('https://api.cryptonator.com/api/ticker/ltc-usd', 'litcoin');
    get_ticker_price_and_change_color('https://api.cryptonator.com/api/ticker/xrp-usd', 'ripplecoin');
    get_ticker_price_and_change_color('https://api.cryptonator.com/api/ticker/dash-usd', 'monerocoin');
    get_ticker_price_and_change_color('https://api.cryptonator.com/api/ticker/XMR-usd', 'dashcoin');
    get_ticker_price_and_change_color('https://api.cryptonator.com/api/ticker/doge-usd', 'dogecoin');
}

get_prices();
setInterval(get_prices, 30000);