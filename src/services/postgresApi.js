export const submitRecordToPostgres = (siteData) => {
  async function postData(url = '', data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    })
    return response.json() // parses JSON response into native JavaScript objects
  }
  
  postData(`${process.env.REACT_APP_POSTGRES_API_URL}/site/import/${siteData.id}?force=false`, siteData)
    .then(response => {
      console.log(response); // JSON data parsed by `data.json()` call
    });
}
