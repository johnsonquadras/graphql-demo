import React, { useState, useEffect } from "react";
import { JobList } from "./JobList";
import { loadJobs } from "./request";

export const JobBoard = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    async function getJobs() {
      const jobs = await loadJobs();
      setJobs(jobs);
    }

    getJobs();
  }, []);

  return (
    <div>
      <h1 className="title">Job Board</h1>
      <JobList jobs={jobs} />
    </div>
  );
};
