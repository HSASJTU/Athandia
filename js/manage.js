var pid_listen_ref = null;
//var pid_array = null;

var add_project = function (uid, projectName) {
    if (uid == null) {
        return console.info("error, no uid when adding project.");
    }

    var ref = wilddog.sync().ref("/project");

    var init_node = { "class": "go.TreeModel", "nodeDataArray": [ {"key":0, "text":"Mind Map", "loc":"0 0"} ]};
    var jsonVar = { uid: uid, nodeDataArray: init_node, name: projectName };
    var new_ref = ref.push(jsonVar);
    console.info(new_ref.key());

    var user_ref = wilddog.sync().ref("/user/" + uid);
    var pidArray = null;
    user_ref.child("pid").once('value', function (snapshot, error) {
        if (error == null) {
            var tempData = snapshot.val();

            if (tempData == null) {
                user_ref.child("pid").update({});
                pidArray = [];
            }
            else {
                pidArray = tempData;
            }
        }
        else {
            console.log(error);
        }
    }).then(function () {
        pidArray.push(new_ref.key());
        user_ref.update({ pid: pidArray });
    });
};

var list_projects = function (user) {
    if (user == null) {
        console.info("error, no uid when listing project.");
        return;
    }

    var uid = user.uid;
    var user_ref = wilddog.sync().ref("/user/" + uid + "/pid");
    pid_listen_ref = user_ref;
    var pidArray = [];
    pid_listen = user_ref.on('value', function (snapshot, error) {
        if (error == null) {
            document.getElementById("my_project_list").innerHTML = "";
            var tempData = snapshot.val();

            if (tempData == null) {
                user_ref.child("pid").update({});
                pidArray = [];
            }
            else {
                pidArray = tempData;
            }

            console.log(pidArray);
            pid_array = pidArray;

            pidArray.forEach(function (pid) {
                console.log(pid);
                var project_ref = wilddog.sync().ref("/project/" + pid);
                project_ref.child("name").once("value", function (snapshot, error) {
                    if (error == null) {
                        var tempData = snapshot.val();
                        if (tempData == null) {
                            console.info("project without name");
                            project_ref.update({ name: "un-named" });
                        }
                        else {
                            document.getElementById("my_project_list").innerHTML += "<li><p>" + tempData
                            + "</p><p>pid = " + pid 
                            + "  <a href='#project/"+pid+"'>View</a>"
                            + "  <a href='#project/"+pid+"/delete'>Delete</a>"  + "</p></li>";
                            //cb(project_name, pid); //Todo: list_projects call back
                        }
                    }
                    else {
                        console.log(error);
                    }
                });
            });
        }
        else {
            console.log(error);
        }
    });

};

var unlist_proejects = function (user) {
    if (user != null) {
        console.info("error, no uid when unlisting project.");
        return;
    }
    document.getElementById("my_project_list").innerHTML = "";
    if (pid_listen_ref != null) {
        pid_listen_ref.off();
        pid_listen_ref = null;
    }
};

var delete_project = function (pid) {
    var userID = wilddog.auth().currentUser.uid;
    var user_ref = wilddog.sync().ref("/user/" + userID);

    if (pid_array == null) {
        return;
    }

    var index = pid_array.indexOf(pid);
    if (pid_array[index] == pid) {
        pid_array.splice(index, 1);
        user_ref.update({ pid: pid_array });
    }
    else {
        return console.log("This is not your project.");
    }
    var project_ref = wilddog.sync().ref("/project/");
    project_ref.child(pid).set(null);
};