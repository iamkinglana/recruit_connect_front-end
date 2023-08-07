import React from 'react'
import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import Logo from '../../homepage-icons/recruit-connect-logo.png';
import './EmployerDetails.css'
import Size from '../../homepage-icons/group_554724.png'
import Email from '../../homepage-icons/email_542638.png'
import Phone from '../../homepage-icons/phone-call_126509.png'
import Internet from '../../homepage-icons/internet_2721688.png'

export default function EmployerDetails() {
  const [employer, setEmployers] = useState({})
  const params = useParams()

  useEffect(() => {
    fetch(`http://localhost:3000/employers/${params.id}}`)
      .then(res => res.json())
      .then(data => setEmployers(data))

  }
    , [])
  return (
    <>
      <div className="employer-header ">
        <div className='dot'>.</div>
        <div className="employer-logo">
          <img className=" logo-img" src={employer.logo} alt={`${employer.name} logo`} />
        </div>
      </div>
      <div className='employer-name'>
        <h2 className="card-title">{employer.name}</h2>
      </div>

      <div className="employer-details ">
        <div className="container ">
          <div className="row justify-content-center">
            <div className="col-xxl-3 mt-3 ">
              <p className="card-text size-animation"><img src={Size} alt="" />{employer.size} + Employees</p>
            </div>
            <div className="col-xxl-3 mt-3">
              <p className="card-text"><img src={Internet} alt="" /><a href={employer.website}>{employer.website}</a></p>
            </div>
            <div className="col-xxl-3 mt-3">
              <p className="card-text"><img src={Email} alt="" />{employer.email}</p>
            </div>
            <div className="col-xxl-3 mt-3">
              <p className="card-text"><img src={Phone} alt="" />{employer.phone}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="open-jobs ">
        <div className="container m-auto ">
          <h3 className='open-jobs-header'>Open Jobs</h3>
          <div className="row">
            {employer.jobs &&
              employer.jobs.map((job) => (
                <div key={job.id} className=" job">
                  <div className="row align-items-center justify-content-center employers-job-details">
                    <div className="col-lg-2 d-flex align-items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-briefcase" viewBox="0 0 16 16">
                        <path d="M6.5 1A1.5 1.5 0 0 0 5 2.5V3H1.5A1.5 1.5 0 0 0 0 4.5v8A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-8A1.5 1.5 0 0 0 14.5 3H11v-.5A1.5 1.5 0 0 0 9.5 1h-3zm0 1h3a.5.5 0 0 1 .5.5V3H6v-.5a.5.5 0 0 1 .5-.5zm1.886 6.914L15 7.151V12.5a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5V7.15l6.614 1.764a1.5 1.5 0 0 0 .772 0zM1.5 4h13a.5.5 0 0 1 .5.5v1.616L8.129 7.948a.5.5 0 0 1-.258 0L1 6.116V4.5a.5.5 0 0 1 .5-.5z" />
                      </svg>
                      <p>{job.job_title}</p>
                    </div>
                    <div className="col-lg-2 d-flex align-items-center">
                      <p><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-geo-alt" viewBox="0 0 16 16">
                        <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A31.493 31.493 0 0 1 8 14.58a31.481 31.481 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94zM8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10z" />
                        <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                      </svg>{job.job_location}</p>
                    </div>
                    <div className="col-lg-2 d-flex align-items-center">
                      <p><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-bar-chart-fill" viewBox="0 0 16 16">
                        <path d="M1 11a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1v-3zm5-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7zm5-5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1V2z" />
                      </svg>{job.job_level}</p>
                    </div>
                    <div className="col-lg-3 d-flex align-items-center">
                      <p><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-cash-coin" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M11 15a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm5-4a5 5 0 1 1-10 0 5 5 0 0 1 10 0z" />
                        <path d="M9.438 11.944c.047.596.518 1.06 1.363 1.116v.44h.375v-.443c.875-.061 1.386-.529 1.386-1.207 0-.618-.39-.936-1.09-1.1l-.296-.07v-1.2c.376.043.614.248.671.532h.658c-.047-.575-.54-1.024-1.329-1.073V8.5h-.375v.45c-.747.073-1.255.522-1.255 1.158 0 .562.378.92 1.007 1.066l.248.061v1.272c-.384-.058-.639-.27-.696-.563h-.668zm1.36-1.354c-.369-.085-.569-.26-.569-.522 0-.294.216-.514.572-.578v1.1h-.003zm.432.746c.449.104.655.272.655.569 0 .339-.257.571-.709.614v-1.195l.054.012z" />
                        <path d="M1 0a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h4.083c.058-.344.145-.678.258-1H3a2 2 0 0 0-2-2V3a2 2 0 0 0 2-2h10a2 2 0 0 0 2 2v3.528c.38.34.717.728 1 1.154V1a1 1 0 0 0-1-1H1z" />
                        <path d="M9.998 5.083 10 5a2 2 0 1 0-3.132 1.65 5.982 5.982 0 0 1 3.13-1.567z" />
                      </svg> ${job.salary_lowest} - ${job.salary_highest}</p>
                    </div>
                    <div className="col-lg-3 d-flex align-items-center">
                      <p><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-calendar-event" viewBox="0 0 16 16">
                        <path d="M11 6.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1z" />
                        <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z" />
                      </svg> {new Date(job.application_deadline).toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
}





