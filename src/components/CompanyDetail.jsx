import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import JoblyApi from '../../../api';
import Apply from './Apply';


function CompanyDetail() {
  const { handle } = useParams();
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getCompany() {
      try {
        const companyData = await JoblyApi.getCompany(handle);
        setCompany(companyData);
      } catch (err) {
        console.error("There was an issue retrieving the company data", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    getCompany();
  }, [handle]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!company) return <p>No company info found.</p>;
  

  return (
    <div className='CompanyDetail-main'>
      <h1 className='CompanyDetail-title'>{ company.name }</h1>
      <p>{company.description}</p>
      <ul className='CompanyDetail-list'>
        {company.jobs.map(job => (
          <li key={job.id} className='CompanyDetail-list-item'>
            <Link to={`/jobs/${job.id}`}>{job.title}</Link>
            <Apply jobId={job.id} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CompanyDetail;

