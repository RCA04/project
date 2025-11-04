
function About(){
return(
    <div className="my-30">
        <div className="w-full flex flex-col align-center items-center">
            <h1 className=" font-bold  text-7xl text-violet-600">ProjectMate</h1>
            <span className=" mt-5 font-semibold text-base text-gray-700">sobre nós</span>
        </div>
        
        <div className="w-full mt-10 flex flex-col gap-10 align-center justify-center items-center">
            
            <div className="w-full items-center text-center">
                <p className="font-semibold">
                ProjectMate is a modern project and task management platform, <br/> 
                created to help professionals organize their work in a practical, 
                collaborative, and efficient way. <br/>
                With an intuitive interface and clean visuals, ProjectMate allows you to create and complete projects and tasks with ease. <br/>
                keeping everything centralized in one place..<br/>

                Our goal is to simplify day-to-day management. 
                providing tools that increase productivity and promote teamwork.<br/>
                </p>
                <p className="font-bold text-2xl mt-5">
                With ProjectMate, you can:<br/>
                </p>
            </div>

            <div className="w-full text-center">
                <ul className="flex flex-col gap-3 font-semibold">
                    <li>
                    ✅ Create and manage multiple projects;
                    </li>
                    <li>
                    🗂️ Organize tasks by priority and status;
                    </li>
                </ul>
            </div>

            <div className="w-full text-center">
                <p className="font-semibold">
                More than just a tool, ProjectMate is your productivity partner.<br/>
                Turn ideas into results and keep your projects always under control.
                </p>
            </div>
        </div>
    </div>
)
}

export default About;