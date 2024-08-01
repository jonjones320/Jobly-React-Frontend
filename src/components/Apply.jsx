import React, { useContext, useState, useEffect } from 'react';
import AuthContext from '../context/AuthContext';
import JoblyApi from '../../../api';

function Apply({ jobId }) {
    const { currentUser, setCurrentUser } = useContext(AuthContext);
    const [error, setError] = useState(null);
    const [hasApplied, setHasApplied] = useState(false);

    useEffect(() => {
        if (currentUser && currentUser.jobs) {
            setHasApplied(currentUser.jobs.some(job => job.id === jobId))
        }
    }, [currentUser, jobId]);

    const handleApply = async() => {
        try {
            await JoblyApi.apply(currentUser.username, jobId);
            setHasApplied(true);
            setCurrentUser(prevUser => ({
                ...prevUser,
                jobs: [...(prevUser.jobs || []), { id: jobId }]
            }));
        } catch(err) {
            setError('There was an error applying for this job. Please try again.');
        }
    };

    return (
        <div>
            {error && <p>{error}</p>}
            <button onClick={handleApply} disabled={hasApplied}>
                {hasApplied ? 'Applied' : 'Apply'}
            </button>
        </div>
    );
}

export default Apply;