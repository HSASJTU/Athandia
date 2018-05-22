var name_listen_ref = null;
var node_listen_ref = null;

var load_name = function (pid) {
    unload_name();
    var project_ref = wilddog.sync().ref("/project/" + pid);
    name_listen_ref = project_ref = project_ref.child("name");
    name_listen_ref.on("value", function (snapshot, error) {
        if (error == null) {
            var tempData = snapshot.val();
            if (tempData == null) {
                console.info("project without name");
                project_ref.update({ name: "un-named" });
            }
            else {
                document.getElementById("p_name").innerHTML = tempData;
                //cb();
            }
        }
        else {
            console.log(error);
        }
    });
};

var unload_name = function () {
    if (name_listen_ref != null) {
        name_listen_ref.off();
        name_listen_ref = null;
        document.getElementById("p_name").innerHTML = "Plz load a new project"
    }
};

var load_node = function (pid) {
    unload_node();
    var project_ref = wilddog.sync().ref("/project/" + pid);
    node_listen_ref = project_ref.child("nodeDataArray");
    node_listen_ref.on('value', function (snapshot, error) {
        if (error != null) { return alert(error); }
        if (snapshot.val() == null) { return console.info("no such Data exist!"); }
        myDiagram.model = go.Model.fromJson(snapshot.val());
        console.info("Loaded from Wilddog");
        layoutAll();
    });
};

var unload_node = function () {
    if (node_listen_ref != null) {
        node_listen_ref.off();
        node_listen_ref = null;
        myDiagram.model = go.Model.fromJson({ "class": "go.TreeModel", "nodeDataArray": []});
    }
};

//Todo: write_name function()
var write_name = function (name, pid) {
};

var write_node = function () {
    if (node_listen_ref == null) { return; }
    var Data = JSON.parse(myDiagram.model.toJson())
    node_listen_ref.set(Data, function (error) {
        if (error == null) {
            console.info("Saved to Wilddog");
            console.log(Data);
            myDiagram.isModified = false;
        }
        else {
            alert(error);
        }
    });
};