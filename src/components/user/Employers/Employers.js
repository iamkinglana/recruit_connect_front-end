import React, { useState, useEffect } from 'react';
import './Employers.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navigate, useNavigate } from 'react-router-dom';

function EmployerList() {
    const navigate = useNavigate()
    const [employers, setEmployers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);



    useEffect(() => {
        fetch('/employers')
            .then((r) => r.json())
            .then((data) => setEmployers(data))
            .catch((error) => console.error('Error fetching data:', error));
    }, []);

    useEffect(() => {
        const filteredEmployers = employers.filter((employer) =>
            employer.name && employer.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setSearchResults(filteredEmployers);
    }, [searchTerm, employers]);



    return (
        <div className="container">

            <div className="row">

                <main className="col-md-12  px-md-4">
                    <h1 className="mb-4">Employers List</h1>
                    <div className="input-group mb-3">
                        <input type="text"
                            className="form-control"
                            placeholder="Search employers by name..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <button className="btn btn-primary" type="button">Search</button>
                    </div>
                    <div className="row">
                        {searchTerm === '' ? employers.map((employer) => (
                            <div key={employer.id} className="col-md-4 mb-4">
                                <div className="card">
                                    <img className="card-img-top logo-img" src={employer.logo} alt={`${employer.name} logo`} />
                                    <div className="card-body">
                                        <h2 className="card-title">{employer.name}</h2>
                                        <p className="card-text">Size: {employer.size}</p>
                                        <p className="card-text">Website: <a href={employer.website}>{employer.website}</a></p>
                                        <p className="card-text">Email: {employer.email}</p>
                                        <p className="card-text">Phone: {employer.phone}</p>

                                        <button className="button" onClick={() => navigate(`/employers/${employer.id}`)}>
                                            VIEW
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                            : searchResults.length === 0
                                ? <p>No employer found</p>
                                : searchResults.map((employer) => (
                                    <div key={employer.id} className="col-md-4 mb-4">
                                        <div className="card">
                                            <img className="card-img-top logo-img" src={employer.logo} alt={`${employer.name} logo`} />
                                            <div className="card-body">
                                                <h2 className="card-title">{employer.name}</h2>
                                                <p className="card-text">Size: {employer.size}</p>
                                                <p className="card-text">Website: <a href={employer.website}>{employer.website}</a></p>
                                                <p className="card-text">Email: {employer.email}</p>
                                                <p className="card-text">Phone: {employer.phone}</p>

                                                <button className="button" onClick={() => navigate(`/employers/${employer.id}`)}>
                                                VIEW
                                        </button>

                                            </div>
                                        </div>
                                    </div>
                                ))}
                    </div>
                </main>
            </div>
        </div>
    );
}

export default EmployerList;
