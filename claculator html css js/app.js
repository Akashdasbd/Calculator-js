const container = document.querySelector('.container');
const currencyFrom = document.getElementById('from-currency');
const amount = document.getElementById('amount');
const price = document.getElementById('price');
const entryFee = document.getElementById('entry-fee');
const sellPrice = document.getElementById('sell-price');
const marketPrice = document.getElementById('Market-price');
const selectMarketPrice = document.getElementById('SelectMarket-price');
const exitFee = document.getElementById('exit-fee');
const calculate = document.getElementById("calculate");
const cryptoCurrency = document.getElementById("crypto-select");
const profit = document.getElementById("profit");



//* change bg color of the form on the cryptocurrency type *//


cryptoCurrency.addEventListener('change', function() {
    switch (cryptoCurrency.value) {
        case "BTC":
            container.style.background = 'var(--btc-color)';
            container.style.color = 'var(--dark-color)';
            getPrice("btc");
            break;

        case "ETH":
            container.style.background = 'var(--eth-color)';
            container.style.color = 'var(--light-color)';
            getPrice("eth");
            break;

        case "LTC":
            container.style.background = 'var(--ltc-color)';
            container.style.color = 'var(--dark-color)';
            getPrice("ltc");
            break;

        case "XRP":
            container.style.background = 'var(--xrp-color)';
            container.style.color = 'var(--light-color)';
            getPrice("xrp");
            break;

        case "UNI":
            container.style.background = 'var(--uni-color)';
            container.style.color = 'var(--light-color)';
            getPrice("uni");
            break;

        default:
            container.style.background = "var(--secondary-color)";
            container.style.color = "var(--dark-color)";


    };
});


async function getPrice(cryptoCurrency) {
    try {
        const res = await fetch(
            `https://api.coingecko.com/api/v3/coins/markets?vs_currency=gbp&order=market_cap_desc&per_page=250&page=1&sparkline=false`
        );
        const data = await res.json();
        const cryptoElement = data.find((ele) => ele.symbol === cryptoCurrency);
        document.querySelector("#Market-price").value = cryptoElement.current_price;
        return cryptoElement.current_price;
        // console.log(cryptoElement);
    } catch (error) {
        console.log(error);
    };
};



//* click event calculate *//

calculate.addEventListener('click', function(e) {
    e.preventDefault();

    getAllValu();

    //* Calculate *//

    const investmentFee = (amountValue * entryFeeValue) / 100;
    const units = (amountValue - investmentFee) / priceValue;
    const soldCurrency = (units * sellPriceValue);
    const feeExitValu = (soldCurrency * entryFeeValue) / 100;
    const exitValue = (soldCurrency - feeExitValu - investmentFee);
    const profitValue = (exitValue - amountValue);

    const profitPercentage = (profitValue / amountValue) * 100;

    let profitLoss;
    if (profitValue > 0) {
        profitLoss = "profit";
    } else {
        profitLoss = "loss";
    }



    if (isNaN(profitValue, profitPercentage)) {
        profit.innerHTML = ` <h2 class ="loss"> Complete all fields! </h2>`;

    } else {
        profit.innerHTML = `<h2 class= ${profitLoss}> ${
            profitLoss.charAt(0).toUpperCase() + profitLoss.slice(1) 
        } </h2> 

        <div class =${profitLoss }>${profitValue.toFixed(2)} $ (${profitPercentage.toFixed(2)}%)</div>

        <h3> Initial investment </h3>

        <div clss="primary">${amountValue.toFixed(2)} $</div>

        <h3> Buy fee</h3>
        <div class="primary">${investmentFee.toFixed(2)} $</div>
        <h3> Investment after fee </h3>
        <div class"primary">${amountValue-investmentFee.toFixed(2)} $</div>

        <h3> Crypto currency units </h3>
        <div class ="primary">${units} ${cryptoCurrencyValue} </div>

        <h3> Sell Fee </h3>
        <div class="primary"> ${feeExitValu.toFixed(2)}</div>

        <h3> Total Fees </h3>
        <div class ="primary">${(feeExitValu+investmentFee).toFixed(2)} </div>

        <h3> Total Exit Amount  </h3>
        <div class ="${profitLoss}">${exitValue.toFixed(2)}</div>

        
        `;
    };


    profit.classList.add("fadeIn");

    setTimeout(function() {
        profit.classList.remove("fadeIn");
    }, 600);



    (function() {
        amount.value = '';
        price.value = '';
        entryFee.value = '';
        sellPrice.value = '';
        exitFee.value = '';
    })();






});

function getAllValu() {
    return (
        (amountValue = parseFloat(amount.value)),
        (priceValue = parseFloat(price.value)),
        (entryFeeValue = parseFloat(entryFee.value)),
        (sellPriceValue = selectMarketPrice.checked ? marketPrice.value : parseFloat(sellPrice.value)),
        (exitFeeValue = parseFloat(exitFee.value)),
        (cryptoCurrencyValue = cryptoCurrency.value)

    );
};


selectMarketPrice.addEventListener('change', function() {
    if (selectMarketPrice.checked === true) {
        sellPrice.disabled = true;
    } else {
        sellPrice.disabled = false;
    }
});