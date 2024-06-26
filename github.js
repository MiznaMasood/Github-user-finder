const API_URL = 'https://api.github.com/users';
const main = document.getElementById('main');
const searchBox = document.getElementById('search')

const getUser = async (username) => {
    const response = await fetch(`${API_URL}/${username}`);
    const data = await response.json();
    console.log(data);

    const card = `
       <div class="card">
    <div>
        <img src="${data.avatar_url}" alt="User Avatar">
    </div>
    <div class="user-info">
        <h2>${data.name}</h2>
        <p>${data.bio}</p>
        <ul class="info">
            <li>${data.followers}<strong>Followers</strong></li>
            <li>${data.following}<strong>Following</strong></li>
            <li>${data.public_repos}<strong>Repos</strong></li>
        </ul>
        <div id="repos" class="repos"></div>
    </div>
</div>
`;

    main.innerHTML = card;
    getRepos(username);
}


const getRepos = async (username) => {
    const reposResponse = await fetch(`${API_URL}/${username}/repos`);
    const repoData = await reposResponse.json();

    const reposContainer = document.getElementById('repos');
    reposContainer.innerHTML = ''; 

    repoData.forEach(item => {
        const repoLink = document.createElement('a');
        repoLink.classList.add('repo');
        repoLink.href = item.html_url;
        repoLink.target = "_blank";
        repoLink.innerText = item.name;
        reposContainer.appendChild(repoLink);
    });
}

const formSubmit = ()=>{
   
    if(searchBox.value != ""){
        getUser(searchBox.value);
        searchBox.value = ""
    }
 return false;
}


searchBox.addEventListener(
    "focusout",
    function ( ){
        formSubmit()
    }
)














