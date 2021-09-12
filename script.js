


degrees = document.querySelectorAll(".max, .min")





loadReport = function(){
    alert("Loading weather report...")


}

convert = function(nums,element){
    
    if(element.value =="°F"){
        
        for (i=0;i<nums.length;i++){
            nums[i].innerText = Math.ceil(parseInt(nums[i].innerText.slice(0,-2)) *9/5+32) + "°F";

        }
        

    }

    else if(element.value =="°C"){

        for (i=0;i<nums.length;i++){
            nums[i].innerText = Math.ceil((parseInt(nums[i].innerText.slice(0,-2)) -32) *5/9) + "°C";

        }

    }



}