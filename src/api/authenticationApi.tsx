const authenticate = async (username: string, password: string) => {
  // fetch('assets/credentials.json')
  //   .then((response) => response.json())
  //   .then((json) => console.log(json))
  //   .catch((error) => console.log(error));
  
  try {
    const creds = await fetch('../assets/credentials.json');
  
    if (creds.ok) {
      const data = await creds.json();
      console.log(data);
    }
  }
  catch (exception: any) {
    console.log(exception);
  }
  
  return false;
}

export default authenticate