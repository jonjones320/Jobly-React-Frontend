import React, { useEffect, useState } from 'react';
import JoblyApi from '../../api';
import JobCard from './JobCard';


function JobList() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getJobs() {
      try {
        const jobsData = await JoblyApi.getJobAll();
        setJobs(jobsData);
      } catch (err) {
        console.error("There was an issue retrieving the job data", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    getJobs();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!jobs) return <p>No jobs found.</p>;

  return (
    <div className='JobList-main'>
      <h1 className='JobList-title'>List of the available jobs</h1>
      <ul className='JobList-list'>
        {jobs.map(job => (
          <JobCard 
          key={job.id}
          id={job.id}
          title={job.title}
          />
        ))}
      </ul>
    </div>
  );
}

export default JobList;

