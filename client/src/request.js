const graphqlURL = "http://localhost:3001/graphql";

async function fetchData(query, variables) {
  const response = await fetch(graphqlURL, {
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify({
      query,
      variables
    })
  });

  const responseBody = await response.json();
  if (responseBody.errors) {
    const messages = responseBody.errors.map(error => {
      return error.message;
    });
    const messageError = messages.join("\n");
    throw new Error("Graphql error", messageError);
  }
  const { data } = responseBody;
  return data;
}

export async function loadJobs() {
  const query = `query {
        jobs {
          id
          title
          company {
            id
            name
          }
         
        }
      }`;

  const { jobs } = await fetchData(query);
  return jobs;
}

export async function loadsJob(id) {
  const JobQuery = `
    query JobQuery($id:ID!){
        job(id: $id) {
            id
            title
            company {
            id
            name
            }
            description
        }
    }
  `;

  const { job } = await fetchData(JobQuery, { id });
  return job;
}

export async function loadCompany(id) {
  const CompanyQuery = `
        query CompanyQuery($id:ID!){
            company(id: $id) {
            id
            name
            description
            jobs {
                id
                title
            }
        }
        }
    `;

  const { company } = await fetchData(CompanyQuery, { id });
  return company;
}
