
let API_KEY= "62fb6c33dc83c3f15c98fb866d9ad021"

let degrees = document.querySelectorAll(".max, .min");

let selected_scale = document.querySelector(".scale")

let days = document.querySelectorAll(".day")

let city_title = document.querySelector(".city-title")

let city_coord = {

    'Burbank':{'lat':'34.1808', 'lon':'-118.3090'},
    'Chicago': {'lat':'41.8781', 'lon':'-87.6298'},
    'Dallas':{'lat':'32.7767', 'lon':'-96.7970'}

}



loadReport = async function(element){
    
    
    let city=element.innerText;
    let unit = selected_scale.value;
    let symbol = selected_scale.innerText;
    console.log(city, unit,city_coord)
    city_title.innerText = city;
    alert("Loading weather report...")

    let url=`https://api.openweathermap.org/data/2.5/onecall?lat=${city_coord[city]['lat']}&lon=${city_coord[city]['lon']}&exclude=current,minutely,hourly,alerts&units=${unit}&appid=${API_KEY}`;

    let settings = {
        method:"GET"
    }

    let response=await fetch(url,settings);
    let data=await response.json();
    console.log(data);

    for (let i=0;i<days.length;i++){
        console.log(data.daily[i])
        console.log(data.daily[i].weather[0].main,data.daily[i].weather[0].description)
        days[i].querySelector("h5").innerText = data.daily[i].weather[0].description
        result = data.daily[i].weather[0].main
        if (result =="Clouds"){
            days[i].querySelector("img").src="./assets/some_clouds.png"
            days[i].querySelector("img").alt = "some clouds"
        }
        else if (result=="Clear"){
            days[i].querySelector("img").src = "./assets/some_sun.png"
            days[i].querySelector("img").alt = "some sun"

        }
        else if(result=="Rain"){
            days[i].querySelector("img").src = "./assets/some_rain.png"
            days[i].querySelector("img").alt = "some rain"
        }
        days[i].querySelector(".temperatures").querySelector(".max").innerText= Math.round(parseFloat(data.daily[i].temp.max))
        days[i].querySelector(".temperatures").querySelector(".min").innerText = Math.round(parseFloat(data.daily[i].temp.min))
        
    }


}



convert = function(nums){

    
    
    if(selected_scale.value =="imperial"){
        
        for (i=0;i<nums.length;i++){
            nums[i].innerText = Math.ceil(parseInt(nums[i].innerText) *9/5+32);

        }
        

    }

    else if(selected_scale.value =="metric"){

        for (i=0;i<nums.length;i++){
            nums[i].innerText = Math.ceil((parseInt(nums[i].innerText) -32) *5/9);

        }

    }



}

