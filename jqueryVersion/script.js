
let API_KEY= "62fb6c33dc83c3f15c98fb866d9ad021"

let selected_scale = $(".scale")

let days = $(".day")

let city_title = $(".city-title")

$(".scale").on("change",function(){
    convert($(".max, .min"));
})

let city_coord = {

    'Burbank':{'lat':'34.1808', 'lon':'-118.3090'},
    'Chicago': {'lat':'41.8781', 'lon':'-87.6298'},
    'Dallas':{'lat':'32.7767', 'lon':'-96.7970'}

}

let images= {

    'Clouds': {'src':'./assets/some_clouds.png', 'alt':'some_clouds'},
    'Clear': {'src':'./assets/some_sun.png', 'alt':'some_sun'},
    'Rain': {'src':'./assets/some_rain.png', 'alt':'some_rain'}

}

$(".cookie-msg button").click(function(){
    $(this).parent().remove();

});


$("nav div a").click(function(){
    $(city_title).text($(this).text());
    loadReport($(city_title).text());

})

loadReport = async function(city){
    
    let unit = $(selected_scale).val();
    alert("Loading weather report...")

    let url=`https://api.openweathermap.org/data/2.5/onecall?lat=${city_coord[city]['lat']}&lon=${city_coord[city]['lon']}&exclude=current,minutely,hourly,alerts&units=${unit}&appid=${API_KEY}`;

    let settings = {
        method:"GET"
    }

    $.ajax({
        type:'GET',
        url:url,
        success:function(data){
            $.each(data.daily, function(i,day_f){
                    console.log($(days[i]).find("temperatures .max").text())
                    $(days[i]).find("h5").text(day_f.weather[0].description)
                    $(days[i]).find("img").attr('src',images[day_f.weather[0].main]['src'])
                    $(days[i]).find("img").attr('alt',images[day_f.weather[0].main]['alt'])
                    $(days[i]).find(".temperatures .max").text(Math.round(parseFloat(day_f.temp.max)))
                    $(days[i]).find(".temperatures .min").text(Math.round(parseFloat(day_f.temp.min)))

            })

        },
        error: function(error){
            console.log(error)
        }

    })

}



convert = function(nums){

    
    
    if($(selected_scale).val() =="imperial"){
        
        $.each(nums,function(i,num){

            $(num).text(Math.ceil(parseInt($(num).text()) *9/5+32))
        })
        

    }

    else if($(selected_scale).val() =="metric"){

        $.each(nums,function(i,num){

            $(num).text(Math.ceil((parseInt($(num).text()) -32) *5/9))
        })

    }



}

