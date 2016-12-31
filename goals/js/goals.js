var user;
                    var snapshotkey="";
                    window.onload = function parseURL() {
                var url = document.location.href;
                var urlP = url.replace(/#^\?/, '').split('&');
                for( i = 0; i < urlP.length; i++ ) {
                    split = urlP[i].split('=');
                    window.user=split[1];
                }
            document.getElementById('user').innerHTML = user;
            document.getElementById('user').style.fontSize = "x-large";
            document.getElementById('user').style.left = "100%";
            //document.getElementById('user').style.up = "100%";
            //hi
            document.getElementById('user').style.color="#E5E4E2";
                        
                        var urlinicial = new Firebase("https://karmics.firebaseio.com/users");
                        var ObtenerSnapshotkey=urlinicial.orderByChild("username").equalTo(user).on("child_added", function(snapshot) {
                                            window.snapshotkey = snapshot.key(); 
                                            });
            }
                console.log(snapshotkey);    
                    var url=""; var deadline=""; var title=""; var instructions=""; var completions=0;
                    
                    // CHILD ADDED__________________________________________
            // Get a database reference to our posts
            var ref = new Firebase("https://karmics.firebaseio.com/posts/");
            // Retrieve new posts as they are added to our database
            ref.orderByChild("status").equalTo("goal").on("child_added", function(snapshot, prevChildKey) {
                var newGoal = snapshot.val(); window.snapshotkey = snapshot.key();
                url=newGoal.url; deadline=newGoal.deadline; title=newGoal.title; instructions=newGoal.instructions; completions=newGoal.completions;
                
                
                console.log("CHILD_ADDED"); /*console.log("avh1: " + newGoal.achievement1); console.log("ach2: " + newGoal.achievement2); console.log("ach3: " + newGoal.achievement3); console.log("comp: " + newGoal.completions); console.log("deadline: " + newGoal.deadline); console.log("desc: " + newGoal.instructions);*/ console.log("title: " + newGoal.title); 
                //console.log(newGoal.url);
                //console.log("Previous Post ID: " + prevChildKey);
                    
                        //var div = document.createElement('div'); div.id = "postDiv";
                        //var place = document.getElementById('posts');
                        //div.innerHTML = '<div>New usrname: '+newPost.user+'</div><br><br>';
                        //place.appendChild(div);
                        //document.body.appendChild(div);  
                //console.log("0000: "+title); console.log("11: "+deadline);
                if(user==newGoal.user){
                    $("#goals").append('<div class="col-sm-4 col-lg-4 col-md-4" id="'+snapshotkey+'"><div class="thumbnail"><img src="img/'+newGoal.url+'" alt="" style="display: block; object-fit:cover;"><div class="caption"><h4 class="pull-right">'+newGoal.deadline+'</h4><h4 onclick="goalFn(\''+snapshotkey+'\');"><a>'+newGoal.title+'</a></h4><p>'+newGoal.instructions+'<span onclick="goalFn(\''+snapshotkey+'\');"><a><font size="4">[...]</font></a></span></p></div><div class="ratings"><p class="pull-right"><a href="" style="color:#0B610B">'+newGoal.completions+' completions</a></p><p><button id="'+snapshotkey+'Btn" type="button" class="btn btn-default" onclick="myFunction(\''+snapshotkey+'\',url,deadline,title,instructions,completions)">Complete</button></p></div></div></div>'); console.log("_____");
                }
            });
            
            // CHILD CHANGED__________________________________________
            // Get the data on a post that has changed
            ref.on("child_changed", function(snapshot) {
                var changedPost = snapshot.val();
                console.log("CHILD_CHANGED"); console.log("The updated post user is '" + changedPost.user+"'"); console.log("The updated post title is " + changedPost.title); console.log("___");
            });
            
            // CHILD REMOVED_________________________________________
            // Get the data on a post that has been removed
            ref.on("child_removed", function(snapshot) {
                var deletedPost = snapshot.val();
                console.log("CHILD_REMOVED"); console.log("The blog post titled '" + deletedPost.title + "' has been deleted by '" + deletedPost.user +"'"); console.log("___");
            });
            var myFunction = function (postKey,url,deadline,title,instructions,completions){
                       window.location.href ="new-post.html?u="+user+"&g="+postKey;     
                    };        
            var changePage=function(page){
                window.location.href =page+".html?u="+user;
            };
            function goalFn(key){
                console.log(key);
                window.location.href ="goal.html?u="+user+"&g="+key;
            };