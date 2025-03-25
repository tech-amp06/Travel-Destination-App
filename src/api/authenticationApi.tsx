const authenticate = async (username: string, password: string) => {
  fetch('http://localhost:3000/')
    .then((response) => response.json())
    .then((json) => console.log(json));
  
//   try {
//     const creds = await fetch('../assets/credentials.json');
  
//     if (creds.ok) {
//       const data = await creds.json();
//       console.log(data);
//     }
//   }
//   catch (exception: any) {
//     console.log(exception);
//   }
  
//   return false;
}

export default authenticate