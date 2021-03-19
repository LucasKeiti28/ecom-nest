const axios = require('axios');

( 
  async () => {
  const {data} = await axios.post('http://localhost:3000/auth/register', {
    username: 'user3',
    password: '123123',
    seller: true
  })

  console.log(data)

/*   try {
    const {data} = await axios.get('http://localhost:3000/auth', {
      headers: { authorization: `Bearer ${token}` }
    })
    console.log("Logged In", data)
  } catch (error) {
    console.log(error.response.data)
  } */


})();