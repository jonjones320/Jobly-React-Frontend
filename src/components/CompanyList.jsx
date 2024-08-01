import React, { useEffect, useState } from 'react';
import JoblyApi from '../../api';
import CompanyCard from './CompanyCard';


function CompanyList() {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getCompanies(searchQuery = '') {
      try {
        const companiesData = await JoblyApi.getCompanyAll({ nameLike: searchQuery });
        setCompanies(companiesData);
      } catch (err) {
        console.error("There was an issue retrieving the company data", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    getCompanies(searchTerm);
  }, [searchTerm]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setCompanies([]);
  }

  if (loading) {return <p>Loading...</p>};

  if (error) {return <p>Error: {error}</p>};

  return (
    <div className='CompanyList-main'>
      <h2 className='CompanyList-title'>List of all companies</h2>
      <form onSubmit={handleSearchSubmit}>
      <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search"
        />
        <button type="submit">Search</button>
      </form>
      <ul className='CompanyList-list'>
        {companies.map(company => (
          < CompanyCard
            key={company.handle}
            handle={company.handle}
            name={company.name}
            description={company.description}
          />
        ))}
      </ul>
    </div>
  );
}

export default CompanyList;
