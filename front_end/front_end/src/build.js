function checkLoginStatus() {
    let status = false
    let a = document.cookie.split(';');
    a.forEach(function (c) {
        if (c.match(/token=.+/)) {
            status = true;
        }
    });
    return status;
}

function getCookie(name) {
    return (name = (document.cookie + ';').match(new RegExp(name + '=.*;'))) && name[0].split(/[=;]/)[1];
}

async function getCurrentUserId() {
    const rawResponse = await fetch('http://127.0.0.1:5000/user/', {
        cache: "no-cache",
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Token ' + getCookie('token')
        }
    });
    const data = await rawResponse.json();
    return data['id'].toString();
}

async function getCurrentUserFollowOrNot() {
    const rawResponse = await fetch('http://127.0.0.1:5000/user/', {
        cache: "no-cache",
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Token ' + getCookie('token')
        }
    });
    const data = await rawResponse.json();
    let followingArray = data['following'].toString().split(',');
    let status = '0';
    followingArray.forEach(e => {
        if (e.toString() === getCookie('currentProfileUserId').toString()) {
            status = '1';
        }
    });
    return status;
}

function findBodyAndEmpty() {
    let body = document.getElementById("main");
    while (body.firstChild) {
        body.removeChild(body.firstChild);
    }
    return body
}

function loadLoginPage() {
    let body = findBodyAndEmpty();
    let container = document.createElement("div");
    container.style.marginTop = "20px";
    container.style.marginBottom = "20px";
    container.style.width = "500px";
    container.style.backgroundColor = "#ffffff";
    container.style.boxShadow = "0 2px 6px 0 rgba(0, 0, 0, 0.2)"
    let main = document.createElement("div");
    main.style.display = "flex";
    main.style.flexDirection = "column";
    main.style.margin = "2.5rem 3rem 0 3rem";
    main.style.padding = "0";
    let text = document.createElement("div");
    text.style.fontWeight = "Bold";
    text.style.fontSize = "2.125rem";
    text.style.color = "rgb(51, 63, 72)";
    text.style.textAlign = "left";
    text.style.lineHeight = "2.5rem";
    text.textContent = "Sign in";

    let login_div = document.createElement("div");
    login_div.style.display = "flex";
    login_div.style.flexDirection = "column";
    login_div.style.marginTop = "30px";

    let loginForm = document.createElement("div");

    let usernameDiv = document.createElement("div");
    usernameDiv.style.width = "370px";
    usernameDiv.style.height = "22px";
    usernameDiv.style.border = "1px solid #d2d5da";
    usernameDiv.style.borderRadius = "3px";
    usernameDiv.style.padding = "calc(0.75rem - 1px) 1rem";
    usernameDiv.style.display = "flex";
    let icon1Div = document.createElement("div");
    let icon1Img = document.createElement("img");
    icon1Div.style.marginLeft = "-5px";
    icon1Div.style.marginTop = "-2px";
    icon1Img.src = 'src/icon/3.png';
    icon1Img.width = 24;
    icon1Div.appendChild(icon1Img);
    let usernameInputDiv = document.createElement("div");
    let usernameInput = document.createElement("input");
    usernameInputDiv.style.marginLeft = "7px";
    usernameInputDiv.style.marginTop = "-6px";
    usernameInput.placeholder = "Username";
    usernameInput.style.border = "none";
    usernameInput.style.height = "32px";
    usernameInput.style.width = "350px";
    usernameInput.style.fontSize = "13pt";
    usernameInput.name = "username";
    usernameInput.type = "text";
    usernameDiv.appendChild(icon1Div);
    usernameDiv.appendChild(usernameInputDiv);
    usernameInputDiv.appendChild(usernameInput);

    let passwordDiv = document.createElement("div");
    passwordDiv.style.width = "370px";
    passwordDiv.style.height = "22px";
    passwordDiv.style.border = "1px solid #d2d5da";
    passwordDiv.style.borderRadius = "3px";
    passwordDiv.style.padding = "calc(0.75rem - 1px) 1rem";
    passwordDiv.style.display = "flex";
    passwordDiv.style.marginTop = "15px";
    let icon2Div = document.createElement("div");
    let icon2Img = document.createElement("img");
    icon2Div.style.marginLeft = "-8px";
    icon2Div.style.marginTop = "-4px";
    icon2Img.src = 'src/icon/2.png';
    icon2Img.width = 30;
    icon2Div.appendChild(icon2Img);
    let passwordInputDiv = document.createElement("div");
    let passwordInput = document.createElement("input");
    passwordInputDiv.style.marginTop = "-6px";
    passwordInput.placeholder = "Password";
    passwordInput.style.border = "none";
    passwordInput.style.width = "350px";
    passwordInput.style.marginLeft = "7px";
    passwordInput.style.height = "32px";
    passwordInput.style.fontSize = "13pt";
    passwordInput.name = "password";
    passwordInput.type = "password";
    passwordDiv.appendChild(icon2Div);
    passwordDiv.appendChild(passwordInputDiv);
    passwordInputDiv.appendChild(passwordInput);

    let msgDiv = document.createElement("div");
    msgDiv.style.display = "flex";
    msgDiv.style.marginTop = "20px";
    let msg = document.createElement("div");
    msg.textContent = "Not signed up?";
    msgDiv.appendChild(msg);
    let registerLink = document.createElement("div");
    registerLink.style.color = "#486ece";
    registerLink.style.paddingLeft = "3px";
    registerLink.textContent = "Create an account.";
    registerLink.addEventListener("click", () => {
        loadRegisterPage()
    })
    msgDiv.appendChild(registerLink);

    let submitButtonDiv = document.createElement("div");
    submitButtonDiv.style.marginTop = "20px";
    submitButtonDiv.style.marginBottom = "55px";
    let submitButton = document.createElement("button");
    submitButton.style.width = "405px";
    submitButton.style.height = "50px";
    submitButton.textContent = "Sign in";
    submitButton.style.backgroundColor = "#d52a2a";
    submitButton.style.color = "white";
    submitButton.style.border = "none";
    submitButton.style.fontSize = "13pt";
    submitButton.type = "submit";
    submitButtonDiv.appendChild(submitButton);

    submitButton.addEventListener("click", () => {
        (async () => {
            const rawResponse = await fetch('http://127.0.0.1:5000/auth/login', {
                cache: "no-cache",
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({username: usernameInput.value, password: passwordInput.value})
            });
            const content = await rawResponse.json();
            if (rawResponse["status"] !== 200) {
                console.warn(`API_ERROR: ${content.message}`);
                alert(content.message)
            } else {
                Object.keys(content).forEach(function (key) {
                    let cookie_str_1 = key.toString();
                    let cookie_str_2 = content[key].toString();
                    document.cookie = cookie_str_1 + "=" + cookie_str_2;
                })
                document.cookie = 'currentUserId=' + await getCurrentUserId();
                window.location.reload();
            }
        })();
    })

    loginForm.appendChild(usernameDiv);
    loginForm.appendChild(passwordDiv);
    loginForm.appendChild(msgDiv);
    loginForm.appendChild(submitButtonDiv);
    login_div.appendChild(loginForm);

    main.appendChild(text);
    main.appendChild(login_div);
    container.appendChild(main);
    body.appendChild(container);
}

function loadRegisterPage() {
    let body = findBodyAndEmpty();
    let container = document.createElement("div");
    container.style.marginTop = "20px";
    container.style.marginBottom = "20px";
    container.style.width = "500px";
    container.style.backgroundColor = "#ffffff";
    container.style.boxShadow = "0 2px 6px 0 rgba(0, 0, 0, 0.2)"
    let main = document.createElement("div");
    main.style.display = "flex";
    main.style.flexDirection = "column";
    main.style.margin = "2.5rem 3rem 0 3rem";
    main.style.padding = "0";
    let text = document.createElement("div");
    text.style.fontWeight = "Bold";
    text.style.fontSize = "2.125rem";
    text.style.color = "rgb(51, 63, 72)";
    text.style.textAlign = "left";
    text.style.lineHeight = "2.5rem";
    text.textContent = "Create account";
    let msgDiv = document.createElement("div");
    msgDiv.style.display = "flex";
    msgDiv.style.marginTop = "20px";
    let msg = document.createElement("p");
    msg.textContent = "Use an address that you own, and only have access to. Don't use a group or generic email.";
    msg.style.fontStretch = "normal";
    msg.style.fontSize = "1rem";
    msg.style.lineHeight = "1.5rem";
    msg.style.letterSpacing = "normal";
    msg.style.color = "#333f48";
    msg.style.marginBottom = "1rem";
    msgDiv.appendChild(msg);

    let login_div = document.createElement("div");
    login_div.style.display = "flex";
    login_div.style.flexDirection = "column";
    login_div.style.marginTop = "15px";

    let loginForm = document.createElement("div");

    let usernameDiv = document.createElement("div");
    usernameDiv.style.width = "370px";
    usernameDiv.style.height = "22px";
    usernameDiv.style.border = "1px solid #d2d5da";
    usernameDiv.style.borderRadius = "3px";
    usernameDiv.style.padding = "calc(0.75rem - 1px) 1rem";
    usernameDiv.style.display = "flex";
    let icon1Div = document.createElement("div");
    let icon1Img = document.createElement("img");
    icon1Div.style.marginLeft = "-5px";
    icon1Div.style.marginTop = "-2px";
    icon1Img.src = 'src/icon/3.png';
    icon1Img.width = 24;
    icon1Div.appendChild(icon1Img);
    let usernameInputDiv = document.createElement("div");
    let usernameInput = document.createElement("input");
    usernameInputDiv.style.marginLeft = "8px";
    usernameInputDiv.style.marginTop = "-6px";
    usernameInput.placeholder = "Username";
    usernameInput.style.border = "none";
    usernameInput.style.height = "32px";
    usernameInput.style.width = "350px";
    usernameInput.style.fontSize = "13pt";
    usernameInput.name = "username";
    usernameInput.type = "text";
    usernameDiv.appendChild(icon1Div);
    usernameDiv.appendChild(usernameInputDiv);
    usernameInputDiv.appendChild(usernameInput);

    let passwordDiv = document.createElement("div");
    passwordDiv.style.width = "370px";
    passwordDiv.style.height = "22px";
    passwordDiv.style.border = "1px solid #d2d5da";
    passwordDiv.style.borderRadius = "3px";
    passwordDiv.style.padding = "calc(0.75rem - 1px) 1rem";
    passwordDiv.style.display = "flex";
    passwordDiv.style.marginTop = "15px";
    let icon2Div = document.createElement("div");
    let icon2Img = document.createElement("img");
    icon2Div.style.marginLeft = "-8px";
    icon2Div.style.marginTop = "-4px";
    icon2Img.src = 'src/icon/2.png';
    icon2Img.width = 30;
    icon2Div.appendChild(icon2Img);
    let passwordInputDiv = document.createElement("div");
    let passwordInput = document.createElement("input");
    passwordInputDiv.style.marginTop = "-6px";
    passwordInput.placeholder = "Password";
    passwordInput.style.border = "none";
    passwordInput.style.width = "350px";
    passwordInput.style.marginLeft = "7px";
    passwordInput.style.height = "32px";
    passwordInput.style.fontSize = "13pt";
    passwordInput.name = "password";
    passwordInput.type = "password";
    passwordDiv.appendChild(icon2Div);
    passwordDiv.appendChild(passwordInputDiv);
    passwordInputDiv.appendChild(passwordInput);

    let passwordConfirmDiv = document.createElement("div");
    passwordConfirmDiv.style.width = "370px";
    passwordConfirmDiv.style.height = "22px";
    passwordConfirmDiv.style.border = "1px solid #d2d5da";
    passwordConfirmDiv.style.borderRadius = "3px";
    passwordConfirmDiv.style.padding = "calc(0.75rem - 1px) 1rem";
    passwordConfirmDiv.style.display = "flex";
    passwordConfirmDiv.style.marginTop = "15px";
    let icon3Div = document.createElement("div");
    let icon3Img = document.createElement("img");
    icon3Img.src = 'src/icon/2.png';
    icon3Img.width = 30;
    icon2Div.appendChild(icon2Img);
    icon3Div.style.marginLeft = "-8px";
    icon3Div.style.marginTop = "-4px";
    icon3Div.appendChild(icon3Img);
    let passwordConfirmInputConfirmDiv = document.createElement("div");
    let passwordConfirmInput = document.createElement("input");
    passwordConfirmInputConfirmDiv.style.marginTop = "-6px";
    passwordConfirmInput.placeholder = "Confirm password";
    passwordConfirmInput.style.border = "none";
    passwordConfirmInput.style.width = "350px";
    passwordConfirmInput.style.marginLeft = "7px";
    passwordConfirmInput.style.height = "32px";
    passwordConfirmInput.style.fontSize = "13pt";
    passwordConfirmInput.name = "password";
    passwordConfirmInput.type = "password";
    passwordConfirmDiv.appendChild(icon3Div);
    passwordConfirmDiv.appendChild(passwordConfirmInputConfirmDiv);
    passwordConfirmInputConfirmDiv.appendChild(passwordConfirmInput);

    let emailDiv = document.createElement("div");
    emailDiv.style.marginTop = "15px";
    emailDiv.style.width = "370px";
    emailDiv.style.height = "22px";
    emailDiv.style.border = "1px solid #d2d5da";
    emailDiv.style.borderRadius = "3px";
    emailDiv.style.padding = "calc(0.75rem - 1px) 1rem";
    emailDiv.style.display = "flex";
    let icon4Div = document.createElement("div");
    let icon4Img = document.createElement("img");
    icon4Div.style.marginLeft = "-8px";
    icon4Div.style.marginTop = "-3px";
    icon4Img.src = 'src/icon/1.png';
    icon4Img.width = 30;
    icon4Div.appendChild(icon4Img);
    let emailInputDiv = document.createElement("div");
    let emailInput = document.createElement("input");
    emailInputDiv.style.marginLeft = "7px";
    emailInputDiv.style.marginTop = "-6px";
    emailInput.placeholder = "Email address";
    emailInput.style.border = "none";
    emailInput.style.height = "32px";
    emailInput.style.width = "350px";
    emailInput.style.fontSize = "13pt";
    emailInput.name = "email";
    emailInput.type = "text";
    emailDiv.appendChild(icon4Div);
    emailDiv.appendChild(emailInputDiv);
    emailInputDiv.appendChild(emailInput);

    let nameDiv = document.createElement("div");
    nameDiv.style.marginTop = "15px";
    nameDiv.style.width = "370px";
    nameDiv.style.height = "22px";
    nameDiv.style.border = "1px solid #d2d5da";
    nameDiv.style.borderRadius = "3px";
    nameDiv.style.padding = "calc(0.75rem - 1px) 1rem";
    nameDiv.style.display = "flex";
    let icon5Div = document.createElement("div");
    let icon5Img = document.createElement("img");
    icon5Div.style.marginLeft = "-3px";
    icon5Div.style.marginTop = "-0px";
    icon5Img.src = 'src/icon/4.svg';
    icon5Img.width = 20;
    icon5Div.appendChild(icon5Img);
    let nameInputDiv = document.createElement("div");
    let nameInput = document.createElement("input");
    nameInputDiv.style.marginLeft = "12px";
    nameInputDiv.style.marginTop = "-6px";
    nameInput.placeholder = "Name";
    nameInput.style.border = "none";
    nameInput.style.height = "32px";
    nameInput.style.width = "350px";
    nameInput.style.fontSize = "13pt";
    nameInput.name = "name";
    nameInput.type = "text";
    nameDiv.appendChild(icon5Div);
    nameDiv.appendChild(nameInputDiv);
    nameInputDiv.appendChild(nameInput);


    let submitButtonDiv = document.createElement("div");
    submitButtonDiv.style.marginTop = "20px";
    submitButtonDiv.style.marginBottom = "55px";
    let submitButton = document.createElement("button");
    submitButton.style.width = "405px";
    submitButton.style.height = "50px";
    submitButton.textContent = "Create account";
    submitButton.style.backgroundColor = "#d52a2a";
    submitButton.style.color = "white";
    submitButton.style.border = "none";
    submitButton.style.fontSize = "13pt";
    submitButton.type = "submit";
    submitButtonDiv.appendChild(submitButton);

    submitButton.addEventListener("click", () => {
        if (passwordInput.value !== passwordConfirmInput.value) {
            alert("Those passwords didn't match. Try again.")
        } else (async () => {
            const rawResponse = await fetch('http://127.0.0.1:5000/auth/signup', {
                cache: "no-cache",
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: usernameInput.value,
                    password: passwordInput.value,
                    email: emailInput.value,
                    name: nameInput.value
                })
            });
            const content = await rawResponse.json();
            if (rawResponse["status"] !== 200) {
                console.warn(`API_ERROR: ${content.message}`);
                alert(content.message)
            } else {
                Object.keys(content).forEach(function (key) {
                    let cookie_str_1 = key.toString();
                    let cookie_str_2 = content[key].toString();
                    document.cookie = cookie_str_1 + "=" + cookie_str_2;
                    sampleFollow(cookie_str_2);
                })
            }
        })();
    })

    loginForm.appendChild(usernameDiv);
    loginForm.appendChild(passwordDiv);
    loginForm.appendChild(passwordConfirmDiv);
    loginForm.appendChild(emailDiv);
    loginForm.appendChild(nameDiv);
    loginForm.appendChild(submitButtonDiv);
    login_div.appendChild(loginForm);

    main.appendChild(text);
    main.appendChild(msg);
    main.appendChild(login_div);
    container.appendChild(main);
    body.appendChild(container);
}

function logoLink() {
    window.location.reload();
}

function loadMainPage() {
    let body = findBodyAndEmpty();
    // let container = document.createElement("div");

    let nav = document.getElementById("nav");
    while (nav.firstChild) {
        nav.removeChild(nav.firstChild);
    }

    if (checkLoginStatus() !== true) {
        loadLoginPage();
    } else {
        // container.textContent = "You're logged in. The page is not yet implemented...";
        // body.appendChild(container);

        let feedDiv = renderFeed();
        body.appendChild(feedDiv);
        nav.style.display = "flex";
        nav.style.flexDirection = "row";

        let newPostInputDiv = document.createElement("div");
        newPostInputDiv.style.marginRight = "10px";
        newPostInputDiv.style.width = "370px";
        newPostInputDiv.style.height = "22px";
        newPostInputDiv.style.border = "1px solid #d2d5da";
        newPostInputDiv.style.borderRadius = "3px";
        newPostInputDiv.style.padding = "calc(0.75rem - 1px) 1rem";
        newPostInputDiv.style.marginTop = "15px";
        newPostInputDiv.style.marginLeft = "15px";
        newPostInputDiv.style.backgroundColor = "white";
        let newPostInput = document.createElement("input");
        newPostInput.style.marginLeft = "-12px";
        newPostInput.style.marginTop = "-6px";
        newPostInput.style.border = "none";
        newPostInput.placeholder = "What's happening?";
        newPostInput.style.height = "32px";
        newPostInput.style.width = "390px";
        newPostInput.style.fontSize = "13pt";
        newPostInput.type = "text";
        newPostInputDiv.appendChild(newPostInput);
        nav.appendChild(newPostInputDiv);

        let postButton = document.createElement("button");
        postButton.style.marginRight = "10px";
        postButton.textContent = "POST";
        postButton.style.width = "80px";
        postButton.style.height = "30px";
        postButton.style.marginTop = "21px";
        postButton.style.color = "white";
        postButton.style.backgroundColor = "#d52a2a";
        postButton.style.border = "none";
        postButton.style.fontSize = "10pt";
        postButton.type = "submit";
        nav.appendChild(postButton);

        postButton.addEventListener("click", () => {
            if (newPostInput.value !== '') {
                (async () => {
                    const rawResponse = await fetch('http://127.0.0.1:5000/post/', {
                        cache: "no-cache",
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                            'Authorization': "Token " + getCookie('token')
                        },
                        body: JSON.stringify({
                            description_text: newPostInput.value,
                            src: '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'
                        })
                    });
                    const content = await rawResponse.json();
                    if (rawResponse["status"] !== 200) {
                        console.warn(`API_ERROR: ${content.message}`);
                        alert(content.message)
                    } else {
                        newPostInput.value = '';
                        profilePage(getCookie('currentUserId'));
                    }
                })();
            }
        })

        let profileButton = document.createElement("button");
        profileButton.style.marginRight = "10px";
        profileButton.textContent = "My Profile";
        profileButton.style.width = "80px";
        profileButton.style.height = "30px";
        profileButton.style.marginTop = "21px";
        nav.appendChild(profileButton);

        profileButton.addEventListener("click", () => {
            (async () => {
                const rawResponse = await fetch('http://127.0.0.1:5000/user/', {
                    cache: "no-cache",
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'Authorization': "Token " + getCookie('token')
                    }
                });
                const content = await rawResponse.json();
                if (rawResponse["status"] !== 200) {
                    console.warn(`API_ERROR: ${content.message}`);
                    alert(content.message)
                } else {
                    let currentUserId = getCookie('currentUserId');
                    profilePage(currentUserId);
                }
            })();

        })

        let logoutButton = document.createElement("button");
        logoutButton.textContent = "Log out"
        logoutButton.style.width = "80px";
        logoutButton.style.height = "30px";
        logoutButton.style.marginTop = "21px";
        nav.appendChild(logoutButton);

        logoutButton.addEventListener("click", () => {
            document.cookie = "token=; expires=Thu, 18 Dec 2013 12:00:00 UTC; path=/";
            document.cookie = "currentUserId=; expires=Thu, 18 Dec 2013 12:00:00 UTC; path=/";
            document.cookie = "currentProfileUserId=; expires=Thu, 18 Dec 2013 12:00:00 UTC; path=/";
            window.location.reload();
        })
    }
}

function sampleFollow(cookie) {
    let sampleUsernames = ["Andrew", "Matthew", "Jack", "Harper", "Zoe", "Amelia"];
    let randomUser = sampleUsernames[Math.floor(Math.random() * sampleUsernames.length)];
    let tk = "Token " + cookie;

    (async () => {
        const rawResponse = await fetch('http://127.0.0.1:5000/user/follow?username=' + randomUser, {
            cache: "no-cache",
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Authorization': tk
            }
        });
        const content = await rawResponse.json();
        if (rawResponse["status"] !== 200) {
            console.warn(`API_ERROR: ${content.message}`);
            alert(content.message + "Sample follow failed but you can continue.")
            window.location.reload();
        } else {
            document.cookie = 'currentUserId=' + await getCurrentUserId();
            window.location.reload();
        }
    })();

}

function renderFeed() {
    let container = document.createElement("div");
    let tk = "Token " + getCookie('token');

    (async () => {
        const rawResponse = await fetch('http://127.0.0.1:5000/user/feed', {
            cache: "no-cache",
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': tk
            }
        });
        const content = await rawResponse.json();
        if (rawResponse["status"] !== 200) {
            console.warn(`API_ERROR: ${content.message}`);
            alert(content.message)
        } else {
            container.style.marginTop = "10px";
            container.style.marginBottom = "10px";
            container.style.width = "85%";
            container.style.backgroundColor = "#ffffff";
            container.style.boxShadow = "0 2px 6px 0 rgba(0, 0, 0, 0.2)"
            container.style.display = "flex";
            container.style.flexDirection = "column";

            let title = document.createElement("div");
            title.innerText = "Feeds";
            title.style.fontFamily = "system-ui, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Ubuntu, \"Helvetica Neue\", sans-serif";
            title.style.lineHeight = "1.3125";
            title.style.fontSize = "15pt";
            title.style.fontWeight = "bold";
            title.style.paddingTop = "10px";
            title.style.paddingBottom = "10px";
            title.style.paddingLeft = "15px";
            title.style.borderBottom = "1px solid #cfd6dd";

            container.appendChild(title);

            Object.keys(content['posts']).forEach(function (key) {

                let contentDiv = document.createElement("div");
                contentDiv.style.display = "flex";
                contentDiv.style.flexDirection = "row";
                contentDiv.style.justifyContent = "space-between"
                contentDiv.style.backgroundColor = "white";
                contentDiv.style.borderBottom = "1px solid #cfd6dd";
                contentDiv.style.paddingTop = "8px";
                contentDiv.style.paddingBottom = "8px";
                contentDiv.style.paddingLeft = "15px";

                let leftDiv = document.createElement("div");

                let thumbnailDiv = document.createElement("div");
                let thumbnail = document.createElement("img");
                thumbnail.src = "data:image/png;base64, " + content['posts'][key]['thumbnail'];
                thumbnail.style.width = "auto";
                thumbnailDiv.style.paddingRight = "10px";

                thumbnailDiv.appendChild(thumbnail);
                leftDiv.appendChild(thumbnailDiv);

                let rightDiv = document.createElement("div");

                let authorLineDiv = document.createElement("div");
                authorLineDiv.style.display = "flex";
                authorLineDiv.style.flexDirection = "row";

                let authorDiv = document.createElement("div");

                authorDiv.addEventListener("click", () => {
                    profilePage('', content['posts'][key]['meta']['author']);
                })

                authorDiv.innerText = content['posts'][key]['meta']['author'];
                authorDiv.style.fontWeight = "bold";
                authorDiv.style.fontSize = "13pt";

                let timeDiv = document.createElement("div");
                let timeStamp = parseFloat(content['posts'][key]['meta']['published']);
                timeDiv.innerText = '· ' + new Date(timeStamp).toLocaleString("en-AU", {
                    month: 'short',
                    hour12: 'true',
                    year: 'numeric',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                });
                timeDiv.style.fontSize = "11pt";
                timeDiv.style.color = "#6b7785";
                timeDiv.style.marginLeft = "6px";
                timeDiv.style.paddingTop = "3px";
                timeDiv.setAttribute("id", content['posts'][key]['id']);


                authorLineDiv.appendChild(authorDiv);
                authorLineDiv.appendChild(timeDiv);

                let descDiv = document.createElement("div");
                descDiv.style.marginTop = "3px";
                descDiv.innerText = content['posts'][key]['meta']['description_text'];

                let statusDiv = document.createElement("div");
                statusDiv.style.marginBottom = "-5px";
                statusDiv.style.display = "flex";
                statusDiv.style.flexDirection = "column";

                let likesDiv = document.createElement("div");
                likesDiv.style.display = "flex";
                likesDiv.style.flexDirection = "row";
                let icon2Div = document.createElement("div");
                icon2Div.setAttribute("id", content['posts'][key]['id']);
                icon2Div.addEventListener("click", () => {
                    likeButton(icon2Div.id, icon2Text, likesDetailsDiv);
                })
                icon2Div.style.paddingTop = "5px";
                let icon2Text = document.createElement("div");
                icon2Text.innerText = "0";
                icon2Text.style.lineHeight = "10pt";
                icon2Text.style.paddingTop = "10px";
                icon2Text.style.margin = "0";
                icon2Text.style.marginLeft = "8px";
                let icon2 = document.createElement("img");
                icon2.src = "data:image/png;base64,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"
                icon2.style.width = "20px";
                icon2Div.appendChild(icon2);
                likesDiv.appendChild(icon2Div);
                likesDiv.appendChild(icon2Text);

                let likesDetailsDiv = document.createElement("div");
                likesDetailsDiv.style.marginLeft = "7px";
                likesDetailsDiv.style.paddingTop = "7px";
                likesDetailsDiv.style.color = "#6b7785";
                likesDiv.appendChild(likesDetailsDiv);

                if ((content['posts'][key]['meta']['likes']).toString() !== "") {
                    likesDetailsDiv.textContent = 'by ';

                    let likesNumber = content['posts'][key]['meta']['likes'].toString().split(',');
                    icon2Text.innerText = likesNumber.length.toString();

                    let tk = 'Token ' + getCookie('token').toString();
                    let currentUserId = '';
                    (async () => {
                        const rawResponse = await fetch('http://127.0.0.1:5000/user/', {
                            cache: "no-cache",
                            method: 'GET',
                            headers: {
                                'Accept': 'application/json',
                                'Authorization': tk
                            }
                        });
                        const content = await rawResponse.json();
                        if (rawResponse["status"] !== 200) {
                            console.warn(`API_ERROR: ${content.message}`);
                            alert(content.message)
                        } else {
                            currentUserId = content['id'].toString();

                            likesNumber.forEach(e => {
                                if (e.toString() === currentUserId) {
                                    likesDetailsDiv.textContent += 'You ';
                                } else {
                                    (async () => {
                                        const rawResponse = await fetch('http://127.0.0.1:5000/user/?id=' + e, {
                                            cache: "no-cache",
                                            method: 'GET',
                                            headers: {
                                                'Accept': 'application/json',
                                                'Authorization': tk
                                            }
                                        });
                                        const content = await rawResponse.json();
                                        if (rawResponse["status"] !== 200) {
                                            console.warn(`API_ERROR: ${content.message}`);
                                            alert(content.message)
                                        } else {
                                            likesDetailsDiv.textContent += (content['name'] + ' ');
                                        }
                                    })();
                                }
                            });
                        }
                    })();
                }

                let CommentsDiv = document.createElement("div");
                CommentsDiv.style.display = "flex";
                CommentsDiv.style.flexDirection = "row";
                let icon1Div = document.createElement("div");
                icon1Div.style.paddingTop = "5px";
                icon1Div.style.marginLeft = "-3px";
                let icon1 = document.createElement("img");
                icon1.src = "data:image/png;base64,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"
                icon1.style.width = "25px";
                icon1Div.appendChild(icon1);
                let icon1Text = document.createElement("div");
                icon1Text.innerText = "0";
                icon1Text.style.lineHeight = "10pt";
                icon1Text.style.paddingTop = "10px";
                icon1Text.style.margin = "0";
                icon1Text.style.marginLeft = "6px";
                CommentsDiv.appendChild(icon1Div);
                CommentsDiv.appendChild(icon1Text);

                if (content['posts'][key]['comments'].toString() !== "") {
                    icon1Text.innerText = content['posts'][key]['comments'].toString().split(',').length.toString();
                    let commentsDetailsDiv = document.createElement("div");
                    commentsDetailsDiv.style.display = "flex";
                    commentsDetailsDiv.style.flexDirection = "column";
                    commentsDetailsDiv.style.paddingTop = "8px";
                    commentsDetailsDiv.style.marginLeft = "6px";
                    commentsDetailsDiv.style.marginBottom = "7px";
                    Object.keys(content['posts'][key]['comments']).forEach(function (e) {
                        let commentDetail = document.createElement("div");
                        commentDetail.style.marginBottom = "4px";

                        let authorLineDiv = document.createElement("div");
                        authorLineDiv.style.display = "flex";
                        authorLineDiv.style.flexDirection = "row";

                        let authorDiv = document.createElement("div");
                        authorDiv.innerText = content['posts'][key]['comments'][e]['author'];
                        authorDiv.style.fontWeight = "bold";
                        authorDiv.style.fontSize = "11pt";

                        authorDiv.addEventListener("click", () => {
                            profilePage('', content['posts'][key]['comments'][e]['author']);
                        })

                        let timeDiv = document.createElement("div");
                        let timeStamp = parseFloat(content['posts'][key]['comments'][e]['published']);
                        timeDiv.innerText = '· ' + new Date(timeStamp).toLocaleString("en-AU", {
                            month: 'short',
                            hour12: 'true',
                            year: 'numeric',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                        });
                        timeDiv.style.fontSize = "11pt";
                        timeDiv.style.color = "#6b7785";
                        timeDiv.style.fontSize = "11pt";
                        timeDiv.style.marginLeft = "6px";
                        timeDiv.style.paddingTop = "0px";

                        let comment = document.createElement("div");
                        comment.style.marginTop = "3px";
                        comment.style.fontSize = "11pt";
                        comment.innerText = content['posts'][key]['comments'][e]['comment'];

                        authorLineDiv.appendChild(authorDiv);
                        authorLineDiv.appendChild(timeDiv);

                        commentDetail.appendChild(authorLineDiv);
                        commentDetail.appendChild(comment);

                        commentsDetailsDiv.appendChild(commentDetail);
                        CommentsDiv.appendChild(commentsDetailsDiv);


                    });
                }
                let c_c = document.createElement("div");
                c_c.style.display = "flex";
                c_c.style.flexDirection = "row";
                c_c.style.marginLeft = "40px";
                c_c.style.marginBottom = "10px";
                c_c.style.marginTop = "-3px";

                let newPostInputDiv = document.createElement("div");
                newPostInputDiv.style.width = "300px";
                newPostInputDiv.style.height = "23px";
                newPostInputDiv.style.border = "1px solid #d2d5da";
                newPostInputDiv.style.borderRadius = "3px";
                newPostInputDiv.style.backgroundColor = "white";
                let newPostInput = document.createElement("input");
                newPostInput.style.border = "none";
                newPostInput.placeholder = 'Post your comment here...';
                newPostInput.style.marginLeft = "2px";
                newPostInput.style.height = "21px";
                newPostInput.style.width = "290px";
                newPostInput.style.fontSize = "11pt";
                newPostInput.type = "text";
                newPostInputDiv.appendChild(newPostInput);
                authorLineDiv.appendChild(newPostInputDiv);
                newPostInput.addEventListener("click", () => {
                    btDiv.appendChild(postButtonDiv);
                    btDiv.appendChild(clearButtonDiv);
                })

                let btDiv = document.createElement("div");
                let postButtonDiv = document.createElement("button");
                postButtonDiv.textContent = "Post";
                postButtonDiv.style.marginLeft = "8px";
                postButtonDiv.style.marginTop = "1px";
                postButtonDiv.style.width = "60px";
                postButtonDiv.style.height = "23px";
                postButtonDiv.style.color = "white";
                postButtonDiv.style.backgroundColor = "#d52a2a";
                postButtonDiv.style.border = "none";
                postButtonDiv.addEventListener("click", () => {
                    (async () => {
                        const rawResponse = await fetch('http://127.0.0.1:5000/post/comment?id=' + timeDiv.id, {
                            cache: "no-cache",
                            method: 'PUT',
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json',
                                'Authorization': tk
                            },
                            body: JSON.stringify({
                                comment: newPostInput.value
                            })
                        });
                        const content = await rawResponse.json();
                        if (rawResponse["status"] !== 200) {
                            console.warn(`API_ERROR: ${content.message}`);
                            alert(content.message)
                        } else {
                            loadMainPage();
                        }
                    })();
                })
                let clearButtonDiv = document.createElement("button");
                clearButtonDiv.textContent = "Clear";
                clearButtonDiv.style.marginLeft = "8px";
                clearButtonDiv.style.marginTop = "1px";
                clearButtonDiv.style.width = "60px";
                clearButtonDiv.style.height = "23px";
                clearButtonDiv.style.color = "white";
                clearButtonDiv.style.backgroundColor = "#2b2b2b";
                clearButtonDiv.style.border = "none";
                clearButtonDiv.addEventListener("click", () => {
                    newPostInput.value = ''
                    btDiv.removeChild(postButtonDiv);
                    btDiv.removeChild(clearButtonDiv);
                })
                // btDiv.appendChild(postButtonDiv);
                // btDiv.appendChild(clearButtonDiv);

                c_c.appendChild(newPostInputDiv);
                c_c.appendChild(btDiv);


                statusDiv.appendChild(likesDiv);
                statusDiv.appendChild(CommentsDiv);
                statusDiv.appendChild(c_c);

                rightDiv.appendChild(authorLineDiv);
                rightDiv.appendChild(descDiv);
                rightDiv.appendChild(statusDiv);
                contentDiv.appendChild(rightDiv);
                contentDiv.appendChild(leftDiv);

                container.appendChild(contentDiv);
            })
        }
    })();

    return container
}

function likeButton(id, number, text) {
    let tk = 'Token ' + getCookie('token');
    if (text.textContent.includes("You")) {
        (async () => {
            const rawResponse = await fetch('http://127.0.0.1:5000/post/unlike?id=' + id, {
                cache: "no-cache",
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': tk
                }
            });
            const content = await rawResponse.json();
            if (rawResponse["status"] !== 200) {
                console.warn(`API_ERROR: ${content.message}`);
                alert(content.message)
            } else {
                if (parseInt(number.innerText) - 1 === 0) {
                    text.textContent = '';
                }
                text.textContent = text.textContent.replace('You', '');
                number.innerText = (parseInt(number.innerText) - 1).toString();
            }
        })();
    } else {
        (async () => {
            const rawResponse = await fetch('http://127.0.0.1:5000/post/like?id=' + id, {
                cache: "no-cache",
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': tk
                }
            });
            const content = await rawResponse.json();
            if (rawResponse["status"] !== 200) {
                console.warn(`API_ERROR: ${content.message}`);
                alert(content.message)
            } else {
                if (parseInt(number.innerText) === 0) {
                    text.textContent = 'by You'
                } else {
                    text.textContent = text.textContent.replace('by ', 'by You ');
                }
                number.innerText = (parseInt(number.innerText) + 1).toString();
            }
        })();
    }
}

function profilePage(id, username) {
    let body = findBodyAndEmpty();
    let container = document.createElement("div");
    let tk = 'Token ' + getCookie('token');

    (async () => {
        let rawResponse;
        if (id.toString() !== '') {
            rawResponse = await fetch('http://127.0.0.1:5000/user/?id=' + id, {
                cache: "no-cache",
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': tk
                }
            })
        } else {
            rawResponse = await fetch('http://127.0.0.1:5000/user/?username=' + username, {
                cache: "no-cache",
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': tk
                }
            })
        }

        const content = await rawResponse.json();
        if (rawResponse["status"] !== 200) {
            console.warn(`API_ERROR: ${content.message}`);
            alert(content.message)
        } else {
            document.cookie = 'currentProfileUserId' + "=" + content['id'];

            container.style.marginTop = "10px";
            container.style.marginBottom = "10px";
            container.style.width = "1000px";
            container.style.backgroundColor = "#ffffff";
            container.style.boxShadow = "0 2px 6px 0 rgba(0, 0, 0, 0.2)"
            container.style.display = "flex";
            container.style.flexDirection = "column";
            container.style.paddingBottom = "10px";

            let titleContainer = document.createElement("div");
            titleContainer.style.display = "flex";
            titleContainer.style.flexDirection = "row";
            titleContainer.style.paddingTop = "10px";
            titleContainer.style.paddingBottom = "10px";
            titleContainer.style.paddingLeft = "15px";
            titleContainer.style.borderBottom = "1px solid #cfd6dd";
            let title = document.createElement("div");
            title.innerText = "User Profile";
            title.style.fontFamily = "system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Ubuntu, Helvetica Neue, sans-serif";
            title.style.lineHeight = "1.3125";
            title.style.fontSize = "15pt";
            title.style.fontWeight = "bold";
            let userId = document.createElement("div");
            userId.style.paddingTop = "7px";
            userId.style.paddingLeft = "5px";
            userId.style.fontSize = "11pt";
            userId.style.fontFamily = "Museo-Sans-500,Helvetica Neue,Helvetica,Arial,sans-serif";
            userId.style.fontWeight = "400";
            userId.style.color = "#333F48";
            userId.innerText = '#' + content['id'];
            titleContainer.appendChild(title);
            titleContainer.appendChild(userId);

            let nameNFollow = document.createElement("div");
            nameNFollow.style.display = "flex";
            nameNFollow.style.flexDirection = "row";
            nameNFollow.style.justifyContent = "space-between";
            let name = document.createElement("div");
            name.style.fontFamily = "Museo-Sans-500,Helvetica Neue,Helvetica,Arial,sans-serif";
            name.style.fontWeight = "400";
            name.style.color = "#333F48";
            name.style.fontSize = "20pt";
            name.style.fontWeight = "bold";
            name.innerText = content['name'];
            name.style.marginTop = "15px";
            name.style.marginBottom = "0";
            name.style.paddingLeft = "15px";
            nameNFollow.appendChild(name);

            let userName = document.createElement("div");
            userName.style.margin = "0 0 10px 0";
            userName.style.marginTop = "0";
            userName.style.fontSize = "11pt";
            userName.style.paddingLeft = "15px";
            userName.style.marginBottom = "0";
            userName.style.fontFamily = "Museo-Sans-500,Helvetica Neue,Helvetica,Arial,sans-serif";
            userName.style.fontWeight = "400";
            userName.style.color = "#333F48";
            userName.innerText = '@' + content['username'];

            let emailContainer = document.createElement("div");
            emailContainer.style.display = "flex";
            emailContainer.style.fontFamily = "Museo-Sans-500,Helvetica Neue,Helvetica,Arial,sans-serif";
            emailContainer.style.fontWeight = "400";
            emailContainer.style.flexDirection = "row";
            emailContainer.style.marginTop = "15px";
            emailContainer.style.paddingLeft = "15px";
            let email = document.createElement("div");
            email.style.color = "#333F48";
            email.innerText = 'Email address:';
            let text_2 = document.createElement("div");
            text_2.style.marginLeft = "5px";

            text_2.innerText = content['email'];
            emailContainer.appendChild(email);
            emailContainer.appendChild(text_2);


            let numContainer = document.createElement("div");
            numContainer.style.fontFamily = "Museo-Sans-500,Helvetica Neue,Helvetica,Arial,sans-serif";
            numContainer.style.fontWeight = "400";
            numContainer.style.display = "flex";
            numContainer.style.flexDirection = "row";
            numContainer.style.marginTop = "15px";
            numContainer.style.paddingLeft = "15px";
            numContainer.style.marginBottom = "10px";

            let followed_num = document.createElement("div");
            followed_num.innerText = content['followed_num'];

            let text_3 = document.createElement("div");
            if (content['followed_num'].toString() === '0' || content['followed_num'].toString() === '1') {
                text_3.innerText = 'Follower';
            } else {
                text_3.innerText = 'Followers';
            }
            text_3.style.marginLeft = "7px";
            text_3.style.color = "#333F48";

            let following_num = document.createElement("div");
            following_num.style.marginLeft = "20px";
            if (content['following'].toString() === '') {
                following_num.innerText = "0";
            } else {
                following_num.innerText = content['following'].toString().split(',').length.toString();
            }


            let text_4 = document.createElement("div");
            text_4.style.marginLeft = "7px";
            text_4.innerText = 'Following';
            text_4.style.color = "#333F48";

            numContainer.appendChild(followed_num);
            numContainer.appendChild(text_3);
            numContainer.appendChild(following_num);
            numContainer.appendChild(text_4);

            let followingDetails = document.createElement("div");
            followingDetails.style.marginLeft = "7px";
            followingDetails.innerText = '';
            followingDetails.style.color = "#6b7785";
            if (getCookie('currentUserId').toString() !== getCookie('currentProfileUserId').toString()) {
                let textNButton = document.createElement("div");
                textNButton.style.display = "flex";
                textNButton.style.flexDirection = "row";
                // let text_1 = document.createElement("div");
                // text_1.style.fontSize = "11pt";
                // text_1.style.fontFamily = "Museo-Sans-500,Helvetica Neue,Helvetica,Arial,sans-serif";
                // text_1.style.fontWeight = "400";
                // text_1.style.color = "#333F48";
                // text_1.style.marginRight = "10px";
                // text_1.style.marginTop = "25px";
                // text_1.innerText = 'You have to follow the user before you can make comments at feeds page.'

                let followButton = document.createElement("button");
                followButton.textContent = "Follow"
                followButton.style.marginRight = "20px";
                followButton.style.marginTop = "20px";
                followButton.style.width = "80px";

                // textNButton.appendChild(text_1);
                textNButton.appendChild(followButton);
                nameNFollow.appendChild(textNButton);

                if (await getCurrentUserFollowOrNot() === '1') {
                    followButton.textContent = "Following";
                    // text_1.innerText = 'You now can interact with this user at feeds page.'
                }

                followButton.addEventListener("click", () => {
                    followUserButton(content['username'], followButton);
                })


            } else {
                let editButton = document.createElement("button");
                editButton.textContent = "Edit Profile";
                editButton.style.marginRight = "20px";
                editButton.style.marginTop = "20px";
                editButton.style.width = "90px";

                editButton.addEventListener("click", () => {
                    editProfile();
                });
                nameNFollow.appendChild(editButton);

                content['following'].toString().split(',').forEach(id => {
                    (async () => {
                        const rawResponse = await fetch('http://127.0.0.1:5000/user/?id=' + id, {
                            cache: "no-cache",
                            method: 'GET',
                            headers: {
                                'Accept': 'application/json',
                                'Authorization': tk
                            }
                        });
                        const content = await rawResponse.json();
                        if (rawResponse["status"] !== 200) {
                            console.warn(`API_ERROR: ${content.message}`);
                            alert(content.message)
                        } else {
                            followingDetails.textContent += (content['username'] + ' ')
                        }
                    })();


                });
                numContainer.appendChild(followingDetails);
            }
            container.appendChild(titleContainer);
            container.appendChild(nameNFollow);
            container.appendChild(userName);
            container.appendChild(emailContainer);
            container.appendChild(numContainer);

            if (content['posts'].toString() !== '') {
                let title = document.createElement("div");
                title.innerText = "Posts";
                title.style.fontFamily = "system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Ubuntu, Helvetica Neue, sans-serif";
                title.style.lineHeight = "1.3125";
                title.style.fontSize = "15pt";
                title.style.fontWeight = "bold";
                title.innerText = "Posts";
                title.style.borderBottom = "1px solid #cfd6dd";
                title.style.borderTop = "1px solid #cfd6dd";
                title.style.paddingBottom = "10px";
                title.style.paddingLeft = "15px";
                title.style.marginTop = "10px";
                title.style.paddingTop = "10px";
                container.appendChild(title);

                content['posts'].toString().split(',').forEach(id => {
                    (async () => {
                        const rawResponse = await fetch('http://127.0.0.1:5000/post/?id=' + id, {
                            cache: "no-cache",
                            method: 'GET',
                            headers: {
                                'Accept': 'application/json',
                                'Authorization': tk
                            }
                        });
                        const content = await rawResponse.json();
                        if (rawResponse["status"] !== 200) {
                            console.warn(`API_ERROR: ${content.message}`);
                            alert(content.message)
                        } else {
                            let postC = document.createElement("div");
                            postC.style.display = "flex";
                            postC.style.flexDirection = "row";
                            postC.style.borderBottom = "1px solid #cfd6dd";
                            postC.style.paddingLeft = "15px";
                            postC.style.paddingTop = "10px";
                            postC.style.paddingBottom = "10px";
                            postC.style.justifyContent = "space-between";

                            let postDiv = document.createElement("div");
                            postDiv.style.display = "flex";
                            postDiv.style.flexDirection = "column";

                            let authorLineDiv = document.createElement("div");
                            authorLineDiv.style.display = "flex";
                            authorLineDiv.style.flexDirection = "row";

                            let authorDiv = document.createElement("div");
                            authorDiv.innerText = content['meta']['author'];
                            authorDiv.style.fontWeight = "bold";
                            authorDiv.style.fontSize = "13pt";

                            let timeDiv = document.createElement("div");
                            let timeStamp = parseFloat(content['meta']['published']);
                            timeDiv.innerText = '· ' + new Date(timeStamp).toLocaleString("en-AU", {
                                month: 'short',
                                hour12: 'true',
                                year: 'numeric',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                            });
                            timeDiv.style.fontSize = "11pt";
                            timeDiv.style.color = "#6b7785";
                            timeDiv.style.marginLeft = "6px";
                            timeDiv.style.paddingTop = "3px";
                            timeDiv.setAttribute("id", id);

                            authorLineDiv.appendChild(authorDiv);
                            authorLineDiv.appendChild(timeDiv);

                            if (getCookie('currentProfileUserId') === getCookie('currentUserId')) {
                                let editPostButton = document.createElement("button");
                                editPostButton.textContent = "Edit";
                                editPostButton.style.marginLeft = "8px";
                                editPostButton.style.marginTop = "1px";
                                editPostButton.style.width = "60px";
                                editPostButton.style.height = "23px";
                                editPostButton.setAttribute("id", '0');

                                editPostButton.addEventListener("click", () => {
                                    if (editPostButton.id.toString() === '1') {
                                    } else {
                                        editPostButton.setAttribute("id", '1');
                                        let newPostInputDiv = document.createElement("div");
                                        newPostInputDiv.style.width = "350px";
                                        newPostInputDiv.style.height = "23px";
                                        newPostInputDiv.style.border = "1px solid #d2d5da";
                                        newPostInputDiv.style.borderRadius = "3px";
                                        newPostInputDiv.style.marginLeft = "8px";
                                        newPostInputDiv.style.backgroundColor = "white";
                                        let newPostInput = document.createElement("input");
                                        newPostInput.style.border = "none";
                                        newPostInput.placeholder = descDiv.innerText;
                                        newPostInput.style.marginLeft = "2px";
                                        newPostInput.style.height = "21px";
                                        newPostInput.style.width = "340px";
                                        newPostInput.style.fontSize = "11pt";
                                        newPostInput.type = "text";
                                        newPostInputDiv.appendChild(newPostInput);
                                        authorLineDiv.appendChild(newPostInputDiv);

                                        let submitButton = document.createElement("button");
                                        submitButton.textContent = "Submit";
                                        submitButton.style.marginLeft = "8px";
                                        submitButton.style.marginTop = "1px";
                                        submitButton.style.width = "60px";
                                        submitButton.style.height = "23px";
                                        submitButton.style.color = "white";
                                        submitButton.style.backgroundColor = "#d52a2a";
                                        submitButton.style.border = "none";
                                        authorLineDiv.appendChild(submitButton);

                                        submitButton.addEventListener("click", () => {
                                            if (newPostInput.value.toString() === '') {
                                                editPostButton.setAttribute("id", '0');
                                                authorLineDiv.removeChild(newPostInputDiv);
                                                authorLineDiv.removeChild(submitButton);
                                                authorLineDiv.removeChild(cancelButton);
                                                authorLineDiv.removeChild(deleteButton);
                                            } else {
                                                (async () => {
                                                    const rawResponse = await fetch('http://127.0.0.1:5000/post/?id=' + timeDiv.id, {
                                                        cache: "no-cache",
                                                        method: 'PUT',
                                                        headers: {
                                                            'Accept': 'application/json',
                                                            'Content-Type': 'application/json',
                                                            'Authorization': tk
                                                        },
                                                        body: JSON.stringify({
                                                            description_text: newPostInput.value,
                                                            src: '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'
                                                        })
                                                    });
                                                    const content = await rawResponse.json();
                                                    if (rawResponse["status"] !== 200) {
                                                        console.warn(`API_ERROR: ${content.message}`);
                                                        alert(content.message)
                                                    } else {
                                                        descDiv.innerText = newPostInput.value;
                                                        editPostButton.setAttribute("id", '0');
                                                        authorLineDiv.removeChild(newPostInputDiv);
                                                        authorLineDiv.removeChild(submitButton);
                                                        authorLineDiv.removeChild(cancelButton);
                                                        authorLineDiv.removeChild(deleteButton);
                                                    }
                                                })();
                                            }
                                        })

                                        let cancelButton = document.createElement("button");
                                        cancelButton.textContent = "Cancel";
                                        cancelButton.style.marginLeft = "8px";
                                        cancelButton.style.marginTop = "1px";
                                        cancelButton.style.width = "60px";
                                        cancelButton.style.height = "23px";
                                        authorLineDiv.appendChild(cancelButton);

                                        cancelButton.addEventListener("click", () => {
                                            editPostButton.setAttribute("id", '0');
                                            authorLineDiv.removeChild(newPostInputDiv);
                                            authorLineDiv.removeChild(submitButton);
                                            authorLineDiv.removeChild(cancelButton);
                                            authorLineDiv.removeChild(deleteButton);
                                        })

                                        let deleteButton = document.createElement("button");
                                        deleteButton.textContent = "Delete";
                                        deleteButton.style.marginLeft = "8px";
                                        deleteButton.style.marginTop = "1px";
                                        deleteButton.style.width = "60px";
                                        deleteButton.style.height = "23px";
                                        deleteButton.style.color = "white";
                                        deleteButton.style.backgroundColor = "#2b2b2b";
                                        deleteButton.style.border = "none";
                                        authorLineDiv.appendChild(deleteButton);

                                        deleteButton.addEventListener("click", () => {
                                            (async () => {
                                                const rawResponse = await fetch('http://127.0.0.1:5000/post/?id=' + timeDiv.id, {
                                                    cache: "no-cache",
                                                    method: 'DELETE',
                                                    headers: {
                                                        'Accept': 'application/json',
                                                        'Authorization': tk
                                                    }
                                                });
                                                const content = await rawResponse.json();
                                                if (rawResponse["status"] !== 200) {
                                                    console.warn(`API_ERROR: ${content.message}`);
                                                    alert(content.message)
                                                } else {
                                                    profilePage(getCookie('currentUserId'));
                                                }
                                            })();
                                        })

                                    }

                                });
                                authorLineDiv.appendChild(editPostButton);
                            }


                            let descDiv = document.createElement("div");
                            descDiv.style.marginTop = "3px";
                            descDiv.innerText = content['meta']['description_text'];

                            let statusDiv = document.createElement("div");
                            statusDiv.style.marginBottom = "-5px";
                            statusDiv.style.display = "flex";
                            statusDiv.style.flexDirection = "column";

                            let likesDiv = document.createElement("div");
                            likesDiv.style.display = "flex";
                            likesDiv.style.flexDirection = "row";
                            let icon2Div = document.createElement("div");
                            icon2Div.addEventListener("click", () => {
                                likeButton(content['id'], icon2Text, likesDetailsDiv);
                            })
                            icon2Div.style.paddingTop = "5px";
                            let icon2Text = document.createElement("div");
                            icon2Text.innerText = "0";
                            icon2Text.style.lineHeight = "10pt";
                            icon2Text.style.paddingTop = "10px";
                            icon2Text.style.margin = "0";
                            icon2Text.style.marginLeft = "8px";
                            let icon2 = document.createElement("img");
                            icon2.src = "data:image/png;base64,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"
                            icon2.style.width = "20px";
                            icon2Div.appendChild(icon2);
                            likesDiv.appendChild(icon2Div);
                            likesDiv.appendChild(icon2Text);

                            let likesDetailsDiv = document.createElement("div");
                            likesDetailsDiv.style.marginLeft = "7px";
                            likesDetailsDiv.style.paddingTop = "7px";
                            likesDetailsDiv.style.color = "#6b7785";
                            likesDiv.appendChild(likesDetailsDiv);

                            if ((content['meta']['likes']).toString() !== "") {
                                likesDetailsDiv.textContent = 'by ';

                                let likesNumber = content['meta']['likes'].toString().split(',');
                                icon2Text.innerText = likesNumber.length.toString();

                                let currentUserId = getCookie('currentUserId');
                                likesNumber.forEach(e => {
                                    if (e.toString() === currentUserId) {
                                        likesDetailsDiv.textContent += 'You ';
                                    } else {
                                        (async () => {
                                            const rawResponse = await fetch('http://127.0.0.1:5000/user/?id=' + e, {
                                                cache: "no-cache",
                                                method: 'GET',
                                                headers: {
                                                    'Accept': 'application/json',
                                                    'Authorization': tk
                                                }
                                            });
                                            const content = await rawResponse.json();
                                            if (rawResponse["status"] !== 200) {
                                                console.warn(`API_ERROR: ${content.message}`);
                                                alert(content.message)
                                            } else {
                                                likesDetailsDiv.textContent += (content['name'] + ' ');
                                            }
                                        })();
                                    }
                                })
                            }

                            let CommentsDiv = document.createElement("div");
                            CommentsDiv.style.display = "flex";
                            CommentsDiv.style.flexDirection = "row";
                            let icon1Div = document.createElement("div");
                            icon1Div.style.paddingTop = "5px";
                            icon1Div.style.marginLeft = "-3px";
                            let icon1 = document.createElement("img");
                            icon1.src = "data:image/png;base64,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"
                            icon1.style.width = "25px";
                            icon1Div.appendChild(icon1);
                            let icon1Text = document.createElement("div");
                            icon1Text.innerText = "0";
                            icon1Text.style.lineHeight = "10pt";
                            icon1Text.style.paddingTop = "10px";
                            icon1Text.style.margin = "0";
                            icon1Text.style.marginLeft = "6px";
                            CommentsDiv.appendChild(icon1Div);
                            CommentsDiv.appendChild(icon1Text);

                            if (content['comments'].toString() !== "") {
                                icon1Text.innerText = content['comments'].toString().split(',').length.toString();
                                let commentsDetailsDiv = document.createElement("div");
                                commentsDetailsDiv.style.display = "flex";
                                commentsDetailsDiv.style.flexDirection = "column";
                                commentsDetailsDiv.style.paddingTop = "8px";
                                commentsDetailsDiv.style.marginLeft = "6px";
                                commentsDetailsDiv.style.marginBottom = "7px";
                                Object.keys(content['comments']).forEach(function (e) {
                                    let commentDetail = document.createElement("div");
                                    commentDetail.style.marginBottom = "4px";

                                    let authorLineDiv = document.createElement("div");
                                    authorLineDiv.style.display = "flex";
                                    authorLineDiv.style.flexDirection = "row";

                                    let authorDiv = document.createElement("div");
                                    authorDiv.innerText = content['comments'][e]['author'];
                                    authorDiv.style.fontWeight = "bold";
                                    authorDiv.style.fontSize = "11pt";

                                    authorDiv.addEventListener("click", () => {
                                        profilePage('', content['comments'][e]['author']);
                                    })

                                    let timeDiv = document.createElement("div");
                                    let timeStamp = parseFloat(content['comments'][e]['published']);
                                    timeDiv.innerText = '· ' + new Date(timeStamp).toLocaleString("en-AU", {
                                        month: 'short',
                                        hour12: 'true',
                                        year: 'numeric',
                                        day: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit'
                                    });
                                    timeDiv.style.fontSize = "11pt";
                                    timeDiv.style.color = "#6b7785";
                                    timeDiv.style.fontSize = "11pt";
                                    timeDiv.style.marginLeft = "6px";
                                    timeDiv.style.paddingTop = "0px";

                                    let comment = document.createElement("div");
                                    comment.style.marginTop = "3px";
                                    comment.style.fontSize = "11pt";
                                    comment.innerText = content['comments'][e]['comment'];

                                    authorLineDiv.appendChild(authorDiv);
                                    authorLineDiv.appendChild(timeDiv);

                                    commentDetail.appendChild(authorLineDiv);
                                    commentDetail.appendChild(comment);

                                    commentsDetailsDiv.appendChild(commentDetail);
                                    CommentsDiv.appendChild(commentsDetailsDiv);
                                });
                            }

                            let rightDiv = document.createElement("div");

                            let thumbnailDiv = document.createElement("div");
                            let thumbnail = document.createElement("img");
                            thumbnail.src = "data:image/png;base64, " + content['thumbnail'];
                            thumbnail.style.width = "auto";
                            thumbnailDiv.style.paddingRight = "10px";

                            thumbnailDiv.appendChild(thumbnail);
                            rightDiv.appendChild(thumbnailDiv);

                            statusDiv.appendChild(likesDiv);
                            statusDiv.appendChild(CommentsDiv);

                            postDiv.appendChild(authorLineDiv);
                            postDiv.appendChild(descDiv);
                            postDiv.appendChild(statusDiv);

                            postC.appendChild(postDiv);
                            postC.appendChild(rightDiv);

                            container.appendChild(postC);

                        }
                    })();
                })
            }
        }
    })();

    body.appendChild(container);
}

function followUserButton(username, button) {
    let tk = 'Token ' + getCookie('token');
    if (button.innerText === 'Following') {
        (async () => {
            const rawResponse = await fetch('http://127.0.0.1:5000/user/unfollow?username=' + username, {
                cache: "no-cache",
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': tk
                }
            });
            const content = await rawResponse.json();
            if (rawResponse["status"] !== 200) {
                console.warn(`API_ERROR: ${content.message}`);
                alert(content.message)
            } else {
                button.innerText = "Follow";
                // text.innerText = 'You have to follow the user before you can make comments at feeds page.'
            }
        })();
    } else if (button.innerText === 'Follow') {
        (async () => {
            const rawResponse = await fetch('http://127.0.0.1:5000/user/follow?username=' + username, {
                cache: "no-cache",
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': tk
                }
            });
            const content = await rawResponse.json();
            if (rawResponse["status"] !== 200) {
                console.warn(`API_ERROR: ${content.message}`);
                alert(content.message)
            } else {
                button.innerText = "Following";
                // text.innerText = 'You now can interact with this user at feeds page.'
            }
        })();
    }
}

function editProfile() {
    let body = findBodyAndEmpty();
    let container = document.createElement("div");
    container.style.marginTop = "10px";
    container.style.marginBottom = "10px";
    container.style.paddingBottom = "10px";
    container.style.width = "1000px";
    container.style.backgroundColor = "#ffffff";
    container.style.boxShadow = "0 2px 6px 0 rgba(0, 0, 0, 0.2)"
    container.style.display = "flex";
    container.style.flexDirection = "column";

    let titleContainer = document.createElement("div");
    titleContainer.style.display = "flex";
    titleContainer.style.flexDirection = "row";
    titleContainer.style.paddingTop = "10px";
    titleContainer.style.paddingBottom = "10px";
    titleContainer.style.paddingLeft = "15px";
    titleContainer.style.borderBottom = "1px solid #cfd6dd";
    let title = document.createElement("div");
    title.innerText = "User Profile";
    title.style.fontFamily = "system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Ubuntu, Helvetica Neue, sans-serif";
    title.style.lineHeight = "1.3125";
    title.style.fontSize = "15pt";
    title.style.fontWeight = "bold";
    let userId = document.createElement("div");
    userId.style.paddingTop = "7px";
    userId.style.paddingLeft = "5px";
    userId.style.fontSize = "11pt";
    userId.style.fontFamily = "Museo-Sans-500,Helvetica Neue,Helvetica,Arial,sans-serif";
    userId.style.fontWeight = "400";
    userId.style.color = "#333F48";
    titleContainer.appendChild(title);
    titleContainer.appendChild(userId);

    let nameNFollow = document.createElement("div");
    nameNFollow.style.display = "flex";
    nameNFollow.style.flexDirection = "row";
    nameNFollow.style.justifyContent = "space-between";
    let name = document.createElement("div");
    name.style.fontFamily = "Museo-Sans-500,Helvetica Neue,Helvetica,Arial,sans-serif";
    name.style.fontWeight = "400";
    name.style.color = "#333F48";
    name.style.fontSize = "20pt";
    name.style.fontWeight = "bold";
    name.style.marginTop = "15px";
    name.style.marginBottom = "0";
    name.style.paddingLeft = "15px";
    nameNFollow.appendChild(name);

    let userName = document.createElement("div");
    userName.style.margin = "0 0 10px 0";
    userName.style.marginTop = "0";
    userName.style.fontSize = "11pt";
    userName.style.paddingLeft = "15px";
    userName.style.marginBottom = "0";
    userName.style.fontFamily = "Museo-Sans-500,Helvetica Neue,Helvetica,Arial,sans-serif";
    userName.style.fontWeight = "400";
    userName.style.color = "#333F48";

    let emailContainer = document.createElement("div");
    emailContainer.style.display = "flex";
    emailContainer.style.fontFamily = "Museo-Sans-500,Helvetica Neue,Helvetica,Arial,sans-serif";
    emailContainer.style.fontWeight = "400";
    emailContainer.style.flexDirection = "row";
    emailContainer.style.marginTop = "15px";
    emailContainer.style.paddingLeft = "15px";
    let email = document.createElement("div");
    email.style.color = "#333F48";
    email.innerText = 'Current Email Address:';
    let text_2 = document.createElement("div");
    text_2.style.marginLeft = "5px";
    emailContainer.appendChild(email);
    emailContainer.appendChild(text_2);

    let emailDiv = document.createElement("div");
    emailDiv.style.marginTop = "15px";
    emailDiv.style.width = "370px";
    emailDiv.style.height = "22px";
    emailDiv.style.border = "1px solid #d2d5da";
    emailDiv.style.borderRadius = "3px";
    emailDiv.style.padding = "calc(0.75rem - 1px) 1rem";
    emailDiv.style.marginLeft = "15px";
    emailDiv.style.display = "flex";

    let icon4Div = document.createElement("div");
    let icon4Img = document.createElement("img");
    icon4Div.style.marginLeft = "-8px";
    icon4Div.style.marginTop = "-3px";
    icon4Img.src = 'src/icon/1.png';
    icon4Img.width = 30;
    icon4Div.appendChild(icon4Img);

    let emailInputDiv = document.createElement("div");
    emailInputDiv.style.display = "flex";
    emailInputDiv.style.flexDirection = "row";
    let emailInput = document.createElement("input");
    emailInputDiv.style.marginLeft = "7px";
    emailInputDiv.style.marginTop = "-6px";
    emailInput.placeholder = "New Email Address";
    emailInput.style.border = "none";
    emailInput.style.height = "32px";
    emailInput.style.width = "350px";
    emailInput.style.fontSize = "13pt";
    emailInput.type = "text";
    emailInputDiv.appendChild(emailInput);

    emailDiv.appendChild(icon4Div);
    emailDiv.appendChild(emailInputDiv);

    let passwordDiv = document.createElement("div");
    passwordDiv.style.width = "370px";
    passwordDiv.style.height = "22px";
    passwordDiv.style.border = "1px solid #d2d5da";
    passwordDiv.style.borderRadius = "3px";
    passwordDiv.style.padding = "calc(0.75rem - 1px) 1rem";
    passwordDiv.style.display = "flex";
    passwordDiv.style.marginTop = "15px";
    passwordDiv.style.marginLeft = "15px";
    let icon2Div = document.createElement("div");
    let icon2Img = document.createElement("img");
    icon2Div.style.marginLeft = "-8px";
    icon2Div.style.marginTop = "-4px";
    icon2Img.src = 'src/icon/2.png';
    icon2Img.width = 30;
    icon2Div.appendChild(icon2Img);
    let passwordInputDiv = document.createElement("div");
    passwordInputDiv.style.marginTop = "30px";
    let passwordInput = document.createElement("input");
    passwordInputDiv.style.marginTop = "-6px";
    passwordInput.placeholder = "New Password";
    passwordInput.style.border = "none";
    passwordInput.style.width = "350px";
    passwordInput.style.marginLeft = "7px";
    passwordInput.style.height = "32px";
    passwordInput.style.fontSize = "13pt";
    passwordInput.name = "password";
    passwordInput.type = "password";
    passwordDiv.appendChild(icon2Div);
    passwordDiv.appendChild(passwordInputDiv);
    passwordInputDiv.appendChild(passwordInput);

    let passwordConfirmDiv = document.createElement("div");
    passwordConfirmDiv.style.width = "370px";
    passwordConfirmDiv.style.height = "22px";
    passwordConfirmDiv.style.border = "1px solid #d2d5da";
    passwordConfirmDiv.style.borderRadius = "3px";
    passwordConfirmDiv.style.padding = "calc(0.75rem - 1px) 1rem";
    passwordConfirmDiv.style.display = "flex";
    passwordConfirmDiv.style.marginTop = "15px";
    passwordConfirmDiv.style.marginLeft = "15px";
    let icon3Div = document.createElement("div");
    let icon3Img = document.createElement("img");
    icon3Img.src = 'src/icon/2.png';
    icon3Img.width = 30;
    icon2Div.appendChild(icon2Img);
    icon3Div.style.marginLeft = "-8px";
    icon3Div.style.marginTop = "-4px";
    icon3Div.appendChild(icon3Img);
    let passwordConfirmInputConfirmDiv = document.createElement("div");
    let passwordConfirmInput = document.createElement("input");
    passwordConfirmInputConfirmDiv.style.marginTop = "-6px";
    passwordConfirmInput.placeholder = "Confirm password";
    passwordConfirmInput.style.border = "none";
    passwordConfirmInput.style.width = "350px";
    passwordConfirmInput.style.marginLeft = "7px";
    passwordConfirmInput.style.height = "32px";
    passwordConfirmInput.style.fontSize = "13pt";
    passwordConfirmInput.name = "password";
    passwordConfirmInput.type = "password";
    passwordConfirmDiv.appendChild(icon3Div);
    passwordConfirmDiv.appendChild(passwordConfirmInputConfirmDiv);
    passwordConfirmInputConfirmDiv.appendChild(passwordConfirmInput);

    let submitButtonDiv = document.createElement("div");
    submitButtonDiv.style.marginTop = "20px";
    submitButtonDiv.style.marginLeft = "15px";
    let submitButton = document.createElement("button");
    submitButton.style.width = "405px";
    submitButton.style.height = "50px";
    submitButton.textContent = "Save changes";
    submitButton.style.backgroundColor = "#d52a2a";
    submitButton.style.color = "white";
    submitButton.style.marginBottom = "10px";
    submitButton.style.border = "none";
    submitButton.style.fontSize = "13pt";
    submitButton.type = "submit";
    submitButtonDiv.appendChild(submitButton);

    let notes = document.createElement("div");
    notes.innerText = "After making the above changes, you will be automatically logged out."
    notes.style.fontSize = "12pt";
    notes.style.marginTop = "15px";
    notes.style.paddingLeft = "15px";
    notes.style.fontFamily = "Museo-Sans-500,Helvetica Neue,Helvetica,Arial,sans-serif";
    notes.style.fontWeight = "400";
    notes.style.color = "#333F48";

    submitButton.addEventListener("click", () => {
        if (passwordInput.value !== passwordConfirmInput.value) {
            alert("New passwords didn't match. Try again.")
        } else (async () => {
            const rawResponse = await fetch('http://127.0.0.1:5000/user/', {
                cache: "no-cache",
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Token ' + getCookie('token').toString()
                },
                body: JSON.stringify({
                    email: emailInput.value,
                    password: passwordInput.value
                })
            });
            const content = await rawResponse.json();
            if (rawResponse["status"] !== 200) {
                console.warn(`API_ERROR: ${content.message}`);
                alert(content.message)
            } else {
                document.cookie = "token=; expires=Thu, 18 Dec 2013 12:00:00 UTC; path=/";
                document.cookie = "currentUserId=; expires=Thu, 18 Dec 2013 12:00:00 UTC; path=/";
                document.cookie = "currentProfileUserId=; expires=Thu, 18 Dec 2013 12:00:00 UTC; path=/";
                window.location.reload();
            }
        })();
    });


    (async () => {
        const rawResponse = await fetch('http://127.0.0.1:5000/user/', {
            cache: "no-cache",
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Token ' + getCookie('token').toString()
            }
        });
        const content = await rawResponse.json();
        if (rawResponse["status"] !== 200) {
            console.warn(`API_ERROR: ${content.message}`);
            alert(content.message)
        } else {
            userId.innerText = '#' + content['id'];
            name.innerText = content['name'];
            userName.innerText = '@' + content['username'];
            text_2.innerText = content['email'];
        }
    })();

    container.appendChild(titleContainer);
    container.appendChild(nameNFollow);
    container.appendChild(userName);
    container.appendChild(emailContainer);
    container.appendChild(emailDiv);
    container.appendChild(passwordDiv);
    container.appendChild(passwordConfirmDiv);
    container.appendChild(notes);
    container.appendChild(submitButtonDiv);
    body.appendChild(container);
}

window.onload = function () {
    document.cookie = "currentProfileUserId=; expires=Thu, 18 Dec 2013 12:00:00 UTC; path=/";
    if (checkLoginStatus() !== true) {
        loadLoginPage();
    } else loadMainPage();
}