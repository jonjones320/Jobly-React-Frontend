import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import JoblyApi from '../../api';
import CompanyCard from './CompanyCard';
import Apply from './Apply';


function JobDetail() {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getJob() {
      try {
        const jobData = await JoblyApi.getJob(id);
        setJob(jobData);
        console.log(jobData);
      } catch (err) {
        console.error("There was an issue retrieving the job data", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    getJob();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!job) return <p>No job info found.</p>;
  

  return (
    <div className='JobDetail-main'>
      <h1 className='JobDetail-title'>{ job.title }</h1>
      <p>Salary: {job.salary}</p>
      <p>Equity: {job.equity || "Not currently available"}</p>
      <h3>Employer: </h3>
      <CompanyCard 
        key={job.company.handle}
        handle={job.company.handle}
        name={job.company.name}
        description={job.company.description}
      />
      <Apply jobId={job.id} />
    </div>
  );
}

export default JobDetail;

