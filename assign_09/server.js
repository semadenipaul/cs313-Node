var express = require("express");

var app = express();

app.use(express.static("public"));

app.set("views", "views");
app.set("view engine", "ejs");

app.get("/calculate", function (req, res) {
    console.log("Received a request to calculate Postal Rates.");
    var type = req.query.select;
    var weight = req.query.weight;
    console.log("Calculate price of a " + weight + " ounce " + type + " package.");

    var result = calculateRate(type, weight);
    var params = { res: result };

    res.render("pages/assign_09", params);
});

app.listen(5001, function () {
    console.log("The server is up and running!");
});

function calculateRate(type, weight) {
    if (type == "stampLetters") {
        return rateStampLetters(Number(weight));
    }
    else if (type == "meterLetters") {
        return rateMeterLetters(Number(weight));
    }
    else if (type == "flatEnvelopes") {
        return rateLargeEnvelopes(Number(weight));
    }
    else {
        return rateFirstClassRetail(Number(weight));
    }
}

function rateStampLetters(weight) {
    var price = 0.55;

    if (weight <= 1.0) {
        console.log("The final price is $" + price.toFixed(2) + ".");
        return price.toFixed(2);
    }
    else if (weight <= 2) {
        price += 0.15;
        console.log("The final price is $" + price.toFixed(2) + ".");
        return price.toFixed(2);
    }
    else if (weight <= 3) {
        price += 0.30;
        console.log("The final price is $" + price.toFixed(2) + ".");
        return price.toFixed(2);
    }
    else {
        for (var i = 0.5; i < weight; i++) {
            price += 0.15;
        }
        console.log("The final price is $" + price.toFixed(2) + ".");
        return price.toFixed(2);
    }
}

function rateMeterLetters(weight) {
    var price = 0.50;

    if (weight <= 1.0) {
        console.log("The final price is $" + price.toFixed(2) + ".");
        return price.toFixed(2);
    }
    else if (weight <= 2) {
        price += 0.15;
        console.log("The final price is $" + price.toFixed(2) + ".");
        return price.toFixed(2);
    }
    else if (weight <= 3) {
        price += 0.30;
        console.log("The final price is $" + price.toFixed(2) + ".");
        return price.toFixed(2);
    }
    else {
        for (var i = 0.5; i < weight; i++) {
            price += 0.15;
        }
        console.log("The final price is $" + price.toFixed(2) + ".");
        return price.toFixed(2);
    }
}

function rateLargeEnvelopes(weight) {
    var price = 0.80;

    for (var i = 0; i < weight; i++) {
        price += 0.20;
    }
    console.log("The final price is $" + price.toFixed(2) + ".");
    return price.toFixed(2);
}

function rateFirstClassRetail(weight) {
    var price = 3.80;
    var rate = 0.90;

    for (var i = 4; i < weight; i++) {
        if (i % 4 == 0) {
            rate -= 0.10;
            price += rate;
        }
    }
    console.log("The final price is $" + price.toFixed(2) + ".");
    return price.toFixed(2);
}