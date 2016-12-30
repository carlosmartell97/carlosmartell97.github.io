var snapshotkey="";
var errorUsername=false;  var errorUsername2=false;
var errorEmail=false;     var errorEmail2 = false;
var errorPassword=false;  var errorPassword2 = false;
var x=1; var y=1;
$(document).load(function() {
    document.getElementById("SignUpBtn").disabled=true;
    //document.getElementById("inputUsername").addEventListener("keydown", Change);
    //document.getElementById("inputEmail").addEventListener("keydown", Change);
    //document.getElementById("inputPassword1").addEventListener("keydown", Change);
    //document.getElementById("inputPassword2").addEventListener("keydown", Change);
});
//window.setTimeout("Checking();", 200);
//setInterval(Checking, 10);
function myFunction() {
    var url="https://karmics.firebaseio.com/users/.json";


    // Get a database reference to our posts
    var ref = new Firebase("https://karmics.firebaseio.com/");

    //WRITING DATA WITH SET
    var usersRef = ref.child("users");
        var username=document.getElementById("inputEmail").value;
    var date = new Date();var m_names = ['January', 'February', 'March', 
    'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    var month = m_names[date.getMonth()]; var year = date.getFullYear();
    var fulldate=month+"-"+year;
    usersRef.push({
            //document.getElementById("inputUsername").value

            "email": document.getElementById("inputEmail").value, "username":document.getElementById("inputUsername").value,
            "password": document.getElementById("inputPassword1").value,
            "friends":{"1":"no one"},
            "profilePicture":"profile_250x250.jpg",
            "karmics":0,
            "completions":0,
            "awards":0,
            "sustainability":0,
            "mind":1,
            "body":1,
            "spirit":1,
            "notifications":{"0":{"type":"created-account","date":fulldate,"notification":"joined Karmics!"}}
    }, function(error) {
        if (error) {
            console.log("Data could not be saved." + error);
        } else {
            console.log("Data saved successfully.");




            ////////////////////////////////////
                var url="https://karmics.firebaseio.com/users/.json";
                $.getJSON( url, function( data ) {
                    x=1; y=1;
                    $.each(data,function(key,val){
                        ///////////////// USERNAME
                        if(x==1){
                            if(val.username==document.getElementById("inputUsername").value){
                                console.log("username encontrado");

                                // Get a database reference to our posts
                                var usersRef = new Firebase("https://karmics.firebaseio.com/users");
                                var urlquery=usersRef.orderByChild("username").equalTo(document.getElementById("inputUsername").value).on("child_added", function(snapshot) {
                                    window.snapshotkey = snapshot.key(); console.log(snapshotkey);

                                var usersRef = new Firebase("https://karmics.firebaseio.com/users/"+snapshotkey);

                                var objToWrite = new Object();
                                objToWrite.activity = {};
                                objToWrite.activity["0"] = new Object();
                                //usersRef.update(objToWrite);
                                objToWrite.activity["0"]["-placeholder"]="DON'T ERASE";
                                objToWrite.activity["0"].karmics=0;
                                objToWrite.activity["0"].completions=0;
                                objToWrite.activity["0"].awards=0;
                                objToWrite.activity["0"].sustainability=0;
                                usersRef.update(objToWrite,function(error) {
                                    if (error) {
                                        console.log("Data could not be saved." + error);
                                    } else {
                                        console.log("Data saved successfully.");
                                        window.location.href = "profile.html?u="+document.getElementById("inputUsername").value;
                                    }
                                });
                                });
                                x=0;
                            }
                        }
                    });
                });

            ////////////////////////////////////

        }
    });
            console.log("email: "+document.getElementById("inputEmail").value);
            console.log("pass: "+document.getElementById("inputPassword1").value);


};

function Change(){
  console.log("change");
  console.log("text: "+document.getElementById("inputUsername").value);
    var url="https://karmics.firebaseio.com/users/.json";
$.getJSON( url, function( data ) {
    x=1;
    y=1;
    $.each(data,function(key,val){
        ///////////////// USERNAME
        if(x==1){
            if(val.username==document.getElementById("inputUsername").value){
                console.log("coincidenciaUsername");
                //errorUsername=true; 
                errorUsername2=true;
                document.getElementById("inputUsername").style.backgroundColor="#F75D59";
                    //errorUsername=false;
                x=0;
            }
            else{
                errorUsername2=false;
                document.getElementById("inputUsername").style.backgroundColor="white";
            }
        }
        /////////////////// PASSWORD
        if(document.getElementById("inputPassword1").value!=document.getElementById("inputPassword2").value){
            //console.log("errorPassword");

            errorPassword=true; errorPassword2=true;
            document.getElementById("inputPassword1").style.backgroundColor="#F75D59";
            document.getElementById("inputPassword2").style.backgroundColor="#F75D59";
        }
        else{
            errorPassword2=false;
            if(!errorPassword){
                document.getElementById("inputPassword1").style.backgroundColor="white";
                document.getElementById("inputPassword2").style.backgroundColor="white";
            }
            errorPassword=false;
        }

        ///////////////// EMAIL
        if(y==1){
            if(val.email==document.getElementById("inputEmail").value){
                console.log("coincidenciaEmail");
                errorEmail=true; errorEmail2=true;
                document.getElementById("inputEmail").style.backgroundColor="#F75D59";
                errorEmail=false; 
                y=0;
            }
            else{
                errorEmail2=false;
                document.getElementById("inputEmail").style.backgroundColor="white";
            }
        }
    });
    /*if(errorEmail){
        document.getElementById("inputEmail").style.backgroundColor="#F75D59";
        errorEmail=false;
    }
    else{
        document.getElementById("inputEmail").style.backgroundColor="white";
    }*/


    console.log(errorEmail2); 
    Checking();
});

 console.log("------"); 



};
function Checking(){
  //Change();
  console.log("Checking...");
  //console.log("###");
  //console.log("email: "+errorEmail); console.log("username: "+errorUsername); 
  console.log("email: "+errorEmail2);
  //console.log("###");

  if((!(errorPassword2) && !(errorUsername2) && !(errorEmail2))&&((document.getElementById("inputEmail").value!="")&&(document.getElementById("inputUsername").value!="")&&(document.getElementById("inputPassword1").value!="")&&(document.getElementById("inputPassword2").value!=""))){ 

            document.getElementById("SignUpBtn").disabled=false;

  }else{
            document.getElementById("SignUpBtn").disabled=true;
        }
};