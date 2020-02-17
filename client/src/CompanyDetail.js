import React, { useState, useEffect } from "react";
import { loadCompany } from "./request";
import { JobList } from "./JobList";

export const CompanyDetail = ({
  match: {
    params: { companyId }
  }
}) => {
  const [company, setCompany] = useState(null);

  useEffect(() => {
    async function getCompany() {
      const company = await loadCompany(companyId);
      setCompany(company);
    }

    getCompany();
  }, [companyId]);

  if (!company) {
    return null;
  }

  return (
    <div>
      <h1 className="title">{company.name}</h1>
      <div className="box">{company.description}</div>
      <h5 className="title is-5">Jobs at {company.name}</h5>
      <JobList jobs={company.jobs} />
    </div>
  );
};
