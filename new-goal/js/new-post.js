$(function() {
            $( "#datepicker" ).datepicker({ dateFormat:'dd/mm/yy', maxDate:0, showAnim:'fadeIn' });
        });

var approveTitle=false;
var approveInstructions=false;
var approveDate=false;
var helpOfOthers="no";
var snapshotkey; var postKey; var starsClicked; var starsRated=3;
var user; var user2; var referencePost=false;

    $(document).ready(function() {
        console.log("READY");

        var url = document.location.href;

        var urlP = url.replace(/#^\?/, '').split('&');
        console.log("urlP");console.log(urlP);

        splitBefore = urlP.toString().split('?');
        console.log("spliB");console.log(splitBefore);

            splitMany = splitBefore.toString().split(',');
            for(var i=1;i<splitMany.length;i++){
                split = splitMany[i].toString().split('=');
                console.log(split);
                if(split[0]=="u"){
                    window.user=split[1];
                }
                else if(split[0]=="g"){
                    window.snapshotkey=split[1];
                    window.postKey=split[1];
                    window.referencePost=true;

                    document.getElementById('title').style.borderColor = "#777";
                    document.getElementById('title').onkeyup = null;
                    document.getElementById('title').onclick = "Checking();";
                    document.getElementById('title').onfocus = null;
                    $( "#title" ).keyup(function() {
                        Checking();
                    });         approveTitle=true;
                    $( "#instructions" ).keyup(function() {
                        Checking();
                    });

                    Checking();
                    //style="border:1px; border-style:solid; border-color:#FF0000;" 
                    //onkeyup="this.style.backgroundColor='green'; this.style.removeProperty('border'); approveTitle=true; Checking();" 
                    //onclick='this.innerHTML = ""; this.onclick=null;' 
                    //onfocus='this.innerHTML = ""; this.onfocus=null;'

                    //helpDetailsText, date, instructions, title
                }
            }
        var usersFind = new Firebase("https://karmics.firebaseio.com/users");
            var urlquery=usersFind.orderByChild("username").equalTo(user).on("child_added", function(snapshot) {
                window.snapshotkey = snapshot.key();  console.log(snapshotkey);
        });
    document.getElementById('user').innerHTML = user;
    document.getElementById('user').style.fontSize = "x-large";
    document.getElementById('user').style.left = "100%";
    document.getElementById('user').style.color="#E5E4E2";
    document.getElementById("CommitBtn").disabled=true;
    //document.getElementById("business-header").style.background='http://placehold.it/300x300';
    //$("business-header").css({"background":"url('http://placehold.it/1920x400') center center no-repeat scroll"});console.log("YA");
    });
    //document.getElementById("achievement3").style.backgroundColor="green";

//setInterval(Checking, 1000);
    $(window).load(function() {
        if(referencePost){
            console.log(snapshotkey);
            console.log("LOAD");
            var url="https://karmics.firebaseio.com/posts/"+snapshotkey+"/.json";
            //console.log(url);
            $.getJSON( url, function( data ) {
                    x=1; y=1;
                    $.each(data,function(key,val){
                        if(key=="title"){
                            document.getElementById('title').innerHTML = val;
                        }
                        else if(key=="user"){
                            //document.getElementById('user2').innerHTML = "<a>"+val+"</a>";
                            window.user2=val;
                            if(user==user2){
                                //document.getElementById("CommitBtn").disabled=true;
                            }
                        }
                        else if(key=="completions"){
                                //window.completions=val;
                            }
                        else if(key=="url"){
                            document.getElementById('business-header').style.background="url('img/"+val+"') center center";
                            document.getElementById('business-header').style.backgroundSize="cover";
                        }
                    });
            });
        }
    });
function myFunction() {
        var usersRef = new Firebase("https://karmics.firebaseio.com/posts/"+postKey);
        console.log("postKey: "+postKey);
        var objToWrite = new Object();
        objToWrite.status = "post";
        objToWrite.experience = document.getElementById("instructions").innerHTML;
        objToWrite.date = document.getElementById("datepicker").value;
        objToWrite.rating=starsRated;
        console.log(objToWrite);
        usersRef.once("value", function(snapshot) {
            console.log("has status true");
            usersRef.update(objToWrite,function(error) {
                if (error) {
                    console.log("Data could not be saved." + error);
                } else {
                    console.log("Data saved successfully.");
                }
            });
        });

        console.log("loading profile...");
                    var url="https://karmics.firebaseio.com/users/.json";
                    $.getJSON( url, function( data ) {
                        x=1; y=1;
                        $.each(data,function(key,val){
                            ///////////////// USERNAME
                            if(x==1){
                                if(val.username==user){ 
                                    console.log("username encontrado");

                                    // Get a database reference to our posts
                                    var usersRef = new Firebase("https://karmics.firebaseio.com/users");
                                    console.log(snapshotkey);console.log("5555555555555555");
                                    var date = new Date();var m_names = ['January', 'February', 'March', 
                                    'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
                                    var month = m_names[date.getMonth()]; var year = date.getFullYear();
                                    var fulldate='-'+month+","+year;

                                    var usersRef = new Firebase("https://karmics.firebaseio.com/users/"+snapshotkey+"/activity");

                                    /*usersRef.limitToLast(1).once("value", function(snapshot) {
                                        snapshot.forEach(function(childSnapshot) {
                                            if(childSnapshot.hasChild(fulldate)){
                                            console.log('firstTRUE');
                                        }
                                        });
                                    });*/

                                    usersRef.limitToLast(1).once("value", function(snapshot) {
                                        snapshot.forEach(function(childSnapshot) {
                                            console.log(childSnapshot.val());
                                            console.log(fulldate);
                                            if(!childSnapshot.hasChild(fulldate)){
                                                console.log("has child false");
                                                var objToPush={
                                                    "karmics": 300,
                                                    "completions": 500,
                                                    "awards": 0,
                                                    "sustainability":0
                                                };
                                                objToPush[fulldate]='date indicator';
                                                usersRef.push(objToPush, function(error) {
                                                    if (error) {
                                                            console.log("Data could not be saved." + error);
                                                    } else {
                                                        console.log("Data saved successfully.");
                                                        window.location.href ="feed.html?u="+user;
                                                    }
                                                });
                                            }
                                            else{
                                                console.log("has child TRUE");
                                                var objToWrite = new Object();
                                                console.log(childSnapshot.val()["karmics"]);
                                                objToWrite.karmics=childSnapshot.val()["karmics"]+300;
                                                objToWrite.completions=childSnapshot.val()["completions"]+500;
                                                objToWrite.awards=childSnapshot.val()["awards"];
                                                objToWrite.sustainability=childSnapshot.val()["sustainability"];
                                                console.log(childSnapshot.key())
                                                usersRef.child(childSnapshot.key()).update(objToWrite,function(error) {
                                                    if (error) {
                                                        console.log("Data could not be saved." + error);
                                                    } else {
                                                        console.log("Data saved successfully.");
                                                        window.location.href ="feed.html?u="+user; 
                                                    }
                                                });

                                            }
                                        });
                                    });
                                    x=0;
                                }
                            }
                        });
                    });
    };
function Checking(){
      console.log("Checking...");

          if(((approveTitle)&&(approveInstructions)&&(approveDate)&&(starsClicked))/*&&((document.getElementById("title").innerHTML!="")&&(document.getElementById("instructions").innerHTML!="")&&(document.getElementById("date").innerHTML!=""))*/)
            {
                document.getElementById("CommitBtn").disabled=false;

            }else{
                document.getElementById("CommitBtn").disabled=true;
            }
  };
function helpDetailsfn(){
    if((document.getElementById("helpDetailsText").value=="*Optional*")||(document.getElementById("helpDetailsText").value=="")){
        helpDetails="none";
    }
    else{
        helpDetails=document.getElementById("helpDetailsText").innerHTML;
    }
};
var rating = function(){
    starsClicked=true;
    document.getElementById('starsDiv').style.border = "none";
    Checking();
};