var user; var snapshotkey; var userKey;
        var karmics; var completions; var awards; var sustainability;
        var linechart;
                $(document).ready(function() {
                    console.log("READY");
                var url = document.location.href;
                var urlP = url.replace(/#^\?/, '').split('&');
                for( i = 0; i < urlP.length; i++ ) {
                    split = urlP[i].split('=');
                    window.user=split[1];
                }
                    var usersRef = new Firebase("https://karmics.firebaseio.com/users");
                    var urlquery=usersRef.orderByChild("username").equalTo(user).on("child_added", function(snapshot) {
                        window.snapshotkey=snapshot.key(); window.userKey=snapshot.key();  console.log(snapshotkey);
                        
                        //console.log("https://karmics.firebaseio.com/users/"+snapshotkey+"/chat");
                        var ref = new Firebase("https://karmics.firebaseio.com/users/"+snapshotkey);
                        ref.child("chat").on("child_added", function(snapshot, prevChildKey) {
                            var newComment = snapshot.val();
                            var profilePic;

                            $("#Chat").append("<li class='left clearfix'><span class='chat-img pull-left'><img src='http://placehold.it/50/55C1E7/fff' alt='User Avatar' class='img-circle' /></span><div class='chat-body clearfix'><div class='header'><strong class='primary-font'>"+newComment.user+"</strong><small class='pull-right text-muted'><i class='fa fa-clock-o fa-fw'></i>"+newComment.date+"</small></div><p>"+newComment.comment+"</p></div></li>");
                        });
                        
                        ref.child("notifications").on("child_added", function(snapshot, prevChildKey) {
                            var newNotification = snapshot.val();
                            $("#notificationPanel").append('<a href="" class="list-group-item"><i class="fa fa-'+notificationType(newNotification.type)+' fa-fw"></i> '+newNotification.notification+'<span class="pull-right text-muted small"><em>'+newNotification.date+'</em></span></a>');
                        });
                        
                        // CHILD CHANGED__________________________________________
                        // Get the data on a post that has changed
                        var ref = new Firebase("https://karmics.firebaseio.com/users/"+snapshotkey);
                        ref.on("child_changed", function(snapshot) {
                            var changedPost = snapshot.val();
                            console.log("CHILD_CHANGED"); refresh();
                        });
                    });
            document.getElementById('btn-chat').disabled=true;
            document.getElementById('user').style.fontSize = "xxx-large";
            //document.getElementById('user').style.left = "100%";
            //document.getElementById('user').style.up = "100%";
            //document.getElementById('user').style.color="#E5E4E2";
               
             console.log("------");
                    console.log("loading profile...");
                    
                });
                ///////////////////////////////////////
                $(window).load(function() {
                        console.log("LOAD");
                        refresh();
                    
                        // CHILD ADDED__________________________________________
                        var ref = new Firebase("https://karmics.firebaseio.com/posts/");
                        //ref=ref.orderByChild("status").equalTo("post");
                        //console.log(user);
                        ref.orderByChild("user").equalTo(user).on("child_added", function(snapshot, prevChildKey) {
                            var newPost = snapshot.val(); window.snapshotkey = snapshot.key();
                            console.log(snapshotkey);
                                $(".timeline").append(leftRight()+'<div class="timeline-badge '+fontAwesomeColor(newPost.status)+'"><i class="fa '+fontAwesome(newPost.status)+'"></i></div><div class="timeline-panel"><div class="timeline-heading"><h4 class="timeline-title" onclick="postOrGoal(\''+snapshotkey+'\',\''+newPost.status+'\')"><a>'+newPost.title+'</a></h4><p><small class="text-muted"><i class="fa '+fontAwesome2(newPost.status)+' fa-lg"></i> '+eval(deadline(newPost.deadline,newPost.status))+'</small></p></div><div class="timeline-body"><div class="thumbnail"><img src="img/'+newPost.url+'"  style="display: block; object-fit:cover;"><h4><i class="fa fa-globe fa-lg"></i> <a>'+newPost.completions+'</a> completions</h4><p></p><p>'+newPost.experience+'<span onclick="postOrGoal(\''+snapshotkey+'\',\''+newPost.status+'\')"><a><font size="4">[...]</font></a></span></p></div></div></div></li>'); console.log("___");
                            comments=0;
                        });
                    
                        var fileButton=document.getElementById("fileButton");
                        fileButton.addEventListener('change',function(e){
                            file=e.target.files[0];
                            if(file!=null){
                                document.getElementById("uploadButton").disabled=false;
                            }
                            else{
                                document.getElementById("uploadButton").disabled=true;
                            }
                        });
                    });
                //////////////////////////
            var changePage=function(page){
                window.location.href =page+".html?u="+user;
            };
            /*var update = function(){
                lineChart.update({
                                        labels: ["one","two","three"],
                                        series: [[0,1,5000],[0,2,6000],[0,3,7000],[0,4,8000]]
                                        
                                        //"August-2017":5000
                                    },{
                                        width: 500,
                                        height: 300,
                                        showPoint: false
                                        },true);console.log("YA");
            refresh();
            };*/
            var refresh = function(){
                var url="https://karmics.firebaseio.com/users/.json";
                    $.getJSON( url, function( data ) {
                        x=1; y=1;
                        $.each(data,function(key,val){
                            ///////////////// USERNAME
                            if(x==1){
                                if(val.username==user){
                                    console.log("username encontrado"); document.getElementById('user').innerHTML = user;

                                    ////LAST 30 DAYS
                                    
                                        var dataLabels=[];
                                        dataLabels[0]="Big Bang";
                                        var dataSeriesBefore=[];
                                        for(var property in val.activity){
                                            var dataSeriesElement=[];
                                            for(var prop in val.activity[property]){
                                                if((prop=="awards") || (prop=="completions") || (prop=="karmics") || (prop=="sustainability")){
                                                    //console.log(prop+": "+val.activity[property][prop]);
                                                    dataSeriesElement.push(val.activity[property][prop]);
                                                }
                                                else{
                                                    dataLabels.push(prop);
                                                }
                                            }
                                            dataSeriesBefore.push(dataSeriesElement);
                                        }
                                    var awards=0; var completions=0; var karmics=0; var sustainability=0;
                                        var dataSeries=[];
                                        c=0;
                                        for(var w=0;w<4;w++){
                                                var dataSeriesElement=[];
                                                for(var j=0;j<dataSeriesBefore.length;j++){
                                                    dataSeriesElement.push(dataSeriesBefore[j][w]);
                                                    if(w==0){
                                                        awards+=dataSeriesBefore[j][w];
                                                    }
                                                    else if(w==1){
                                                        completions+=dataSeriesBefore[j][w];
                                                    }
                                                    else if(w==2){
                                                        karmics+=dataSeriesBefore[j][w];
                                                    }
                                                    else if(w==3){
                                                        sustainability+=dataSeriesBefore[j][w];
                                                    }
                                                }
                                                dataSeries.push(dataSeriesElement);
                                        }
                                        
                                        //console.log(dataLabels);
                                        //console.log(dataSeriesBefore);
                                        //console.log(dataSeries);
                                    
                                    lineChart= new Chartist.Line('.ct-chart', {
                                        labels: dataLabels,
                                        series: dataSeries
                                        //[[0,1,500],[0,2,600],[0,3,700],[0,4,800]]
                                    },{
                                        width: 500,
                                        height: 300,
                                        showPoint: false
                                        });
                                    var date = new Date();var m_names = ['January', 'February', 'March', 
                                    'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
                                    var month = m_names[date.getMonth()]; var year = date.getFullYear();
                                    var fulldate=month+"-"+year;
                                    /*
                                    karmics=val.activity[fulldate].karmics;
                                    completions=val.activity[fulldate].completions;
                                    awards=val.activity[fulldate].awards;
                                    sustainability=val.activity[fulldate].sustainability;
                                    */
                                    //awards=dataSeriesBefore[dataSeriesBefore.length-1][0];
                                    //completions=dataSeriesBefore[dataSeriesBefore.length-1][1];
                                    //karmics=dataSeriesBefore[dataSeriesBefore.length-1][2];
                                    //sustainability=dataSeriesBefore[dataSeriesBefore.length-1][3];
                                        document.getElementById('karmics').innerHTML = karmics;
                                        document.getElementById('completions').innerHTML = completions;
                                        document.getElementById('awards').innerHTML = awards;
                                        document.getElementById('sustainability').innerHTML = sustainability;
                                        document.getElementById("profilePicture").src=val.profilePicture;

                                    //PREFERRED CATEGORIES
                                    var data = {
                                        labels: ['Mind', 'Body', 'Spirit'],
                                        series: [val.mind, val.body, val.spirit]
                                    };

                                    var options = {
                                        labelInterpolationFnc: function(value) {
                                            return value[0]
                                        }
                                    };

                                    var responsiveOptions = [
                                        ['screen and (min-width: 640px)', {
                                            chartPadding: 30,
                                            labelOffset: 100,
                                            labelDirection: 'explode',
                                            labelInterpolationFnc: function(value) {
                                                return value;
                                            }
                                        }],['screen and (min-width: 1024px)', {
                                            labelOffset: 0,
                                            chartPadding: 0
                                        }]
                                    ];
                                    new Chartist.Pie('.ct-pie', data, options, responsiveOptions);
                                    
                                    if(val.description!=null){
                                        document.getElementById("description").innerHTML=val.description;
                                    }
                                    x=0;
                                }
                            }
                        });
                    });  
            };
        var newCommentFn = function(){
            var date = new Date();var m_names = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            var month = m_names[date.getMonth()]; var year = date.getFullYear();
            var fulldate=month+"-"+year;
            
            //WRITING DATA WITH PUSH
            var ref = new Firebase("https://karmics.firebaseio.com/users/"+userKey+"/chat/");
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
        var postOrGoal = function(key,status){
                console.log(key);console.log(status);
                if(status=="post"){
                    window.location.href ="post.html?u="+user+"&p="+key;
                }
                else{
                    window.location.href ="goal.html?u="+user+"&g="+key;
                }
            };
        var right;
        var leftRight=function(){
            if(right){
                right=false;
                return '<li class="timeline-inverted">';
            }
            else{
                right=true;
                return '<li>';
            }
        };
        var fontAwesome=function(status){
            //console.log(status);
            if(status=="post"){
                return 'fa-check';
            }
            else{
                return 'fa-sticky-note';
            }
        };
        var fontAwesome2=function(status){
            //console.log(status);
            if(status=="post"){
                return 'fa-calendar';
            }
            else{
                return 'fa-clock-o';
            }
        };
        var fontAwesomeColor=function(status){
            //console.log(status);
            if(status=="post"){
                return 'success';
            }
            else{
                return 'warning';
            }
        };
        var deadline=function(deadline,status){
            if(status=="post"){
                return 'newPost.date';
            }
            else{
                return'newPost.deadline';
            }
        };
        var changeDescription=function(){
            document.getElementById("description").contentEditable=true;
            document.getElementById("descriptionDiv").style.border='2px solid red';
            document.getElementById("descriptionImage").innerHTML=' <i class="fa fa-save fa-2x" onclick="saveDescription()"></i>';
        };
        var saveDescription=function(){
            document.getElementById("description").contentEditable=false;
            document.getElementById("descriptionDiv").style.border='none';
            document.getElementById("descriptionImage").innerHTML=' <i class="fa fa-pencil fa-2x" onclick="changeDescription()"></i>';
            
            var usersRef = new Firebase("https://karmics.firebaseio.com/users/"+userKey);
                var objToWrite = new Object();
                objToWrite.description = document.getElementById("description").innerHTML;
                console.log(objToWrite);
                usersRef.once("value", function(snapshot) {
                    usersRef.update(objToWrite,function(error) {
                        if (error) {
                            console.log("Data could not be saved." + error);
                        } else {
                            console.log("Data saved successfully.");
                        }
                    });
                });
        };
        var notificationType=function(type){
            if(type=="facebook"){
                return "facebook-square";
            }
            else if(type=="reddit"){
                return "reddit-alien";
            }
            else if(type=="twitter"){
                return "twitter";
            }
            else if(type=="created-account"){
                return "birthday-cake";
            }
        }
        
        
        
        
        // Initialize Firebase
    var config = {
    apiKey: "AIzaSyCtvXCT_GQpvpPARuRFv-oOi4nz5eHWLUQ",
    authDomain: "karmics.firebaseapp.com",
    databaseURL: "https://karmics.firebaseio.com",
    storageBucket: "firebase-karmics.appspot.com",
    messagingSenderId: "366737783416"
    };
    firebase.initializeApp(config);
    var file;
    
    var uploadFile=function(){
        $('#mymodal').modal('hide');
        if(window.file!=null){
            document.getElementById("uploader").style.display="block";
            var uploader=document.getElementById("uploader");
            var storageRef=window.firebase.storage().ref(user+'/'+ /*file.name*/ 'profilePic.jpg');
            var task=storageRef.put(file);
            task.on('state_changed',function progress(snapshot){
                var percentage=(snapshot.bytesTransferred / snapshot.totalBytes)*100;
                uploader.value=percentage;
            },function error(err){
                console.log("error uploading file!");
            },function complete(){
                $('#uploadAccordion').collapse('hide');
                document.getElementById("uploadButton").disabled=true;
                document.getElementById("uploader").style.display="none";
                
                //var storageRef = firebase.storage().ref();
                //var tangRef = storageRef.child(user+'/'+ /*file.name*/ 'profilePic.jpg');
                /*firebase.auth().signInAnonymously().then(function() {

                  tangRef.getDownloadURL().then(function(url){
                    console.log(url);
                    document.getElementById('profilePicture').src = url;
                  }).catch(function(error) {
                    console.error(error);
                  });
                });*/
                
                var storageRef = firebase.storage().ref();
                
                //console.log('R: '+storageRef.child(user+'/profilePic.jpg').updateMetadata({"key":"value"})['code']);
                //console.log('W: '+storageRef.child(user+'/profilessPic.jpg').updateMetadata({"key":"value"})['code']);
                
                storageRef.child(user+'/profilePic.jpg').getDownloadURL().then(function(url) {
                // Or inserted into an <img> element:
                document.getElementById('profilePicture').src = url;
                    
                var usersRef = new Firebase("https://karmics.firebaseio.com/users/"+userKey);
                var objToWrite = new Object();
                objToWrite.profilePicture = url;
                console.log(objToWrite);
                usersRef.once("value", function(snapshot) {
                    usersRef.update(objToWrite,function(error) {
                        if (error) {
                            console.log("Data could not be saved. "+error);
                        } else {
                            console.log("Data saved successfully.");
                        }
                    });
                });
                    
                }).catch(function(error) {
                // Handle any errors
                });
                });
        }
    }