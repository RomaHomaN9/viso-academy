import React, { useRef, useState, useEffect } from "react";

function Module() {
    const formRef = useRef(null);

    const [projects, setProjects] = useState(() => {
        return JSON.parse(localStorage.getItem("projects")) || [];
    });

    const [darkMode, setDarkMode] = useState(() => {
        return localStorage.getItem("theme") === "dark";
    });

    useEffect(() => {
        localStorage.setItem("theme", darkMode ? "dark" : "light");
    }, [darkMode]);

    const Save = () => {
        const formData = new FormData(formRef.current);
        const data = Object.fromEntries(formData.entries());

        if (!data.date || !data.projectName0) {
            alert("Please fill date and at least one project name");
            return;
        }

        const newProject = { ...data, id: Date.now() };
        const updated = [...projects, newProject];

        setProjects(updated);
        localStorage.setItem("projects", JSON.stringify(updated));
        formRef.current.reset();
    };

    const deleteProject = (id) => {
        const updated = projects.filter((p) => p.id !== id);
        setProjects(updated);
        localStorage.setItem("projects", JSON.stringify(updated));
    };

    return (
        <div className={`wrapper ${darkMode ? "dark-theme" : ""}`}>
            <div className="container">
                <div className="header-row">
                    <h2>Project Tracker</h2>
                    <button className="btn-theme" onClick={() => setDarkMode(!darkMode)}>
                        {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
                    </button>
                </div>

                <form ref={formRef} style={{ display: "flex", flexDirection: "column" }}>
                    <input id="date" name="date" type="date" defaultValue={new Date().toISOString().split("T")[0]} />
                    <div className="input-group">
                        <input name="projectName0" placeholder="Project 1" />
                        <input name="projectName1" placeholder="Project 2" />
                        <input name="projectName2" placeholder="Project 3" />
                    </div>
                    <input name="time" type="time" />
                    <textarea name="description" placeholder="Work description..."></textarea>
                    <button className="btn-save" onClick={Save} type="button">
                        Save Project
                    </button>
                </form>

                <hr style={{ margin: "25px 0", borderColor: "var(--border-color)" }} />

                <h3>Saved Projects</h3>
                <ul>
                    {projects.map((obj) => (
                        <li key={obj.id}>
                            <div className="project-card-header">
                                <strong>📅 {obj.date}</strong>
                                <button className="btn-delete" onClick={() => deleteProject(obj.id)}>
                                    Delete
                                </button>
                            </div>
                            <p>
                                <strong>Tasks:</strong> {obj.projectName0} {obj.projectName1} {obj.projectName2}
                            </p>
                            <p>
                                <strong>Time:</strong> ⏱ {obj.time}
                            </p>
                            <p>
                                <strong>Notes:</strong> {obj.description}
                            </p>
                        </li>
                    ))}
                </ul>
                {projects.length === 0 && <p style={{ textAlign: "center", opacity: 0.6 }}>No projects saved yet.</p>}
            </div>
        </div>
    );
}

export default Module;
