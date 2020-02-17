import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { loadsJob } from "./request";

export const JobDetail = ({
  match: {
    params: { jobId }
  }
}) => {
  const [job, setJob] = useState(null);

  useEffect(() => {
    async function getJob() {
      const job = await loadsJob(jobId);
      setJob(job);
    }

    getJob();
  }, [jobId]);

  if (!job) {
    return null;
  }

  return (
    <div>
      <h1 className="title">{job.title}</h1>
      <h2 className="subtitle">
        <Link to={`/companies/${job.company.id}`}>{job.company.name}</Link>
      </h2>
      <div className="box">{job.description}</div>
    </div>
  );
};
