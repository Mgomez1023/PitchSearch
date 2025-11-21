import "./AboutPage.css";
import { FaGithub, FaLinkedin, FaDownload } from 'react-icons/fa';
import { MdOutlineFileDownload } from "react-icons/md";


function AboutPage() {
  return (
    <div className="about-wrapper">
      <div className="about-card">
        <h1 className="about-title">About PitchSearch</h1>

        <p className="about-text">
          {/* Replace this with your own content */}
          PitchSearch is a custom-built pitching analysis tool designed to help 
          visualize pitch tendencies, usage patterns, and performance insights 
          for MLB players. This project was created with the goal of blending 
          clean data visualization with a baseball-inspired UI.
        </p>

      </div>

      <div className="about-card">
        <h1 className="about-title">About Me</h1>

        <p className="about-text">
          {/* Replace this with your own content */}
          Hi, my name is Martin Gomez. I am a 23 year-old developer currently 
          studying at UIC to obtain my bachelors in Computer Science expected 
          to graduate in May 2027.
          I have hands-on experience with WordPress, React, JavaScript, HTML/CSS, C++, and SQL and I've enjoyed building apps that are both functional and user-centerd.
          Outside of programming, baseball has always been a major part of my life. 
            I've personally played the sport since I was three and come from a 
            heavy baseball background with my dad and sisters playing as well. 
            Baseball will always be special to me. 
        </p>


        <p className="about-text">
          {/* Replace this with your own content */}
          That's is why I am excited about an internship with the Nationals. Im excited to share my skills, work ethic, and perspective so I can make an impact 
          in a field im very passionate about.
        </p>

        <p className="about-text">

        </p>

        <div className="top-right-icons" aria-hidden={false}>
        <a href="https://github.com/Mgomez1023" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
          <FaGithub />
        </a>
        <a href="https://www.linkedin.com/in/martin-gomez-" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
          <FaLinkedin />
        </a>
        {/* Resume download button — place a file named `resume.pdf` in the public/ folder */}
        <a href="/MartinGomez_Resume.pdf" download className="resume-btn" aria-label="Download Resume">
          <span>Resume</span>
          <MdOutlineFileDownload style={{ marginLeft: 8, }} />
        </a>
      </div>


      </div>


    </div>
  );
}

export default AboutPage;
