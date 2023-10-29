const sInput =  document.getElementById('sInput');
const uList =  document.getElementById('uList');
const uButton =  document.getElementById('user');
let usersData = [];

function clickUser(userDiv) {
    let user = usersData[userDiv.dataset.userId];
    const popup = document.querySelector('.popup');
    popup.style.display = 'flex';
    popup.innerHTML = `
        <div class="popupContent">
            <div class="popupHead">
                <div class="name">${user.name}</div>
                <img class="popupClose" src="./images/close.svg">
            </div>
            <table class="popupTable">
                <tr>
                    <td>Телефон:</td>
                    <td>${user.phone}</td>
                </tr>
                <tr>
                    <td>Почта:</td>
                    <td>${user.email}</td>
                </tr>
                <tr>
                    <td>Дата приема:</td>
                    <td>${user.hire_date}</td>
                </tr>
                <tr>
                    <td>Должность:</td>
                    <td>${user.position_name}</td>
                </tr>
                <tr>
                    <td>Подразделение:</td>
                    <td>${user.department}</td>
                </tr>
            </table>
            <div class="popupInformation">
                <p>Дополнительная информация:</p>
                <p>${user.address}</p>
            </div>
        </div>
    `;
    popup.addEventListener('click', (event) => {
        const target = event.target;
        if(target.className == 'popup' || target.className == 'popupClose') {
            popup.style.display = 'none';
        }
    });
}

async function loadUsers(sTerm) {
    try {
        const responce = await fetch(`http://127.0.0.1:3000/?term=${sTerm}`);
        if (responce.ok) {
            const users = await responce.json();
            usersData = users;
            uList.innerHTML = '';
            users.forEach((user, num) => {
                const item = document.createElement('div');
                item.className = 'user';
                item.dataset.userId = num;
                item.innerHTML = `
                    <div class="name">${user.name}</div>
                    <div class="info phone">${user.phone}</div>
                    <div class="info email">${user.email}</div>
                `;
                uList.appendChild(item);
            });

            uList.addEventListener('click', (event) => {
                const userDiv = event.target.closest('.user');
                if (userDiv) clickUser(userDiv);
            });
        }
        else {
            console.log(responce);
        }
    } catch (error) {
        console.log(error);
    }
}

sInput.addEventListener('input', (e) => {
    const sTerm = e.target.value;
    loadUsers(sTerm);
});


window.addEventListener('load', () => {
    loadUsers('');
});