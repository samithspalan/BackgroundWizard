let fileinput=document.getElementById("filepicker");
let fimage=document.getElementById("fimage");
let transimg=document.getElementById("transimg");
let inputimage=document.getElementById("input-image");
let innerimage=document.querySelector(".inner-image");
let btn=document.getElementById("btn");
let image=null;
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
 }
 reader.readAsDataURL(image);
});

