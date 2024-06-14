import React, { useEffect } from 'react';
import { db } from '../firebaseConfig';
import { collection, writeBatch, doc } from 'firebase/firestore';

const BatchWriteComponent = () => {
  useEffect(() => {
    const batchWrite = async () => {
      const batch = writeBatch(db);
      const experienceCollection = collection(db, 'experience');

      const experiences = [
        {
          id: '1',
          company: 'Juris Technologies Sdn. Bhd.',
          role: 'Software Engineer (Full Time)',
          duration: 'May 2023 – Present',
          details: [
            'Application Development & Enhancement: Spearhead the development and enhancement of software projects, managing change requests and ensuring high-quality code delivery.',
            'Technical Expertise: Utilize advanced knowledge of PHP, SQL, PL/SQL, and JavaScript to drive project development and resolve complex technical issues.',
            'Server Configuration & Management: Configure and maintain server environments, including setup and management of batch jobs.',
            'Production Issue Analysis: Conduct thorough analysis and troubleshooting of production issues to ensure minimal downtime and optimal system performance.',
            'Deployment & Installation: Oversee the deployment of new features and updates to server environments, ensuring seamless integration and functionality.',
            'Application Migration: Lead server setup and configuration for application migration projects, ensuring smooth transitions with minimal disruption.',
            'Disaster Recovery: Act as the main person in charge of Disaster Recovery drills from the application server side, ensuring preparedness and effective response strategies.',
            'Cross-Functional Collaboration: Collaborate with QA, operations, and project management teams to deliver projects on time and within scope.',
            'Documentation & Support: Maintain comprehensive documentation and provide technical support to internal teams and clients.',
            'Continuous Improvement: Proactively identify opportunities for system improvements, optimizing performance and reliability.'
          ]
        },
        {
          id: '2',
          company: 'Petrolian Nasional Berhad (PETRONAS), PD&T',
          role: 'Web Developer (Industrial Intern)',
          duration: 'Aug 2022 - Feb 2023',
          details: [
            'Focused on developing report feature for FAST website, using JavaScript, PHP, and SQL to create both Excel and PDF report format.',
            'Effectively consult and assist Team Lead with client data migration to a new database using MySQL which involved implementing multi-level queries.',
            'Responsible to perform software testing on the FAST Website from sprint 1 to 20, using Microsoft Azure DevOps test plan to ensure high quality output.',
            'Synchronize and maintenance from live database migration and Azure Repository using MySQL and Visual Studio Code from different BU/OPU (MLNG, PCOGD, PCEPE).',
            'Completed all task and responsibilities within the set timeframe, demonstrating ability to meet deadlines and work efficiently.',
            'Created Videos for RNET product launching, Project Logo Montage, department Montage, Neurodiverse teaser video, President Speech in RNET for President Townhall using Adobe Premier Pro and Microsoft PowerPoint.',
            'Pitched Neurodiversity Strategies to Group and Department-Level using researched material from online sources, comparison strategies between companies and neurodiversity pack from Neurodiversity Hub.'
          ]
        }
      ];

      experiences.forEach((exp) => {
        const docRef = doc(experienceCollection, exp.id);
        batch.set(docRef, exp);
      });

      await batch.commit();
      console.log('Batch write completed successfully');
    };

    batchWrite().catch((error) => {
      console.error('Error in batch write:', error);
    });
  }, []);

  return <div>Batch Write Data</div>;
};

export default BatchWriteComponent;
