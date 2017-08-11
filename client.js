const GitHubORG = 'HackYourFuture';
const HYFReposApiEndPoint = `https://api.github.com/orgs/${GitHubORG}/repos`;
const HYFMembersApiEndPoint = `https://api.github.com/orgs/${GitHubORG}/members`

function fetchAPI(url, cb) {
    let request = new XMLHttpRequest();
    request.addEventListener('load', function () {
        cb(JSON.parse(this.responseText));
    })
    request.open('GET', url);
    request.send();
}
function RenderRepoList(name, url) {
    const ul = document.getElementsByClassName("repos")[0];
    const li = document.createElement('li');
    const a = document.createElement("a");
    a.textContent = name;
    a.setAttribute('href', url);
    li.appendChild(a);
    ul.appendChild(li);
}
function RenderMembersList(name, url) {
    const ul = document.getElementsByClassName("members")[0];
    const li = document.createElement('li');
    const a = document.createElement('a');
    const img = document.createElement('img');
    img.setAttribute('src', url);
    img.setAttribute('width', 100);
    li.appendChild(img);
    a.setAttribute('href', url);
    a.textContent = name;
    li.appendChild(a);
    ul.appendChild(li);
}
fetchAPI(HYFReposApiEndPoint, function cb(repositoriesList) {
    let list = repositoriesList.reduce((prev, current) => {
        RenderRepoList(current.name, current.url);
    }, '');
});
fetchAPI(HYFMembersApiEndPoint, (membersList) => {
    let list = membersList.reduce((prev, current) => {
        RenderMembersList(current.login, current.avatar_url);
    }, '');
});
