import React from 'react';
import Apply from './Apply';
import { Link } from 'react-router-dom'

function JobCard({ id, title }) {
  return (
    <div className="JobCard">
      <h2>{title}</h2>
      <Link to={`/jobs/${id}`}>More details</Link>
      <Apply jobId={id} />
    </div>
  );
}

export default JobCard;
