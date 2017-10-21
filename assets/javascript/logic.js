$(document).ready(function(){
    $(".scrollspy").scrollSpy();
    
    $('select').material_select();
    $("input.select-dropdown").val("    User Select");   
})


var arr;

//initial api call to load up page
var security;
var queryURL = "https://api.coinmarketcap.com/v1/ticker/?limit=1000";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).done(function(response){

        if(!localStorage.getItem("arr")){
            //loads first three coins on initial page
            for (i=0; i<3; i++){
                var currencyIA = "#currency" + i + "a";
                var currencyIB = "#currency" + i + "b";
                var currencyIC = "#currency" + i + "c";
                $(currencyIA).append("Name: " + ("</br>") + response[i].name + ("</br>"));
                $(currencyIB).append("Price: $" + ("</br>") + response[i].price_usd + ("</br>"));
                $(currencyIC).append("Change: " + ("</br>") + response[i].percent_change_24h + ("% <br>"))
             
            }

        }

        else {

            $(".container.inputAPI.one").empty();

            var almostArray = localStorage.getItem("arr");
            var array = almostArray.split(",");

        var i = 0;
            function loadNext(){
                                
                if (i<array.length){

                    var coin = array[i];

                    if(coin == "Golem"){
                        coin = "golem-network-tokens";
                    }    
                        
                    var queryURL = "https://api.coinmarketcap.com/v1/ticker/" + coin + "/";

                    $.ajax({
                        url: queryURL,
                        method: "GET"
                    }).done(function(response){
                        
                        var divver = $("<div class='row rowCurrency'>");

                        var subdivImg = $("<div class='col m3 s12 imgFix'>");
                        var subdivA = $("<div class='col m3 s12'>");
                        var subdivB = $("<div class='col m3 s12'>");
                        var subdivC = $("<div class='col m3 s12'>");

                        var icon = $("<img class='responsive-img' src='assets/images/" + coin + ".png'>");

                                
                        var subsubdivA = $("<div class='userCurrency' id='currency" + i + "a'>");
                        var subsubdivB = $("<div class='userCurrency' id='currency" + i + "b'>");
                        var subsubdivC = $("<div class='userCurrency' id='currency" + i + "c'>");



                        $(subsubdivA).append("Name: " + response[0].name + "</br>");
                        $(subsubdivB).append("Price: $" + response[0].price_usd + "</br>");

                        if (parseInt(response[0].percent_change_24h) > 0) {
                        $(subsubdivC).append("<div id='green'><strong>Change: </strong>" + response[0].percent_change_24h + "%↑ <br></div>")};

                        if (parseInt(response[0].percent_change_24h) < 0) {
                        $(subsubdivC).append("<div id='red'><strong>Change: </strong>" + response[0].percent_change_24h + "%↓ <br></div>")};

                        if (parseInt(response[0].percent_change_24h) === 0) {
                        $(subsubdivC).append("<div><strong>Change: </strong> 0% <br></div>")};

                    

                        subdivImg.append(icon);
                        subdivA.append(subsubdivA);
                        subdivB.append(subsubdivB);
                        subdivC.append(subsubdivC);

                        divver.append(subdivImg);
                        divver.append(subdivA);
                        divver.append(subdivB);
                        divver.append(subdivC);


                        $(".container.inputAPI.one").append(divver);

                        $("input.select-dropdown").val("    PICK YOUR COINS!");
                        loadNext();
                            
                                
                    });

                    i++;
                                
                }

                        
            }

            // var almostarr = localStorage.getItem("arr");


            loadNext();

                }


    });


$(document).on("change", 'select', function(){
        var ogChoice = $(this).val();
        // var lastArrayChoice = ogChoice.length -1;
        // var choice = ogChoice[lastArrayChoice];
        console.log(ogChoice);
        $(".container.inputAPI.one").empty();

        localStorage.setItem("arr", ogChoice);



    var i = 0;
                function loadNext(){

                if (i<ogChoice.length){

                    var coin = ogChoice[i];

                    if(coin=="Golem"){
                        coin = "golem-network-tokens";
                    }

                    // var currencyIA = "#currency" + i + "a";
                    // var currencyIB = "#currency" + i + "b";
                    // var currencyIC = "#currency" + i + "c";

                    var queryURL = "https://api.coinmarketcap.com/v1/ticker/" + coin + "/";

                    $.ajax({
                        url: queryURL,
                        method: "GET"
                    }).done(function(response){


                        var divver = $("<div class='row rowCurrency'>");

                        var subdivImg = $("<div class='col m3 s12 imgFix'>");
                        var subdivA = $("<div class='col m3 s12'>");
                        var subdivB = $("<div class='col m3 s12'>");
                        var subdivC = $("<div class='col m3 s12'>");

                        var icon = $("<img class='responsive-img' src='assets/images/" + coin + ".png'>");


                        var subsubdivA = $("<div class='userCurrency' id='currency" + i + "a'>");
                        var subsubdivB = $("<div class='userCurrency' id='currency" + i + "b'>");
                        var subsubdivC = $("<div class='userCurrency' id='currency" + i + "c'>");

                
                        $(subsubdivA).append("<strong>Name: </strong>" + response[0].name + "</br>");
                        $(subsubdivB).append("<strong>Price: $ </strong>" + response[0].price_usd + "</br>");

                        if (parseInt(response[0].percent_change_24h) > 0) {
                        $(subsubdivC).append("<div id='green'><strong>Change: </strong>" + response[0].percent_change_24h + "%↑ <br></div>")};

                        if (parseInt(response[0].percent_change_24h) < 0) {
                        $(subsubdivC).append("<div id='red'><strong>Change: </strong>" + response[0].percent_change_24h + "%↓ <br></div>")};

                        if (parseInt(response[0].percent_change_24h) === 0) {
                        $(subsubdivC).append("<div><strong>Change: </strong> 0% <br></div>")};

                        
                        subdivImg.append(icon);
                        subdivA.append(subsubdivA);
                        subdivB.append(subsubdivB);
                        subdivC.append(subsubdivC);

                        divver.append(subdivImg);
                        divver.append(subdivA);
                        divver.append(subdivB);
                        divver.append(subdivC);


                        // console.log(i);

                        $(".container.inputAPI.one").append(divver);

                        $("input.select-dropdown").val("    PICK YOUR COINS!");
                        loadNext();



                    });

                        i++;

                }


            }

    loadNext();

    });



    