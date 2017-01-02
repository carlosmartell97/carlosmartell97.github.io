/*$("#menu-toggle").click(function(e) {
        e.preventDefault();
        $("#wrapper").toggleClass("toggled");
    });*/
var user; var snapshotkey; var referenceChat;
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
            else if(split[0]=="c"){
                window.snapshotkey=split[1];
                window.referenceChat=true;
            }
        }
document.getElementById('btn-chat').disabled=true;
document.getElementById('user').innerHTML = user;
document.getElementById('user').style.fontSize = "x-large";
document.getElementById('user').style.left = "100%";
document.getElementById('user').style.color="#E5E4E2";
});
///////////////////////////////////////////////////////
$(window).load(function() {
        //console.log(normalNavbar());
        //$("#toBeHidden").append(normalNavbar());
        console.log("stKey: "+snapshotkey);

        var ref = new Firebase("https://karmics.firebaseio.com/chats");
        ref.on("child_added", function(snapshot, prevChildKey) {
            var newChat = snapshot;
            var messageUser="you";
            for(i=0;i<Object.keys(newChat.val()).length;i++){
                messageUser=(newChat.val()[Object.keys(newChat.val())[i]].user!=window.user)?newChat.val()[Object.keys(newChat.val())[i]].user:messageUser;   
            }
            console.log(messageUser);
            $("#chats").append('<li style="border-top: .25px solid #E5E4E2; border-bottom: .25px solid #E5E4E2"><a onclick="changeChat(\''+newChat.key()+'\'); $('+"'"+'#bs-example-navbar-collapse-1'+"'"+').collapse('+"'"+'hide'+"'"+'); ">'+messageUser+'</a></li>');
            checkSize();
        });
        if(referenceChat){
            document.getElementById("Chat").innerHTML="";
            ref=ref.child(snapshotkey);
            ref.on("child_added", function(snapshot, prevChildKey) {
                var newComment = snapshot.val();
                var profilePic;

                $("#Chat").append("<li class='left clearfix'><span class='chat-img pull-left'><img src='https://placehold.it/50/55C1E7/fff' alt='User Avatar' class='img-circle' /></span><div class='chat-body clearfix'><div class='header'><strong class='primary-font'>"+newComment.user+"</strong><small class='pull-right text-muted'><i class='fa fa-clock-o fa-fw'></i>"+newComment.date+"</small></div><p>"+newComment.comment+"</p></div></li>");
            });
        }
    });
///////////////////////////////////////////////////
$(window).resize(function() {
        checkSize();
    });
var changePage=function(page){
        window.location.href =page+".html?u="+user;
    };
var newCommentFn = function(){
    var date = new Date();var m_names = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    var month = m_names[date.getMonth()]; var year = date.getFullYear();
    var fulldate=month+"-"+year;

    //WRITING DATA WITH PUSH
    var ref = new Firebase("https://karmics.firebaseio.com/chats/"+snapshotkey);
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
};
var enterPress=function(e){
    if (event.which == 13 || event.keyCode == 13) {
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
var changeChat=function(chatKey){
    window.snapshotkey=chatKey;
    document.getElementById("Chat").innerHTML="";
    var ref = new Firebase("https://karmics.firebaseio.com/chats/"+chatKey);
        ref.on("child_added", function(snapshot, prevChildKey) {
            var newComment = snapshot.val();
            var profilePic;

            $("#Chat").append("<li class='left clearfix'><span class='chat-img pull-left'><img src='http://placehold.it/50/55C1E7/fff' alt='User Avatar' class='img-circle' /></span><div class='chat-body clearfix'><div class='header'><strong class='primary-font'>"+newComment.user+"</strong><small class='pull-right text-muted'><i class='fa fa-clock-o fa-fw'></i>"+newComment.date+"</small></div><p>"+newComment.comment+"</p></div></li>");
        });
};
var rearrangeChats=function(){
    console.log("REARRANGE");
    document.getElementById("chatsHeader").style="display:flex; align-items:center; justify-content:center";
    document.getElementById("toBeHidden").innerHTML=document.getElementById("chats").innerHTML;
};
var resetChats=function(){
    document.getElementById("chatsHeader").style="";
    document.getElementById("toBeHidden").innerHTML=normalNavbar();
};
var checkSize=function(){
    if ($(window).width() < 768) {
        rearrangeChats();
    }
    else{
        resetChats();
    }  
};
////////////////////START
///////                            <li><a >Chat</a></li><li><a onclick="changePage('profile')">My Profile</a></li><li><a >Settings</a></li><li id="user"><div></div></li>
var normalNavbar=function(){
    return "<li><a >Chat</a></li><li><a onclick="+'"'+"changePage('profile')"+'"'+">My Profile</a></li><li><a >Settings</a></li><li id="+'"'+"user"+'"'+"><div></div></li>";
}