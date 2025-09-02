import React, { useState } from "react";
import emailjs from "emailjs-com";
import { motion } from "framer-motion";
import Typical from "react-typical";

interface ProjectCardProps {
  title: string;
  desc: string;
  tech: string;
  images: string[];
  link: string;
}

// ===== PROJECT CARD =====
const ProjectCard: React.FC<ProjectCardProps> = ({ title, desc, tech, images, link }) => {
  const [current, setCurrent] = useState(0);
  const nextImage = (e: React.MouseEvent) => { e.stopPropagation(); setCurrent((current + 1) % images.length); };
  const prevImage = (e: React.MouseEvent) => { e.stopPropagation(); setCurrent((current - 1 + images.length) % images.length); };

  return (
    <motion.div
      className="relative group overflow-hidden rounded-xl shadow-2xl cursor-pointer border-4 border-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 p-1"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.8 }}
    >
      <div className="bg-gray-900 rounded-xl overflow-hidden relative">
        <img src={images[current]} alt={title} className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110" />
        {images.length > 1 && (
          <>
            <button onClick={prevImage} className="absolute top-1/2 left-2 bg-white text-black px-2 py-1 rounded shadow-lg">‹</button>
            <button onClick={nextImage} className="absolute top-1/2 right-2 bg-white text-black px-2 py-1 rounded shadow-lg">›</button>
          </>
        )}
        <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center text-white p-4">
          <motion.h3
            className="text-2xl font-extrabold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 via-pink-500 to-purple-500"
            initial={{ x: -10, opacity: 0 }}
            whileHover={{ x: [-5, 5, -5], opacity: 1 }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            {title}
          </motion.h3>
          <p className="mb-2 text-center">{desc}</p>
          <span className="font-semibold">{tech}</span>
          <a href={link} target="_blank" rel="noopener noreferrer" className="mt-4 underline text-white font-bold">View on GitHub</a>
        </div>
      </div>
    </motion.div>
  );
};

function App() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");

  // ===== SEND EMAIL FUNCTION =====
  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    const templateParams = {
      name: form.name,
      email: form.email,
      message: form.message,
      time: new Date().toLocaleString(),
    };

    emailjs.send(
      "service_7o6p5mn", // your service ID
      "template_rcfkojv", // your template ID
      templateParams,
      "81Y06nL1vhCDTTghX" // your public key
    )
    .then(() => {
      setStatus("✅ Message sent successfully!");
      setForm({ name: "", email: "", message: "" });
    })
    .catch((err) => {
      console.error("EmailJS error:", err);
      setStatus("❌ Failed to send message. Try again.");
    });
  };

  const skills = [
    { name: "React", level: 85, color: "from-blue-400 to-blue-600" },
    { name: "Python", level: 80, color: "from-yellow-400 to-yellow-600" },
    { name: "C++", level: 70, color: "from-red-400 to-red-600" },
    { name: "Django", level: 75, color: "from-green-400 to-green-600" },
    { name: "SQL", level: 70, color: "from-indigo-400 to-indigo-600" },
    { name: "Spring Boot", level: 75, color: "from-green-700 to-green-900" },
    { name: "Java", level: 80, color: "from-orange-400 to-orange-600" },
  ];

  const projects = [
    {
      title: "Gambling App",
      desc: "Fun gambling simulator with multiple mini-games.",
      link: "https://github.com/Ton4ee/gambling-app",
      tech: "JavaScript, HTML, CSS",
      images: ["/resume/gambling black jack.png","/resume/gambling coin toss.png","/resume/gambling slot machine.png"],
    },
    {
      title: "Personal Finance Manager",
      desc: "Track expenses and manage finances with a full-stack app.",
      link: "https://github.com/Ton4ee/-personal-finance-manager",
      tech: "React, Node.js, MongoDB",
      images: ["/resume/personal finance.png","/resume/personal finance 2.png","/resume/personal finance 3.png"],
    },
    {
      title: "Product App",
      desc: "CRUD product management application.",
      link: "https://github.com/Ton4ee/ProductApp",
      tech: "React, Node.js",
      images: ["/resume/product app.png"],
    },
    {
      title: "Weather App",
      desc: "A simple weather app fetching live data.",
      link: "https://github.com/Ton4ee/WeatherApp",
      tech: "React, Tailwind, API",
      images: ["/resume/weather app.jpg"],
    },
  ];

  const floatingShapes = [1,2,3,4,5];

  return (
    <div className="bg-gray-50 text-gray-900 font-sans overflow-x-hidden">

      {/* ===== HERO ===== */}
      <section className="relative min-h-screen flex flex-col justify-center items-center text-center px-6 bg-gradient-to-br from-blue-500 via-pink-500 to-yellow-400 text-white overflow-hidden">
        {floatingShapes.map((s, idx) => (
          <motion.div key={idx} className="absolute w-24 h-24 rounded-full opacity-20"
            style={{ top: `${idx*15}%`, left: `${idx*20}%`, backgroundColor: `hsl(${idx*60}, 80%, 60%)` }}
            animate={{ y: ["0%","25%","0%"], x:["0%","25%","0%"], rotate:[0,360,0] }}
            transition={{ repeat: Infinity, duration: 10+idx }} />
        ))}
        <motion.img src="/resume/GITHUB PROFILE.jpg" alt="Antonio Puceski" className="w-40 h-40 rounded-full border-4 border-white shadow-lg mb-6" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 1 }} />
        <h1 className="text-5xl font-extrabold drop-shadow-lg mb-4">👋 Hi, I'm Antonio</h1>
        <p className="text-xl max-w-2xl mb-6">
          <Typical steps={["I build apps. 💻",2000,"I create 3D games. 🎮",2000,"I solve problems. 🔧",2000,"I am your next intern! 🚀",2000]} loop={Infinity} wrapper="span" />
        </p>
        <div className="flex gap-4">
          <motion.a href="/resume/Antonio-Puceski-CV.pdf.pdf" download className="px-6 py-3 bg-gradient-to-r from-blue-400 to-purple-500 text-white font-semibold rounded-lg shadow-lg hover:scale-105 transition-all">📄 Download Resume</motion.a>
          <motion.a href="https://www.linkedin.com/in/antonio-puceski-9911b1239/" target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-gradient-to-r from-green-400 to-cyan-500 text-white font-semibold rounded-lg shadow-lg hover:scale-105 transition-all">🔗 LinkedIn</motion.a>
        </div>
      </section>

      {/* ===== ABOUT ===== */}
      <section className="py-16 px-6 max-w-5xl mx-auto">
        <motion.h2 className="text-4xl font-bold mb-8 text-center" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity:1, y:0 }} transition={{ duration:0.8 }}>About Me</motion.h2>
        <motion.p className="text-lg leading-relaxed text-gray-700 text-center max-w-3xl mx-auto" initial={{opacity:0}} whileInView={{opacity:1}} transition={{duration:1}}>
          Highly motivated IT student passionate about building applications, games, and solving real-world problems. Eager to contribute to innovative solutions and learn from experienced teams in a dynamic internship environment.
        </motion.p>
      </section>

      {/* ===== SKILLS ===== */}
      <section className="py-16 px-6 bg-gray-100">
        <h2 className="text-4xl font-bold text-center mb-8">Skills</h2>
        <div className="grid md:grid-cols-5 gap-8 max-w-5xl mx-auto">
          {skills.map((skill, idx)=>(
            <motion.div key={idx} className="flex flex-col items-center" initial={{opacity:0, y:20}} whileInView={{opacity:1, y:0}} transition={{duration:0.8, delay:idx*0.2}}>
              <div className={`w-24 h-24 rounded-full bg-gradient-to-r ${skill.color} flex items-center justify-center mb-2 shadow-lg transform hover:scale-110 transition-transform`}>
                <span className="font-bold text-white text-lg">{skill.level}%</span>
              </div>
              <p className="mt-2 text-center font-semibold">{skill.name}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ===== PROJECTS ===== */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold mb-8 text-center">Projects</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {projects.map((proj, idx)=>(
            <ProjectCard key={idx} title={proj.title} desc={proj.desc} tech={proj.tech} images={proj.images} link={proj.link}/>
          ))}
        </div>

        {/* SEE MORE PROJECTS BUTTON */}
        <div className="col-span-full flex justify-center mt-8">
          <motion.a
            href="https://github.com/Ton4ee"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white font-bold rounded-xl shadow-lg hover:scale-105 transition-transform"
            whileHover={{ scale: 1.05 }}
          >
            SEE MORE PROJECTS
          </motion.a>
        </div>
      </section>

      {/* ===== CONTACT ===== */}
      <section className="py-16 px-6 bg-gradient-to-r from-green-400 via-cyan-500 to-pink-500 text-white">
        <h2 className="text-4xl font-bold mb-8 text-center">Contact Me</h2>
        <form onSubmit={sendEmail} className="max-w-lg mx-auto bg-white p-8 rounded-2xl shadow space-y-4 text-gray-900">
          <input type="text" placeholder="Your Name" className="w-full p-3 border rounded-lg" value={form.name} onChange={(e)=>setForm({...form,name:e.target.value})} required/>
          <input type="email" placeholder="Your Email" className="w-full p-3 border rounded-lg" value={form.email} onChange={(e)=>setForm({...form,email:e.target.value})} required/>
          <textarea placeholder="Your Message" className="w-full p-3 border rounded-lg" rows={5} value={form.message} onChange={(e)=>setForm({...form,message:e.target.value})} required/>
          <motion.button type="submit" className="w-full py-3 bg-gradient-to-r from-blue-400 to-purple-500 text-white rounded-lg hover:scale-105 transition-all" whileHover={{scale:1.05}}>Send Message</motion.button>
          {status && <p className="mt-4 text-center font-semibold text-indigo-700">{status}</p>}
        </form>
      </section>

      <footer className="py-6 text-center text-gray-600">
        © {new Date().getFullYear()} Antonio Puceski. Built with ❤️ using React + Tailwind + Framer Motion.
      </footer>
    </div>
  );
}

export default App;
