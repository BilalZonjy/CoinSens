function get_ticker_price_and_change_color(url, divID) {
    $.get(url, function(data) {
        var change = Math.round(data.ticker.change * 100) / 100;
        $('#' + divID).text(Math.abs(change) + ' $');
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
        var btcText = $('#calcBTC').text().split('|')[0];
        $('#calcBTC').text(btcText + '| ' + Math.round(btcAmount * 100) / 100 + ' USD');
        $('#currentBTC').addClass('counter');
        $('#currentETH').html(data.ETH.USD);
        var ethAmount = $('#currentETH').data('cry').eth * data.ETH.USD;
        var ethText = $('#calcETH').text().split('|')[0];
        $('#calcETH').text(ethText + '| ' + Math.round(ethAmount * 100) / 100 + ' USD');
        $('#currentETH').addClass('counter');
        $('#currentLIT').html(data.LTC.USD);
        var litAmount = $('#currentLIT').data('cry').lit * data.LTC.USD;
        var litText = $('#calcLIT').text().split('|')[0];
        $('#calcLIT').text(litText + '| ' + Math.round(litAmount * 100) / 100 + ' USD');

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
setInterval(get_prices, 10000);

function getArticles() {
    var articles;
    var art_url = 'https://crypto-articles.herokuapp.com/articles_6';
    $.get(art_url, function(data) {
        var articles = data.result;
        for (var i = 1; i < 7; i++) {
            $('#article' + i).text(articles[i - 1][1]);
            $('#article' + i + 'link').attr('href', articles[i - 1][0]);
            $('#article' + i + 'link').attr('target', "_blank");
        }
    });
}
getArticles();
setInterval(getArticles, 10000);