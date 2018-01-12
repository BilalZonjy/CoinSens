$(document).ready(function() {

    // CounterUp Plugin
    $('.counter').counterUp({
        delay: 10,
        time: 1000
    });

    setTimeout(function() {
        toastr.options = {
            closeButton: true,
            progressBar: true,
            showMethod: 'fadeIn',
            hideMethod: 'fadeOut',
            timeOut: 3000
        };
        toastr.success('Welcome back!');
    }, 1800);

    var today = moment();
    var end = today.format('YYYY-MM-DD');
    var start = today.subtract(7, 'days').format('YYYY-MM-DD');
    var url_BTC_price = 'https://api.coindesk.com/v1/bpi/historical/close.json?start=' + start + '&end=' + end;

    console.log(url_BTC_price);
    var flot1 = function() {
        fetch(url_BTC_price)
            .then((resp) => resp.json()) // Transform the data into json
            .then(function(output) {
                var price = output.bpi;
                var dates = Object.keys(price)
                var data = [];
                var x;
                var xticks = [];
                for (i in dates) {
                    x = dates[i];
                    data.push([i, price[x]]);
                    if (i == 0) {
                        xticks.push([i, '']);
                    } else if (i == dates.length - 1) {
                        xticks.push([i, '']);
                    } else {
                        xticks.push([i, x]);
                    }


                }
                var dataset = [{
                    data: data,
                    color: "#f25656",
                    lines: {
                        show: true,
                        fill: 0,
                    },
                    shadowSize: 0,
                }, {
                    data: data,
                    color: "#fff",
                    lines: {
                        show: false,
                    },
                    points: {
                        show: true,
                        fill: true,
                        radius: 4,
                        fillColor: "#f25656",
                        lineWidth: 2
                    },
                    curvedLines: {
                        apply: false,
                    },
                    shadowSize: 0
                }, ];
                var plot1 = $.plot("#flotchart1", dataset, {
                    series: {
                        color: "#14D1BD",
                        lines: {
                            show: true,
                            fill: 0.2
                        },
                        shadowSize: 0,
                        curvedLines: {
                            apply: true,
                            active: true
                        }
                    },
                    yaxis: {
                        tickSize: 2000
                    },
                    xaxis: {
                        ticks: xticks
                    },
                    legend: {
                        show: false
                    },
                    grid: {
                        color: "rgba(120,130,140,1)",
                        hoverable: true,
                        borderWidth: 0,
                        backgroundColor: 'transparent'
                    },
                    tooltip: true,
                    tooltipOpts: {
                        content: "%yK",
                        defaultTheme: false
                    }
                });
            })
    };

    flot1();

    $(".live-tile").liveTile();

});