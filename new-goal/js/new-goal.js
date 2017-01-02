$(function() {
            $( "#date" ).datepicker({ dateFormat:'dd/mm/yy', minDate:0, showAnim:'fadeIn' });
        });

var approveTitle=false;
var approveInstructions=false;
var approveDate=false;
var helpOfOthers="no";
var helpDetails="none";
var snapshotkey;
var user; var user2; var user2Found; var referencePost=false;

    $(document).ready(function() {
        console.log("READY");


        document.getElementById('helpDetails').style.display = "none";
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
                else if(split[0]=="p" || split[0]=="g"){
                    window.snapshotkey=split[1];
                    window.referencePost=true;

                    document.getElementById('title').style.borderColor = "#777";
                    document.getElementById('title').onkeyup = null;
                    document.getElementById('title').onclick = "Checking();";
                    document.getElementById('title').onfocus = null;
                    $( "#title" ).keyup(function() {
                        Checking();
                    });         approveTitle=true;
                    document.getElementById('instructions').style.borderColor = "#777";
                    document.getElementById('instructions').onkeyup = null;
                    document.getElementById('instructions').onclick = "Checking();";
                    document.getElementById('instructions').onfocus = null;
                    $( "#instructions" ).keyup(function() {
                        Checking();
                    });         approveInstructions=true;

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

        $("[name='my-checkbox']").bootstrapSwitch();
        $('input[name="my-checkbox"]').on('switchChange.bootstrapSwitch', function(event, state) {
            console.log(state);
            if(state){
                helpOfOthers="yes";
                document.getElementById('helpDetails').style.display = "block";
            }else{
                helpOfOthers="no";
                document.getElementById('helpDetails').style.display = "none";
            }
            console.log(helpOfOthers);
        });


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
                        else if(key=="instructions"){
                            document.getElementById('instructions').innerHTML = val;
                        }
                        else if(key=="user"){
                            //document.getElementById('user2').innerHTML = "<a>"+val+"</a>";
                            window.user2=val; window.user2Found=true;
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
                            if(referencePost){
                    alert("If you don't have the exact same goal as this person, just change the details to match your own!");
                }
                                //flex-shrink:0;
                                //min-width:100%;
                                //min-height:100%
                                //document.getElementById('business-header').style.backgroundPosition"center center";
                            console.log("YA");
                        }
                        if(user2Found){
                                //document.getElementById('helpDetailsText').innerHTML = "Join <a>"+user2+"</a> and <a>"+completions+" others</a>!"
                        }
                    });
            });
        }
    });
function myFunction() { 
        var url="https://karmics.firebaseio.com/posts/.json";


        // Get a database reference to our posts
        var ref = new Firebase("https://karmics.firebaseio.com/");

        //WRITING DATA WITH SET
        var usersRef = ref.child("posts");
        if(helpOfOthers=="yes"){
            usersRef.push({
                    //document.getElementById("inputUsername").value

                    "title": document.getElementById("title").innerHTML,
                    "instructions": document.getElementById("instructions").innerHTML,
                    "deadline": document.getElementById("date").value,
                    "completions":0,
                    "comments":0,
                    "status":"goal",
                    "user":user,
                    "help":helpOfOthers,
                    "helpDetails":helpDetails,
                    "helpers":0
            }, function(error) {
                if (error) {
                    console.log("Data could not be saved." + error);
                } else {
                    console.log("Data saved successfully.");
                    window.location.href = "goals.html?u="+user;
                }
            });
        }
        else if(helpOfOthers=="no"){
            usersRef.push({
                    //document.getElementById("inputUsername").value

                    "title": document.getElementById("title").innerHTML,
                    "instructions": document.getElementById("instructions").innerHTML,
                    "deadline": document.getElementById("date").value,
                    "completions":0,
                    "comments":0,
                    "status":"goal",
                    "user":user,
                    "help":helpOfOthers
            }, function(error) {
                if (error) {
                    console.log("Data could not be saved." + error);
                } else {
                    console.log("Data saved successfully.");
                    window.location.href = "goals.html?u="+user;
                }
            });
        }
    };
function Checking(){
      console.log("Checking...");

          if(((approveTitle)&&(approveInstructions)&&(approveDate))/*&&((document.getElementById("title").innerHTML!="")&&(document.getElementById("instructions").innerHTML!="")&&(document.getElementById("date").innerHTML!=""))*/)
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