if (document.getElementById('btnRegister')) {
    document.getElementById('btnRegister').addEventListener('click', function(event) {
        event.preventDefault();
        document.getElementById('loginContainer').classList.toggle('d-none');
        document.getElementById('registerContainer').classList.toggle('d-none');
    });
}
if (document.getElementById('btnLogin')) {
    document.getElementById('btnLogin').addEventListener('click', function(event) {
        event.preventDefault();
        document.getElementById('loginContainer').classList.toggle('d-none');
        document.getElementById('registerContainer').classList.toggle('d-none');
    });
}

// Login
if (document.getElementById('loginForm')) {
    document.getElementById('loginForm').addEventListener('submit', function(event) {
        event.preventDefault();
        console.log(event.target);
        var email = event.target.email.value;
        var password = event.target.password.value;
        var datas = {
            'email': email,
            'password': password,
        };
        fetch('/users', {
            method: 'put',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: "include",
            body: JSON.stringify(datas)
        })
        .then(function (r) {
          console.log(r);
          return r.json() })
        .then(function (response) {
            if (response.status) {
                document.location.href = '/rooms';

            } else {
                alert(response.message || 'Erreur');
            }
        })
    });
}

// Register
if (document.getElementById('registerForm')) {
    document.getElementById('registerForm').addEventListener('submit', function(event) {
        event.preventDefault();
        console.log(event.target.username.value);
        // debugger;
        var username = event.target.username.value;
        var email = event.target.email.value;
        var password = event.target.password.value;
        var password_confirm = event.target.password_confirm.value;
        var avatar = event.target.avatar.value;
        var datas = {
            'username': username,
            'email': email,
            'password': password,
            'password_confirm': password_confirm,
            'avatar': avatar
        };
        fetch('/users', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datas)
        })
        .then(function (r) {
            return r.json()
        })
        .then(function (response) {
            if (response.status) {
                document.location.reload();
            } else {
                alert(response.message || 'Erreur');
            }
        })
    });
}


// Logout
if (document.getElementById('btnLogout')) {
    document.getElementById('btnLogout').addEventListener('click', function(event) {
        event.preventDefault();
        fetch('/users', {
            method: 'delete',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: "include",
        })
        .then(function (r) {
            return r.json()
        })
        .then(function (response) {
            if (response.status) {
                document.location.href = '/';
            } else {
                alert(response.message || 'Erreur');
            }
        });
    });
}
