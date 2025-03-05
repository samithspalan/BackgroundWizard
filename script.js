let fileinput=document.getElementById("filepicker");
let fimage=document.getElementById("fimage");
let transimg=document.getElementById("transimg");
let inputimage=document.getElementById("input-image");
let innerimage=document.querySelector(".inner-image");
let btn=document.querySelector(".btn");
let plus=document.getElementById("plus");
let span=document.querySelector("span");
let image=null;
let url=null
let genimg=document.querySelector("#generated-image");
function handleupload(){
   if (!image) {
       alert("Please select an image first");
       return;
   }

   
   const formdata=new FormData();
   formdata.append("image_file", image);  
   formdata.append("size", "auto");

   fetch("https://api.remove.bg/v1.0/removebg", {
      method: "POST",
      headers: { 
         "X-Api-Key": api
      },
      body: formdata
   })
   .then(function(response){
       if (!response.ok) {
           return response.json().then(error => Promise.reject(error));
       }
       return response.blob();
   })
   .then(function(blob){
       url = URL.createObjectURL(blob);
       genimg.src = url;
   })
   .catch(function(error) {
       console.error('Error:', error);
       alert(error.message || "Error removing background. Please try again.");
   });
}
innerimage.addEventListener("click",()=>{
    fileinput.click();
})
fileinput.addEventListener("change",()=>{
 image=fileinput.files[0];
 if(!fileinput){
    return;
 }
 let reader=new FileReader();
 reader.onload=(e)=>{
    inputimage.src=`data:${fileinput.type};base64,${e.target.result.split(",")[1]}`;
    inputimage.style.display="block";
    plus.style.display="none";
    span.style.display="none";
 }
 reader.readAsDataURL(image);
});
btn.addEventListener("click",()=>{
      handleupload();
})
