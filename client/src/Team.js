// src/Team.js
import React from 'react';

const Team = () => (
  <div className="team">
    <div className="team-member">
      <img src="/images/person1.jpg" alt="Person 1" />
      <h3>John Doe</h3>
      <p>
        John is a passionate developer with expertise in frontend technologies. He loves building
        user-friendly and visually appealing applications.
      </p>
    </div>

    <div className="team-member">
      <img src="/images/person2.jpg" alt="Person 2" />
      <h3>Jane Smith</h3>
      <p>
        Jane is a skilled designer who brings creativity to our team. Her eye for design and attention
        to detail enhance the overall look and feel of our applications.
      </p>
    </div>

    <div className="team-member">
      <img src="/images/person3.jpg" alt="Person 3" />
      <h3>Bob Johnson</h3>
      <p>
        Bob is a backend developer who ensures the functionality and performance of our applications.
        His problem-solving skills contribute to the robustness of our projects.
      </p>
    </div>
  </div>
);

export default Team;
