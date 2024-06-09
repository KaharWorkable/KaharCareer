// src/components/Skills.js
import React, { useEffect, useState } from 'react';
import Slider from "react-slick";
import { fetchDocuments } from '../utils/firestoreUtils';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const Skills = () => {
  const [skills, setSkills] = useState({
    programming: [],
    software: [],
    language: [],
    others: [],
  });

  useEffect(() => {
    const getData = async () => {
      try {
        console.log('Fetching skills data...');
        const data = await fetchDocuments('programming');
        console.log('Data fetched:', data);

        const programming = [];
        const software = [];
        const language = [];
        const others = [];

        data.forEach((item) => {
          if (item.category === 'programming') {
            programming.push(item.skill);
          } else if (item.category === 'software') {
            software.push(item.skill);
          } else if (item.category === 'language') {
            language.push(item.skill);
          } else if (item.category === 'others') {
            others.push(item.skill);
          }
        });

        setSkills({ programming, software, language, others });
      } catch (error) {
        console.error('Error fetching skills data:', error);
      }
    };

    getData();
  }, []);

  const settings = (itemsCount) => ({
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: itemsCount >= 5 ? 5 : itemsCount,
    slidesToScroll: 1,
    centerMode: itemsCount < 5,
    centerPadding: itemsCount < 5 ? "20px" : "0",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: itemsCount >= 3 ? 3 : itemsCount,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
          centerMode: itemsCount < 3,
          centerPadding: itemsCount < 3 ? "20px" : "0",
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: true,
          centerPadding: "0",
        }
      }
    ]
  });

  const renderSkills = (skillsArray) => (
    skillsArray.map((skill, index) => (
      <div key={index} className="p-4">
        <div className="bg-white rounded-lg shadow-md p-6 text-center mx-auto" style={{ maxWidth: '200px', height: '150px' }}>
          <p className="text-lg font-semibold">{skill.split(' ')[0]}</p>
          <p className="text-sm text-gray-600">{skill.split(' ').slice(1).join(' ')}</p>
        </div>
      </div>
    ))
  );

  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-3xl font-bold mb-6 text-center">Skills</h2>

      <div className="mb-8">
        <h3 className="text-2xl font-semibold mb-4 text-center">Programming</h3>
        {skills.programming.length > 0 ? (
          <Slider {...settings(skills.programming.length)}>
            {renderSkills(skills.programming)}
          </Slider>
        ) : (
          <p className="text-lg text-center">Loading...</p>
        )}
      </div>

      <div className="mb-8">
        <h3 className="text-2xl font-semibold mb-4 text-center">Software and Tools Mastery</h3>
        {skills.software.length > 0 ? (
          <Slider {...settings(skills.software.length)}>
            {renderSkills(skills.software)}
          </Slider>
        ) : (
          <p className="text-lg text-center">Loading...</p>
        )}
      </div>

      <div className="mb-8">
        <h3 className="text-2xl font-semibold mb-4 text-center">Spoken Language</h3>
        {skills.language.length > 0 ? (
          <Slider {...settings(skills.language.length)}>
            {renderSkills(skills.language)}
          </Slider>
        ) : (
          <p className="text-lg text-center">Loading...</p>
        )}
      </div>

      <div>
        <h3 className="text-2xl font-semibold mb-4 text-center">Others</h3>
        {skills.others.length > 0 ? (
          <Slider {...settings(skills.others.length)}>
            {renderSkills(skills.others)}
          </Slider>
        ) : (
          <p className="text-lg text-center">Loading...</p>
        )}
      </div>
    </div>
  );
};

export default Skills;
