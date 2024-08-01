import React from 'react';
import { Link } from 'react-router-dom'

function CompanyCard({ handle, name, description }) {
  return (
    <div className="CompanyCard">
      <h3>{name}</h3>
      <p>{description}</p>
      <Link to={`/companies/${handle}`}>View company</Link>
    </div>
  );
}

export default CompanyCard;
