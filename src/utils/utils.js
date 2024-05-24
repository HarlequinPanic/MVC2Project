function fetchFighters(){
    return fetch('http://localhost:4000/fighters')
        .then(data => data.json())
        .then(console.log('fighters fetched!'))
}

const fetchUsers = async (value) => {
    let URL = "http://localhost:4000/users"

    try{
        let res = await fetch(URL)
        let data = await res.json()
        console.log(data)
        return data
    }catch(err){
        console.error(err)
    }
}


export {fetchFighters, fetchUsers}

