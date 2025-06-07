import React from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import NoteIcon from "@mui/icons-material/Note";

const features = [
  {
    title: "User Authentication",
    desc: "Secure signup and login functionality using JWT tokens. Your notes are private and accessible only to you.",
  },
  {
    title: "Create Notes",
    desc: "Add new notes with a title, description, and optional tags to categorize your content.",
  },
  {
    title: "Edit Notes",
    desc: "Update your existing notes anytime to keep your information up-to-date.",
  },
  {
    title: "Delete Notes",
    desc: "Remove notes you no longer need with a simple click.",
  },
  {
    title: "View Notes",
    desc: "Instantly view all your notes in a clean and organized layout.",
  },
  {
    title: "Search Notes",
    desc: "Quickly find notes by searching for keywords in titles or descriptions.",
  },
  {
    title: "Responsive Design",
    desc: "Enjoy a seamless experience on both desktop and mobile devices, with a functional hamburger menu for easy navigation.",
  },
  {
    title: "Profile Dropdown",
    desc: "Access your profile information and logout easily from the avatar dropdown menu.",
  },
  {
    title: "Notifications",
    desc: "Get instant feedback for actions like login, logout, note creation, and deletion via toast notifications.",
  },
  {
    title: "Dark Mode Support",
    desc: "Experience a visually comfortable interface with dark mode compatibility.",
  },
  {
    title: "Secure Backend",
    desc: "All data is securely stored and managed through a robust backend API.",
  },
];

const About = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-white to-purple-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-10">
      <div className="w-full max-w-2xl bg-white dark:bg-gray-900 rounded-3xl shadow-2xl p-8">
        <div className="flex flex-col items-center mb-6">
          <div className="bg-blue-600 text-white rounded-full w-20 h-20 flex items-center justify-center mb-3 shadow-lg">
            <NoteIcon style={{ fontSize: 40 }} />
          </div>
          <h1 className="text-4xl font-extrabold text-blue-700 dark:text-white mb-2 font-sans tracking-tight">
            About NotesWala
          </h1>
          <p className="text-center text-gray-700 dark:text-gray-300 mb-4 text-lg">
            <strong>NotesWala</strong> is a modern, secure, and user-friendly web application designed to help you manage your notes efficiently. Whether you are a student, professional, or anyone who needs to organize information, NotesWala provides all the essential tools you need.
          </p>
        </div>
        <div className="border-b border-gray-200 dark:border-gray-700 mb-4"></div>
        <h2 className="text-2xl font-semibold text-blue-600 dark:text-blue-400 mb-3 text-center">
          Key Features & Functionalities
        </h2>
        <ul className="space-y-3 mb-6">
          {features.map((feature, idx) => (
            <li key={idx} className="flex items-start gap-3">
              <CheckCircleIcon className="text-green-500 mt-1" fontSize="medium" />
              <div>
                <span className="font-semibold">{feature.title}:</span>{" "}
                <span className="text-gray-700 dark:text-gray-300">{feature.desc}</span>
              </div>
            </li>
          ))}
        </ul>
        <div className="border-b border-gray-200 dark:border-gray-700 my-4"></div>
        <p className="text-center text-gray-700 dark:text-gray-300 text-base mb-6">
          <span className="font-semibold">NotesWala</span> is built with{" "}
          <span className="text-blue-700 dark:text-blue-300 font-semibold">React</span>,{" "}
          <span className="text-green-700 dark:text-green-300 font-semibold">Node.js</span>,{" "}
          <span className="text-yellow-700 dark:text-yellow-300 font-semibold">Express</span>, and{" "}
          <span className="text-green-700 dark:text-green-300 font-semibold">MongoDB</span>, ensuring a fast, reliable, and scalable note-taking experience.
          <br />
          <span className="font-semibold">Your productivity and privacy are our top priorities!</span>
        </p>
        <div className="flex justify-center mt-4">
          <span className="text-blue-700 dark:text-blue-300 font-semibold">
            <a href="https://www.linkedin.com/in/om-kadu-53305425a/" target="_blank" rel="noopener noreferrer" className="hover:underline">
            Made with ❤️ by{" OK"}
          </a>
         </span>
        </div>
      </div>
    </div>
  );
};

export default About;