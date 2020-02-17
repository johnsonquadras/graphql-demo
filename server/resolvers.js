const db = require("./db");

const getJobs = () => {
  return db.jobs.list();
};

const getJob = (root, { id }) => {
  return db.jobs.get(id);
};

const getCompany = (root, { id }) => {
  return db.companies.get(id);
};

const getJobByCompany = company => {
  const { id: companyId } = company;
  const jobs = db.jobs.list();

  return jobs.filter(job => {
    return job.companyId === companyId;
  });
};

const createJob = (root, { input }, context) => {
  if (!context.user) {
    throw new Error("Unauthorized");
  }

  const id = db.jobs.create({ ...input, companyId: context.user.companyId });
  return db.jobs.get(id);
};

const Query = {
  jobs: getJobs,
  job: getJob,
  company: getCompany
};

const Mutation = {
  createJob: createJob
};

const Company = {
  jobs: getJobByCompany
};

const Job = {
  company: job => {
    return db.companies.get(job.companyId);
  }
};

module.exports = { Query, Mutation, Job, Company };
