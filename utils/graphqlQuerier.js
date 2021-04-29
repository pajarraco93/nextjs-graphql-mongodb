const graphqlQuerier = async function (query) {
  const response = await fetch('http://localhost:3000/api/graphql', {
    headers: { 'content-type': 'application/json' },
    method: 'POST',
    body: query,
  });

  const responseJson = await response.json();
  return responseJson.data;
};

export default graphqlQuerier;
