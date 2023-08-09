import React from 'react'
import { useEffect, useContext, useState } from 'react';
import Logo from '../../homepage-icons/recruit-connect-logo.png'
import './Profile.css'
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../../App';

export default function Profile() {
  const userContext = useContext(UserContext)
  const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();

  const [activeSection, setActiveSection] = useState('dashboard');
  const [asideOpen, setAsideOpen] = useState(true);
  const [profileImage, setProfileImage] = useState(null);
  const [name, setName] = useState(null);
  const [contact, setContact] = useState(null);
  const [resumeAttachment, setResumeAttachment] = useState(null);


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

  const handleLogout = () => {
    localStorage.removeItem('authToken'); 
    setUser(null); 
    navigate('/login')
};

  const handleSubmit = (event) => {
    event.preventDefault();
    // Perform actions to save profile details
  };

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
            <h1>Dashboard</h1>
            <div className="date d-flex ">
              <span class="material-symbols-outlined ">
                calendar_month
              </span>
              <p>{new Date().toLocaleDateString()}</p>
            </div>
            <div className="insights">
              <div className="total-applications ">
                <span class="material-symbols-outlined">
                  monitoring
                </span>
                <div className="middle">
                  <div className="left">
                    <h3>Total Applications</h3>
                    <h1 className='total-applications-count'>30</h1>
                  </div>
                  <div className="progress-container">
                    <svg>
                      <circle cx='38' cy='38' r='36'></circle>
                    </svg>
                  </div>
                </div>
              </div>

              <div className="total-applications ">
                <span class="material-symbols-outlined">
                  monitoring
                </span>
                <div className="middle">
                  <div className="left">
                    <h3>Total Applications</h3>
                    <h1 className='total-applications-count'>30</h1>
                  </div>
                  <div className="progress-container">
                    <svg>
                      <circle cx='38' cy='38' r='36'></circle>
                    </svg>
                  </div>
                </div>
              </div>

              <div className="total-applications ">
                <span class="material-symbols-outlined">
                  monitoring
                </span>
                <div className="middle">
                  <div className="left">
                    <h3>Total Applications</h3>
                    <h1 className='total-applications-count'>30</h1>
                  </div>
                  <div className="progress-container">
                    <svg>
                      <circle cx='38' cy='38' r='36'></circle>
                    </svg>
                  </div>
                </div>
              </div>

            </div>
            {/* END OF INSIGHTS SECTION */}
            <div className="recent-applications">
              <h2>Recent Applications</h2>
              <table>
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
    <h2>User Profile</h2>
    <div className="profile-top row">
      <div className="col-lg-6">
        <div className="profile-image">
          <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D&w=1000&q=80" alt="" />
        </div>
      </div>
      <div className="col-lg-6">
        <div className="profile-username justify-content-center align-items-center">
          <h3 className="profile-name"> {user.name}</h3>
          <p className="profile-email">{user.email}</p>
        </div>
      </div>
    </div>
    <div className="profile-bottom">
      <div className="row">
        <div className="col-md-6 user-contact">
          <span class="material-symbols-outlined">phone_iphone</span>
          <strong>Contact:</strong> 0722849868
        </div>
        <div className="col-md-6 user-resume">
          <span class="material-symbols-outlined">folder_open</span>
          <strong>Resume Attachement:</strong> file.com
        </div>
      </div>
    </div>
  </div>
)}
        {activeSection === 'saved-jobs' && (
          <div className="saved-jobs-content">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae, quo eius laudantium asperiores praesentium quam maxime blanditiis enim sapiente id illum dolorem, omnis, officia quos neque vitae nulla impedit. Expedita temporibus ea ratione voluptate laboriosam! Doloribus saepe, perferendis ducimus eligendi dignissimos et veniam odit id nisi placeat iste quo vitae aspernatur eius inventore libero rem? Ducimus aut enim sapiente consectetur esse tempora unde vero nihil repellendus sequi eius sint sed atque voluptatem nam nisi doloremque nobis nesciunt iste, porro rem, facilis quod eum quidem! Unde aliquam vero perspiciatis incidunt nam? Accusamus laudantium officia eaque in quos quis possimus, maiores impedit, excepturi cupiditate voluptatem natus, magni harum consequatur? Voluptatibus enim totam assumenda saepe ipsam? Quisquam, maxime rerum id tempore consequuntur rem voluptas magnam alias quo vero perspiciatis repudiandae deserunt dolorem omnis facilis sed ea ipsum necessitatibus praesentium ducimus? Fugiat odio facere, ratione, dignissimos dolor distinctio soluta dolorum saepe in sit dolores laborum harum odit velit quidem! Velit nisi praesentium dolore quae neque quia mollitia nesciunt inventore beatae repellendus. Aspernatur placeat veniam sint debitis dignissimos nisi fugiat animi doloribus, accusamus dolor commodi, aliquam esse aperiam quibusdam quidem provident? Tempora id ad non aspernatur, unde repellat asperiores atque, repellendus reiciendis exercitationem reprehenderit tempore!</p>
          </div>
        )}
        {activeSection === 'applications' && (
          <div className="applications-content">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel cum, similique exercitationem mollitia quidem beatae doloribus, magni dolorum voluptates, porro numquam laboriosam veniam perferendis tempore dolor aut corrupti blanditiis provident! Fuga neque hic eaque voluptatibus amet aperiam quos, accusamus facilis fugiat libero sit, commodi illo, doloremque consequuntur vitae similique ab. Nisi sapiente quidem sint dolorem hic. Reprehenderit ea quam vitae.</p>
          </div>
        )}
        {activeSection === 'logout' && (
          <div className="logout-content">
            {/* Content for Dashboard section */}
          </div>
        )}

      </main>
    </div>
  )
}
