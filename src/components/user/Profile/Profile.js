import React from 'react'
import { useEffect, useContext, useState } from 'react';
import Logo from '../../homepage-icons/recruit-connect-logo.png'
import './Profile.css'
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../../App';
import SavedJobs from '../SavedJobs';

export default function Profile() {
  const userContext = useContext(UserContext)
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [editMode, setEditMode] = useState(false);
  const [jobSeekerData, setJobSeekerData] = useState([])
  const [activeSection, setActiveSection] = useState('dashboard');
  const [asideOpen, setAsideOpen] = useState(true);
  const [profileImage, setProfileImage] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('')
  const [contact, setContact] = useState('');
  const [resumeAttachment, setResumeAttachment] = useState('');
  const [jobSeekerId, setJobSeekerId] = useState(null);


  console.log(user);
  const toggleAside = () => {
    setAsideOpen(!asideOpen);
  };
  const openAside = () => {
    setAsideOpen(true);
  };

  const handleSectionClick = (section, event) => {
    event.preventDefault();
    setActiveSection(section);
  };

  useEffect(() => {
    if (user && user.job_seeker) {
      setJobSeekerId(user.job_seeker.id);
    }
  }, [user]);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setUser(null);
    navigate('/login')
  };

  const handleEditProfile = () => {
    setName(user.name);
    setContact(user.job_seeker.contact);
    setResumeAttachment(user.job_seeker.resume_attachment);
    setEditMode(true);
  };



  const handleSaveProfile = async (event) => {
    event.preventDefault();

    try {
      const jobSeekerResponse = await fetch(`http://localhost:3000/job_seekers/${jobSeekerId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contact,
          resume_attachment: resumeAttachment,
        }),
      });

      if (!jobSeekerResponse.ok) {
        throw new Error('Failed to update job seeker details');
      }

      const userResponse = await fetch(`http://localhost:3000/users/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email: user.email,
        }),
      });

      if (!userResponse.ok) {
        throw new Error('Failed to update user details');
      }

      setUser({
        ...user,
        name,
        job_seeker: {
          ...user.job_seeker,
          contact,
          resume_attachment: resumeAttachment,
        },
      });

      setEditMode(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  useEffect(() => {
    if (user && user.job_seeker) {
      fetch(`http://localhost:3000/job_seekers/${user.job_seeker.id}`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to fetch data');
          }
          return response.json();
        })
        .then(data => {
          setJobSeekerData(data);
          console.log(data);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    }
  }, [user]);



  return (
    <div className={`container profile-container ${asideOpen ? 'aside-open' : 'aside-closed'}`}>
      <aside>
        <div className="top">
          <div className="logo">
            <img src={Logo} alt="" />
          </div>
          <div className="close" id="close" onClick={toggleAside}>
            <span className="material-symbols-outlined">
              close
            </span>
          </div>
        </div>
        <div className="sidebar">
          <a
            href=""
            className={activeSection === 'dashboard' ? 'active' : ''}
            onClick={(event) => handleSectionClick('dashboard', event)}
          >
            <span className="material-symbols-outlined">
              dashboard
            </span>
            <h3>Dashboard</h3>
          </a>
          <a href=""
            className={activeSection === 'profile' ? 'active' : ''}
            onClick={(event) => handleSectionClick('profile', event)}
          >
            <span className="material-symbols-outlined">
              account_circle
            </span>
            <h3>Profile</h3>
          </a>
          <a href=""
            className={activeSection === 'saved-jobs' ? 'active' : ''}
            onClick={(event) => handleSectionClick('saved-jobs', event)}
          >
            <span className="material-symbols-outlined">
              folder_special
            </span>
            <h3>Saved Jobs</h3>
          </a>
          <a href=""
            className={activeSection === 'applications' ? 'active' : ''}
            onClick={(event) => handleSectionClick('applications', event)}
          >
            <span className="material-symbols-outlined">
              pending_actions
            </span>
            <h3>Applications</h3>
          </a>
          <a href=""
            className={activeSection === 'logout' ? 'active' : ''}
            onClick={handleLogout}
          >
            <span className="material-symbols-outlined">
              logout
            </span>
            <h3>Logout</h3>
          </a>
        </div>
      </aside>
      <main>
        {!asideOpen && (
          <div className="reopen-aside">
            <button onClick={openAside}><span class="material-symbols-outlined">
              open_in_full
            </span></button>
          </div>
        )}
        {activeSection === 'dashboard' && (
          <div className="dashboard-content">
            <h1 className="dashboard-title">Dashboard</h1>
            <div className="date d-flex align-items-center">
              <span class="material-symbols-outlined">
                calendar_month
              </span>      <p>{new Date().toLocaleDateString()}</p>
            </div>
            <div className="insights">
              <div className="total-applications insight-card">
                <span class="material-symbols-outlined">
                  content_paste
                </span>        <div className="middle">
                  <div className="left">
                    <h3>Total Applications</h3>
                    <h1 className="total-applications-count">
                      {jobSeekerData.applications ? (
                        <h1 className="total-applications-count">{jobSeekerData.applications.length}</h1>
                      ) : (
                        <h1 className="total-applications-count">0</h1>
                      )}

                    </h1>
                  </div>

                </div>
              </div>

              <div className="total-interviews insight-card">
                <span class="material-symbols-outlined">
                  event_available
                </span>        <div className="middle">
                  <div className="left">
                    <h3>Total Interviews</h3>
                    <h1 className="total-interviews-count">0</h1>
                  </div>

                </div>
              </div>

              <div className="total-offers insight-card">
                <span class="material-symbols-outlined">
                  check_circle
                </span>        <div className="middle">
                  <div className="left">
                    <h3>Total Offers</h3>
                    <h1 className="total-offers-count">0</h1>
                  </div>

                </div>
              </div>
            </div>
            {/* END OF INSIGHTS SECTION */}
            <div className="recent-applications">
              <h2 className="recent-applications-title">Recent Applications</h2>
              <table className="table">
                <thead>
                  <tr>
                    <th>Employer</th>
                    <th>Job Title</th>
                    <th>Application Date</th>
                    <th>Application Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Microsoft</td>
                    <td>Software Engineer</td>
                    <td>2023-07-31</td>
                    <td>Pending</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
        {activeSection === 'profile' && (
          <div className="profile-content">
            <div className="container d-flex justify-content-between top-row">
              <h2>User Profile</h2>
              {!editMode ? (
                <button className='edit-profile-button' onClick={handleEditProfile}>
                  Edit Profile
                </button>
              ) : (
                <button className='save-profile-button' onClick={handleSaveProfile}>
                  Save Profile
                </button>
              )}
            </div>
            {editMode ? (
              <div className="profile-edit-form">
                <form>
                  <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={user.email}
                      disabled
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="contact">Contact:</label>
                    <input
                      type="text"
                      id="contact"
                      name="contact"
                      value={contact}
                      onChange={(e) => setContact(e.target.value)}
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="resumeAttachment">Resume Attachment:</label>
                    <input
                      type="text"
                      id="resumeAttachment"
                      name="resumeAttachment"
                      value={resumeAttachment}
                      onChange={(e) => setResumeAttachment(e.target.value)}
                      className="form-control"
                    />
                  </div>
                  <div className="form-buttons d-flex ">
                    <button className="btn btn-primary save-profile-button " onClick={handleSaveProfile}>
                      Save Profile
                    </button>
                    <button className="btn btn-secondary cancel-profile-button" onClick={() => setEditMode(false)}>
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              <>
                <div className="profile-top row">
                  <div className="col-lg-6">
                    <div className="profile-image">
                      <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D&w=1000&q=80" alt="" className="img-fluid rounded-circle profile-image" />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="profile-username text-center">
                      <h3 className="profile-name">{user.name}</h3>
                      <p className="profile-email">{user.email}</p>
                    </div>
                  </div>
                </div>
                <div className="profile-bottom container">
                  <div className="row">
                    <div className="col-md-6 d-flex mb-3 align-items-center user-contact">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#2B85FF" className="bi bi-phone me-2" viewBox="0 0 16 16">
                        <path d="M11 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h6zM5 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H5z" />
                        <path d="M8 14a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
                      </svg>
                      <span><strong>Contact:</strong> {user.job_seeker.contact}</span>
                    </div>
                    <div className="col-md-6 d-flex align-items-center user-resume">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#2B85FF" className="bi bi-file-earmark-arrow-down me-2" viewBox="0 0 16 16">
                        <path d="M8.5 6.5a.5.5 0 0 0-1 0v3.793L6.354 9.146a.5.5 0 1 0-.708.708l2 2a.5.5 0 0 0 .708 0l2-2a.5.5 0 0 0-.708-.708L8.5 10.293V6.5z" />
                        <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zM9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5v2z" />
                      </svg>
                      <span><strong>Resume Attachment:</strong> {user.job_seeker.resume_attachment}</span>
                    </div>
                  </div>
                </div>
              </>
            )}

          </div>
        )}

        {activeSection === 'saved-jobs' && (
          <div className="saved-jobs-content">
            <SavedJobs/>
            {/* <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae, quo eius laudantium asperiores praesentium quam maxime blanditiis enim sapiente id illum dolorem, omnis, officia quos neque vitae nulla impedit. Expedita temporibus ea ratione voluptate laboriosam! Doloribus saepe, perferendis ducimus eligendi dignissimos et veniam odit id nisi placeat iste quo vitae aspernatur eius inventore libero rem? Ducimus aut enim sapiente consectetur esse tempora unde vero nihil repellendus sequi eius sint sed atque voluptatem nam nisi doloremque nobis nesciunt iste, porro rem, facilis quod eum quidem! Unde aliquam vero perspiciatis incidunt nam? Accusamus laudantium officia eaque in quos quis possimus, maiores impedit, excepturi cupiditate voluptatem natus, magni harum consequatur? Voluptatibus enim totam assumenda saepe ipsam? Quisquam, maxime rerum id tempore consequuntur rem voluptas magnam alias quo vero perspiciatis repudiandae deserunt dolorem omnis facilis sed ea ipsum necessitatibus praesentium ducimus? Fugiat odio facere, ratione, dignissimos dolor distinctio soluta dolorum saepe in sit dolores laborum harum odit velit quidem! Velit nisi praesentium dolore quae neque quia mollitia nesciunt inventore beatae repellendus. Aspernatur placeat veniam sint debitis dignissimos nisi fugiat animi doloribus, accusamus dolor commodi, aliquam esse aperiam quibusdam quidem provident? Tempora id ad non aspernatur, unde repellat asperiores atque, repellendus reiciendis exercitationem reprehenderit tempore!</p> */}
          </div>
        )}
     {activeSection === 'applications' && (
  <div className="applications-content">
    <h2>Applications</h2>
     <table className="table">
      <thead>
        <tr>
          <th>Job Title</th>
          <th>Application Date</th>
          <th>Application Status</th>
        </tr>
      </thead>
      <tbody>
        {jobSeekerData.applications.map((application) => (
          <tr key={application.id}>
            <td>Software Engineer</td>
            <td>{new Date(application.application_date).toLocaleDateString()}</td>
            <td>{application.application_status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)}
        {activeSection === 'applications' && (
          <div className="applications-content">
            <h2>Applications</h2>
            <table className="table">
              <thead>
                <tr>
                  <th>Job Title</th>
                  <th>Application Date</th>
                  <th>Application Status</th>
                </tr>
              </thead>
              <tbody>
                {jobSeekerData.applications.map((application) => (
                  <tr key={application.id}>
                    <td>Software Engineer</td>
                    <td>{new Date(application.application_date).toLocaleDateString()}</td>
                    <td>{application.application_status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}


      </main>
    </div>
  )
}




