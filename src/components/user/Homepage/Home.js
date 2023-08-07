import React, { useState } from 'react';
import './Home.css';
import { useEffect } from 'react';
import asusLogo from '../../homepage-icons/asus.png';
import googleLogo from '../../homepage-icons/google.png';
import huaweiLogo from '../../homepage-icons/huawei.png';
import microsoftLogo from '../../homepage-icons/microsoft.png';
import oracleLogo from '../../homepage-icons/oracle.png';
import ubuntuLogo from '../../homepage-icons/ubuntu.png';
import unityLogo from '../../homepage-icons/unity.png';
import tapImage from '../../homepage-icons/tap.png';
import docImage from '../../homepage-icons/document.png';
import moneyBag from '../../homepage-icons/money-bag.png';
import headerImage from '../../homepage-icons/header-image.jpg';
import { AiOutlineCloseCircle, AiOutlineSearch } from 'react-icons/ai';

const Home = () => {
    const trustedLogos = [asusLogo, googleLogo, huaweiLogo, microsoftLogo, oracleLogo, ubuntuLogo, unityLogo];
    const whyUsImages = [tapImage, docImage, moneyBag];
    const [searchQuery, setSearchQuery] = useState('');
    const [featuredJobs, setFeaturedJobs] = useState([]);

    useEffect(() => {

        fetch('http://localhost:3000/jobs')
            .then(response => response.json())
            .then(data => setFeaturedJobs(data))
            .catch(error => console.error('Error fetching featured jobs:', error));
    }, []);


    const handleSearchInputChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleClearSearch = () => {
        setSearchQuery('');
    };

    return (
        <>
            <div className="homepage-header container">
                <div className="row">
                    <div className="homepage-header-text col-md-6">
                        <p className="animated-text">Get the right job that you deserve</p>
                        <p className="animated-text">
                            with <span> Recruit Connect</span>
                        </p>
                        <div className="searchDiv ">
                            <form action="" className="homepage-header-searchbar ">
                                <div className="">
                                    <div className="searchbar-container d-flex align-items-center rounded-3 shadow-lg shadow-grey-400">
                                        <AiOutlineSearch />
                                        <input
                                            type="text"
                                            className="border-0"
                                            placeholder="Search Jobs Here ...."
                                            value={searchQuery}
                                            onChange={handleSearchInputChange}
                                        />
                                        {searchQuery && <AiOutlineCloseCircle onClick={handleClearSearch} />}
                                        <button >
                                            <a class="fancy" href="#">
                                                <span class="top-key"></span>
                                                <span class="text">Search</span>
                                                <span class="bottom-key-1"></span>
                                                <span class="bottom-key-2"></span>
                                            </a>
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <img className="header-image" src={headerImage} alt="" />
                    </div>
                </div>
            </div>
            <div className=" homepage-body bg-light pt-3 pb-5" >
                <div className="container trusted-by-section justify-content-center">
                    <p>
                        <strong>Trusted by</strong>
                    </p>
                    <div className="trusted-logos">
                        {trustedLogos.map((logo, index) => (
                            <img key={index} src={logo} alt={`Logo ${index + 1}`} className="trusted-logo" />
                        ))}
                    </div>
                </div>
                </div>
                <div className="container why-us-section">
                    <p>
                        <strong>
                            Why Choose  <span>Recruit Connect</span>
                        </strong>
                    </p>
                    <div className="row">
                        <div className="col-md-4 why-us-item">
                            <img src={tapImage} alt="" />
                            <h3>Easy To Use</h3>
                            <p>We have created a streamlined user-interface so you can easily manage your jobs and candidates.</p>
                        </div>

                        <div className="col-md-4 why-us-item">
                            <img src={docImage} alt="" />
                            <h3>Qualified Candidates</h3>
                            <p>Irrespective of your organization’s size, we have a large pool of candidates with diverse skill sets and experience levels.</p>
                        </div>

                        <div className="col-md-4 why-us-item">
                            <img src={moneyBag} alt="" />
                            <h3>Cost Effective</h3>
                            <p>Whether you choose to post your jobs directly or have them indexed automatically, our pricing model is highly competitive and cost-effective.</p>
                        </div>
                    </div>
                </div>
                <div className="bg-light featured-jobs-section">
                    <p>
                        <strong>Featured Jobs</strong>
                    </p>
                    <div className="container">
                        {featuredJobs.map((job, index) => (
                            <div key={index} className="featured-jobs-item row align-items-center animated-job">
                                <div className="col-md-2">
                                    <img className="featured-job-logo" src={job.employer.logo} alt="" />
                                </div>
                                <div className="col-md-2">
                                    <div className="job-details">
                                        <h3 className="featured-job-title">{job.job_title}</h3>
                                        <h4 className="featured-job-employer">{job.employer.name}</h4>
                                    </div>
                                </div>
                                <div className="col-md-2">
                                    <p className="featured-job-location">{job.job_location}</p>
                                </div>
                                <div className="col-md-2">
                                    <p className="featured-job-level">{job.job_level}</p>
                                </div>
                                <div className="col-md-2">
                                    <p className={`featured-job-application-deadline ${new Date(job.application_deadline) > new Date() ? 'text-green' : 'text-red'}`}>
                                        {job.application_deadline.slice(0, 10)}
                                    </p>
                                </div>
                                <div className="col-md-2">
                                    <button className="bookmark-button border-0">
                                        <span className="bookmark-icon">
                                            {job.isBookmarked ? <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512"><path d="M0 48C0 21.5 21.5 0 48 0l0 48V441.4l130.1-92.9c8.3-6 19.6-6 27.9 0L336 441.4V48H48V0H336c26.5 0 48 21.5 48 48V488c0 9-5 17.2-13 21.3s-17.6 3.4-24.9-1.8L192 397.5 37.9 507.5c-7.3 5.2-16.9 5.9-24.9 1.8S0 497 0 488V48z" /></svg> : <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512"><path d="M0 48V487.7C0 501.1 10.9 512 24.3 512c5 0 9.9-1.5 14-4.4L192 400 345.7 507.6c4.1 2.9 9 4.4 14 4.4c13.4 0 24.3-10.9 24.3-24.3V48c0-26.5-21.5-48-48-48H48C21.5 0 0 21.5 0 48z" /></svg>}
                                        </span>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            
        </>
    );
};

export default Home;
