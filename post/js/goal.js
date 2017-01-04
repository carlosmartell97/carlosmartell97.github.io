var approveTitle=false;
var approveexperience=false;
var approveDate=false;
var helpOfOthers="no";
var helpDetails="none";

var user; var snapshotkey; var completions;
var user2; var user2Found=false;

     $(document).ready(function() {
        var url = document.location.href;
        var urlP = url.replace(/#^\?/, '').split('&');
            splitBefore = urlP.toString().split('?');
            splitMany = splitBefore.toString().split(',');
            for(var i=1;i<splitMany.length;i++){
                split = splitMany[i].toString().split('=');
                console.log(split);
                if(split[0]=="u"){
                    window.user=split[1];
                }
                else if(split[0]=="g"){
                    window.snapshotkey=split[1];
                }
            }
    document.getElementById('btn-chat').disabled=true;
    document.getElementById('user').innerHTML = user;
    document.getElementById('user').style.fontSize = "x-large";
    document.getElementById('user').style.left = "100%";
    //document.getElementById('user').style.up = "100%";
    //hi
    document.getElementById('user').style.color="#E5E4E2";
    document.getElementById('helpDetails').style.display = "none";
    document.getElementById('helpDetailsText').style.display = "none";
    });

    $(window).load(function() {
        console.log(snapshotkey);
        var url="https://karmics.firebaseio.com/posts/"+snapshotkey+"/.json";
        console.log(url);
        $.getJSON( url, function( data ) {
                x=1; y=1;
                $.each(data,function(key,val){
                    if(key=="title"){
                        document.getElementById('title').innerHTML = val;
                    }
                    else if(key=="instructions"){
                        document.getElementById('instructions').innerHTML = val;
                    }
                    else if(key=="deadline"){
                        document.getElementById('deadline').innerHTML = val;
                    }
                    else if((key=="help")&&val=="yes"){
                        document.getElementById('helpDetails').style.display = "block";
                    }
                    else if((key=="helpDetails")&&val!="none"){
                        document.getElementById('helpDetailsText').style.display = "block";
                        document.getElementById('helpDetailsText').innerHTML = val;
                    }
                    else if(key=="user"){
                        document.getElementById('user2').innerHTML = "<a>"+val+"</a>";
                        window.user2=val; window.user2Found=true;
                        if(user==user2){
                            document.getElementById("CommitBtn").disabled=true;
                        }
                    }
                    else if(key=="completions"){
                            window.completions=val;
                        }
                    if(user2Found){
                            document.getElementById('commitDetails').innerHTML = "Join <a>"+user2+"</a> and <a>"+completions+" others</a>!";
                    }
                });
        });
        var ref = new Firebase("https://karmics.firebaseio.com/posts/"+snapshotkey+"/comments/");
        ref.on("child_added", function(snapshot, prevChildKey) {
            var newComment = snapshot.val();
            var profilePic;
            
            $("#Chat").append("<li class='left clearfix'><span class='chat-img pull-left'><img src='"+imageURL(newComment.user)+"' alt='User Avatar' class='img-circle' style='height:55px; width:55px; display: block; object-fit:cover;'/></span><div class='chat-body clearfix'><div class='header'><strong class='primary-font'>"+newComment.user+"</strong><small class='pull-right text-muted'><i class='fa fa-clock-o fa-fw'></i>"+newComment.date+"</small></div><p>"+newComment.comment+"</p></div></li>");
            
        });
    });

function CommitFn() { 
        window.location.href ="new-goal.html?u="+user+"&g="+snapshotkey; 
    };
function HelpFn() { 
        console.log("HelpFn()");
    };
function Checking(){
      console.log("Checking...");

          if((approveTitle)&&(approveexperience)&&(approveDate))
            {
                document.getElementById("CommitBtn").disabled=false;

            }else{
                document.getElementById("CommitBtn").disabled=true;
            }
  };
var changePage=function(page){
        window.location.href =page+".html?u="+user;
    };
var newCommentFn = function(){
    var date = new Date();var m_names = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    var month = m_names[date.getMonth()]; var year = date.getFullYear();
    var fulldate=month+"-"+year;

    //WRITING DATA WITH PUSH
    var ref = new Firebase("https://karmics.firebaseio.com/posts/"+snapshotkey+"/comments/");
    ref.push({
            //document.getElementById("inputUsername").value

            "user": user,
            "comment": document.getElementById("comment-input").value,
            "date": fulldate
    }, function(error) {
        if (error) {
            console.log("Data could not be saved." + error);
        } else {
            console.log("Data saved successfully.");
        }
    });
    document.getElementById("comment-input").value="";
    document.getElementById('btn-chat').disabled=true;
}
var enterPress=function(e){
    if ((event.which == 13 || event.keyCode == 13)&&(document.getElementById('comment-input').value!="")) {
    //code to execute here
    return true;
    }
    return false;
};
var checkComment = function(){
    if(document.getElementById('comment-input').value==""){
        document.getElementById('btn-chat').disabled=true;
    }
    else{
        document.getElementById('btn-chat').disabled=false;
    }
};
var imageURL=function(user){
        var token;
        $.getJSON("https://firebasestorage.googleapis.com/v0/b/firebase-karmics.appspot.com/o/"+user+"%2FprofilePic.jpg", function( data ) {
//            console.log(data.dataType);
            token=data.downloadTokens;
        }).done(function() {
            console.log( "second success" );
        }).fail(function() {
            console.log( "error" );
        });
        if(token!=undefined){
            return "img/profile_250x250.jpg";
        }
        else{
            return "https://firebasestorage.googleapis.com/v0/b/firebase-karmics.appspot.com/o/"+user+"%2FprofilePic.jpg"+"?alt=media&token="+token;
        }
    
};