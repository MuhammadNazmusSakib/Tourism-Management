import React from "react";

const AboutUs = () => {
    const developerData = {
        name: "Muhammad Nazmus Sakib",
        role: "Full Stack Developer",
        bio: "I'm a passionate MERN Stack Developer with expertise in building dynamic, scalable, and efficient web applications. I specialize in creating seamless user experiences using MongoDB, Express.js, React.js, and Node.js.While I'm proficient in front-end development, I’m currently expanding my knowledge of back-end technologies to create even more robust and secure applications. My focus is on crafting intuitive and responsive interfaces while building strong server-side functionality to support modern web applications.",

        projects: [
            { name: "Vocabulary Learning", link: "https://lingo-bingo-27ebf.web.app/" },
            { name: "Library Management System", link: "https://library-management-syste-133af.web.app/" },
            { name: "Visa Navigation", link: "https://visa-navigator-10ba9.web.app/" },
           
        ],
        socialLinks: {
            github: "https://github.com/MuhammadNazmusSakib",
            linkedin: "https://www.linkedin.com/in/muhammad-nazmus-sakib/",

        },
    };

    return (
        <div className="bg-gray-50">
        <div className="max-w-4xl mx-auto p-6 space-y-6">
            {/* Developer Introduction */}
            <div className="text-center">
                <h1 className="text-3xl font-bold">{developerData.name}</h1>
                <p className="text-xl text-gray-600">{developerData.role}</p>
                <p className="mt-4 text-gray-800">{developerData.bio}</p>
            </div>
            <div className="flex justify-center items-center">
                <a href="https://muhammad-nazmus-sakib.web.app/" target="_blank" className="px-2 py-2 rounded-lg text-white font-semibold bg-blue-400 hover:bg-blue-500">PORTFOLIO</a>
            </div>

            {/* Projects Info */}
            <div>
                <h2 className="text-2xl font-semibold mb-4">Projects</h2>
                <p className="mb-4">
                    These are some projects that {developerData.name} has created:
                </p>
                <ul className="space-y-3">
                    {developerData.projects.map((project, index) => (
                        <li
                            key={index}
                            className="p-4 border rounded-lg shadow hover:shadow-md transition-shadow"
                        >
                            <a
                                href={project.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-500 hover:underline"
                            >
                                {project.name}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Social Links */}
            <div className="text-center space-y-4">
                <h2 className="text-2xl font-semibold">Connect with {developerData.name}</h2>
                <div className="flex justify-center space-x-6">
                    <a
                        href={developerData.socialLinks.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-800 hover:text-blue-500"
                    >
                        GitHub
                    </a>
                    <a
                        href={developerData.socialLinks.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-800 hover:text-blue-500"
                    >
                        LinkedIn
                    </a>
                    
                </div>
            </div>
        </div>
        </div>
    );
};

export default AboutUs;
