var user; var snapshotkey="";
            var comments=0;
            window.onload = function parseURL() {
                var url = document.location.href;
                var urlP = url.replace(/#^\?/, '').split('&');
                for( i = 0; i < urlP.length; i++ ) {
                    split = urlP[i].split('=');
                    window.user=split[1];
                }
            document.getElementById('user').innerHTML = "Hi, "+user;
            document.getElementById('user').style.fontSize = "x-large";
            document.getElementById('user').style.left = "100%";
            //document.getElementById('user').style.up = "100%";
            //hi
            document.getElementById('user').style.color="#E5E4E2";
                
                alert("This is a preview of what your feed would look like when you've gained a few friends!");
            }
    
            // CHILD ADDED__________________________________________
            var ref = new Firebase("https://karmics.firebaseio.com/posts/");
            // Retrieve new posts as they are added to our database
            ref.orderByChild("status").equalTo("post").on("child_added", function(snapshot, prevChildKey) {
                var newPost = snapshot.val(); window.snapshotkey = snapshot.key();
                //console.log("CHILD_ADDED"); console.log("User: " + newPost.user); 
                console.log("Title: " + newPost.title); //console.log("Info: " + newPost.info);
                //console.log("Previous Post ID: " + prevChildKey);
                //console.log(newPost.url);
                        ref.child(snapshotkey).child("comments").on("child_added", function(snapshot) {
                            //console.log(snapshot.key());
                            comments++;
                        });
                console.log(snapshotkey);
                    $("#posts").append('<div class="col-sm-4 col-lg-4 col-md-4"><div class="thumbnail"><img src="'+newPost.url+'"  style="display: block; object-fit:cover;"><div class="caption"><h6 class="pull-right">'+newPost.user+'<button type="button" class="btn btn-xs btn-info"><img src="img/flag-icon.png" style="width:15px; height:15px"></button></h6><h4 onclick="postFn(\''+snapshotkey+'\')"><a >'+newPost.title+'</a></h4><p>'+newPost.experience+'<span onclick="postFn(\''+snapshotkey+'\')"><a ><font size="4">[...]</font></a></span></p></div><div class="ratings"><p class="pull-right" onclick="postFn(\''+snapshotkey+'\')"><a  style="color:#B40404">'+comments+' comments</a></p><p>'+starsHTML(newPost.rating)+'</p></div></div></div>'); console.log("___");
                comments=0;
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
            var changePage=function(page){
                window.location.href =page+".html?u="+user;
            }
            var postFn = function(key){
                console.log(key);
                window.location.href ="post.html?u="+user+"&p="+key;
            };
            var starsHTML = function(stars){
                var result="";
                for(i=0;i<stars;i++){
                    result+='<span class="glyphicon glyphicon-star"></span>';
                }
                for(i=0;i<(5-stars);i++){
                    result+='<span class="glyphicon glyphicon-star-empty"></span>';
                }
                return result;
            }
                                    /*<span class="glyphicon glyphicon-star"></span>
                                    <span class="glyphicon glyphicon-star"></span>
                                    <span class="glyphicon glyphicon-star"></span>
                                    <span class="glyphicon glyphicon-star"></span>
                                    <span class="glyphicon glyphicon-star-empty"></span>*/
            
            
            //var div = document.createElement('div');
            //document.body.appendChild(div);
            //div.innerHTML = '<span class="msg">Hello world.</span>';