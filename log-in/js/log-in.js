var errorUsername=false;  var errorUsername2=false;
var errorPassword=false;  var errorPassword2 = false;
var x=1; var y=1;
var user;
$(document).load(function() {
    document.getElementById("LogInBtn").disabled=true;
    //document.getElementById("inputUsername").addEventListener("keydown", Change);
    //document.getElementById("inputPassword").addEventListener("keydown", Change);
});
function myFunction() {
    console.log("MyFunction() executed");
    window.location.href = "feed.html?u="+user;
};

function Change(){
  console.log("change");
  console.log("text: "+document.getElementById("inputUsername").value);
    var url="https://karmics.firebaseio.com/users/.json";
$.getJSON( url, function( data ) {
    x=1; y=1;
    $.each(data,function(key,val){
        ///////////////// USERNAME
        if(x==1){
            if((val.username==document.getElementById("inputUsername").value)||(val.email==document.getElementById("inputUsername").value)){
                console.log("coincidenciaUsername");
                //errorUsername=true; 
                errorUsername2=true;
                document.getElementById("inputUsername").style.backgroundColor="white";
                console.log("blanco");
                    //errorUsername=false;
                x=0;
                if(val.username==document.getElementById("inputUsername").value){
                    window.user=document.getElementById("inputUsername").value;
                }
                else{
                    window.user=val.username;
                }
            }
            else{
                errorUsername2=false;
                document.getElementById("inputUsername").style.backgroundColor="#F75D59";
                console.log("rojo");
            }
        }
        /////////////////// PASSWORD
        if(y==1){
        if((val.password==document.getElementById("inputPassword").value)&&(((val.username==document.getElementById("inputUsername").value)||(val.email==document.getElementById("inputUsername").value)))){
            //console.log("errorPassword");

            errorPassword=true;
            document.getElementById("inputPassword").style.backgroundColor="white";
            y=0;
        }
        else{
            if(!errorPassword){
                document.getElementById("inputPassword").style.backgroundColor="#F75D59";
            }
            errorPassword=false;
        }
        }
    }); 
    Checking();
});

 console.log("------"); 



};

function Checking(){
  //Change();
  console.log("Checking...");
  //console.log("###");
  //console.log("email: "+errorEmail); console.log("username: "+errorUsername);
  //console.log("###");

  if(((errorPassword) && (errorUsername2))&&((document.getElementById("inputUsername").value!="")&&(document.getElementById("inputPassword").value!=""))){ 
      myFunction();
  }
};