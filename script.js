let fileinput=document.getElementById("filepicker");
let fimage=document.getElementById("fimage");
let transimg=document.getElementById("transimg");
let inputimage=document.getElementById("input-image");
let innerimage=document.querySelector(".inner-image");
let btn=document.querySelector(".btn");
let plus=document.getElementById("plus");
let span=document.querySelector("span");
let downloadbtn=document.getElementById("download");
let resetbtn=document.getElementById("reset");
let image=null;
let url=null;
let style2=document.querySelector(".style2");
let result=document.querySelector(".result");
let originalimage=document.querySelector(".resultimg1 img");
let generatedimg=document.querySelector(".resultimg2 img");
function handleupload(){
   if (!image) {
       alert("Please select an image first");
       return;
   }


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
      style2.style.display="none";
      result.style.display="flex";
       url = URL.createObjectURL(blob);
       generatedimg.src = url;
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
    originalimage.src=`data:${fileinput.type};base64,${e.target.result.split(",")[1]}`;

 }
 reader.readAsDataURL(image);
});
btn.addEventListener("click",()=>{
      handleupload();
})
function downloadimage(){
    fetch(url)
    .then(res=>res.blob())
    .then(file=>{
        let a =document.createElement("a");
        a.href=URL.createObjectURL(file);
        a.download="image.png";
        a.click();
    })
   .catch();
}
downloadbtn.addEventListener("click",()=>{
    downloadimage();
});
resetbtn.addEventListener("click",()=>{
   window.location.reload();
});
