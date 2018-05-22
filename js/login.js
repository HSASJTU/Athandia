var sign_up = function (email, pwd) {
    wilddog.auth().createUserWithEmailAndPassword(email, pwd)
        .then(function (user) {
            console.info("user created.", user);
        }).catch(function (err) {
            console.info("create user failed.", err);
        });
};

var pre_login = function (successCb, failCb) {
    if (wilddog.auth().currentUser != null) {
        if (successCb == null) { return; }
        return successCb(); //already login 
    }
    else if (wilddog.auth().currentUser == null) {
        if (failCb == null) { return; }
        return failCb(); //not login
    }
};

var login = function (email, pwd, cb) {
    wilddog.auth().signInWithEmailAndPassword(email, pwd)
        .then(function () {
            console.info("login success, currentUser->", wilddog.auth().currentUser);
        })
        .catch(function (err) {
            console.info('login failed ->', err);
        });
};

var logout = function () {
    wilddog.auth().signOut().then(function () {
        console.info("user sign out.");
    });
};
