

//Aqui estou usando jquery para ouvir oque esta sendo digitado no input, poderia fazer isso de outras maneiras no js Vanilla também.
$("#user").keyup(function () {
    searchUsers('users')
});

//Esta função busca a diração e qual api deve ser usada, além de fazer toda a formatação.
function searchUsers(type) {
    var userSingle = []
    //Aqui faço o filtro para saber descobrir a api e formatar o link de busca das informações.
    
    link = document.getElementById('user').value
    

    if(type == 'repo'){
        link = `${link}/repos`
    }

    if(type == 'starred'){
        link = `${link}/starred`
    }
    

        show = document.getElementById('show')
        list = document.getElementById('list')

    //Defino a variavel que contem a url para dar o fetch
    const URL = `https://api.github.com/users/${link}`;


    fetch(URL, {
        method: 'get',
        headers: {
            Accept: "application/vnd.github.v3+json"
        }
    })
        .then(function (response) {

            return response.json().then(function (json) {

                userSingle.push(json)

                //aqui formato para caso a busca seja de usuarios
                if (userSingle[0].login != undefined && type == 'users') {
                    show.innerHTML = ` 
                        <article class="show__article">
                            <img src="${userSingle[0].avatar_url}" class="show__img" alt=""> 
                        
                            <h2 class="show__title">${userSingle[0].name}</h2>
                            <div>
                            <button class="show__button" onclick="searchUsers('repo')">Repositorios</button>
                            <button class="show__button" onclick="searchUsers('starred')">Starred</button>
                            </div>
                            
                        </article>
            
                `}
                list.innerHTML = ""

                //Aqui formato para caso a busca seja de repositorios
                if(type == 'repo'){
                    console.log(userSingle)
                    repos = []
                    for(var i = 0; i < userSingle[0].length; i++){

                        if(userSingle[0][i].description == null){
                            description = "Sem descrição"
                        }
                        else{
                            description = userSingle[0][i].description
                        }
                        
                        repos.push(` 
                            <a class="list__link" href="${userSingle[0][i].svn_url}">
                                <article class="list__article">
                                    
                                
                                    <h4 class="list__title">${userSingle[0][i].name}</h4>
                                    <p class="list__description">${description} </p>
                    
                                
                                </article>
                            </a>
            
                        `)

                        
                        
                    }

                    list.innerHTML = repos.join("")
                    
                }
                //Aqui formato caso a busca seja de starred
                if(type == 'starred'){
                    console.log(userSingle)
                    repos = []
                    for(var i = 0; i < userSingle[0].length; i++){

                        if(userSingle[0][i].description == null){
                            description = "Sem descrição"
                        }
                        else{
                            description = userSingle[0][i].description
                        }
                        
                        repos.push(` 
                             <a class="list__link" href="${userSingle[0][i].svn_url}">
                                <article class="list__article">
                                    
                                
                                    <h4 class="list__title">${userSingle[0][i].name}</h4>
                                    <p class="list__description">${description} </p>
                    
                                
                                </article>
                            </a>
            
                        `)
                       
                        
                    }

                    
                    
                    list.innerHTML = repos.join("")
                    
                }


            });
        })
        .catch(function (err) { console.error(err); });






    userSingle = []

}

function repoShow(user) {

}