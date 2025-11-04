import React from "react"

function Portfolio(){

    const data =[
    {   
    id:1,
    name:'João Mendes',
    work:'Web Developer',
    problem:'João managed multiple client projects and faced difficulties keeping track of deadlines and deliverables.',
    solution:'He began organizing all tasks by project, with defined statuses and deadlines. Today, he can visualize the progress of each website under development and maintain a constant workflow.',
    response:'ProjectMate has become my control panel. I know exactly what needs to be done in each project.'
    },
    {   
    id:2,
    name:'Camila Torres',
    work:'Graphic Designer',
    problem:'Camila was working on several design projects at the same time, and ended up getting lost among client demands.',
    solution:'With the task and categorization system, she began to organize her jobs by priority, ensuring on-time deliveries and less rework.',
    response:'Now I have a clear overview of everything thats going on. It helps me a lot in my daily routine'
    },
    {   
    id:3,
    name:'Rafael Costa',
    work:'Marketing Consultant',
    problem:'Rafael needed to manage the strategies and deliverables of client campaigns, but he was using manual spreadsheets.',
    solution:'He replaced spreadsheets with projects within ProjectMate, creating specific tasks for each campaign and tracking results in one place.',
    response:'ProjectMate made me ditch spreadsheets. Everything is faster and more visual.'
    },
    {   
    id:4,
    name:'Beatriz Lima',
    work:'Freelance Writer',
    problem:'Beatriz managed numerous texts and deadlines for different clients.',
    solution:'She uses ProjectMate to track each article and client, receiving reminders about deadlines and delivery status.',
    response:'Organization is everything in my work, and ProjectMate gives me exactly that.'
    },
    {   
    id:5,
    name:'Ana Souza',
    work:'Professional Photographer',
    problem:'Ana needed to be present for photo sessions, album editing, and deliveries.',
    solution:'She structured her projects by client, separating the capture, editing, and delivery stages. ProjectMate helps her visualize the progress of each shoot, ensuring nothing is missed.',
    response:'I used to forget editing deadlines. Now everything is under control.'
    },
    {   
    id:6,
    name:'Laura Bezerra',
    work:'Freelance Translator',
    problem:'Difficulty in managing deadlines and versions of ongoing translations.',
    solution:'She configured ProjectMate to monitor each translation with its status.',
    response:'It helped me avoid confusion and delays. Now everything flows smoothly and is in order.'
    },
    {   
    id:7,
    name:'Gustavo Rocha',
    work:'Digital Illustrator',
    problem:'A visual system was needed to track the progress of his artwork and commissions.',
    solution:'He organizes his orders into projects with defined deadlines and customized checklists.',
    response:'The ProjectMate design suits me perfectly. Functional and beautiful.'
    },
    {   
    id:8,
    name:'Priscila Fernandes',
    work:'HR Consultant',
    problem:'Manage customer service interactions and action plans for different clients.',
    solution:'She created a dashboard for each client company and manages follow-ups, meetings, and deliverables.',
    response:'It simplified my workflow. It gained precious hours in my day.'
    },
    {   
    id:9,
    name:'Daniel Moraes',
    work:'Indie Game Developer',
    problem:'Controlling long and complex stages of game development.',
    solution:'He created tasks for each phase of the project.',
    response:'ProjectMate helps me see my game progress in real time.'
    },
    {   
    id:10,
    name:'Fernanda Ribeiro',
    work:'Online Personal Trainer',
    problem:'Organize training sessions, updates, and individual student plans.',
    solution:'She uses the app to record workout plans and track monthly reviews for each client.',
    response:'ProjectMate has become my student control panel.'
    }
    ]

    return(
        <div className="my-30" >
            <div>
                <div className="w-full flex flex-col align-center items-center">
                <h1 className=" font-bold  text-5xl text-violet-600">ProjectMate</h1>
                <span className=" mt-2.5 font-semibold text-base text-gray-700">brief summary</span>
                </div>
                <div className="w-full mt-2.5 items-center text-center">    
                    <p className="font-semibold">ProjectMate is a project and task management platform.<br/> Developed to optimize the workflow of companies and teams.</p>
                    <p className="font-semibold">
                        Our Mission is
                        To empower professionals with
                        a complete and accessible project management solution.<br/> 
                        helping you work smarter
                        and more organized.
                    </p>
                    <div className="w-full mt-20 flex flex-col items-center text-center">
                        <span className=" mt-2.5 font-semibold text-base text-gray-700">Total Customers</span>
                        <h1 className=" font-bold mt-4  text-7xl text-violet-600">+ 60</h1>
                    </div>
                </div>
            </div>
                <div className="w-full  flex flex-col mt-20 align-center items-center">
                    <h1 className=" font-bold  text-5xl text-violet-600">Customer Feedback</h1>
                </div>
            <div className="grid grid-cols-3 gap-10 w-full h-full my-10">
                 {data.map((data) => (
                <div key={data.id} className="bg-gray-200 hover:bg-gray-300 hover:scale-110 hover:shadow-purple-600/50 border-purple-300 duration-150 transition mx-10 max-w-150 shadow-2xl shadow-purple-500 border rounded-2xl p-2">
                <h3 ><strong>{data.name} - {data.work}</strong></h3>
                <div className="my-0.5">
                <p className="text-purple-600"><strong>Problem:</strong></p>
                <p>
                    {data.problem}
                </p>
                </div>
                <div className="my-0.5">
                <p className="text-purple-600"><strong>Solution:</strong></p>
                <p>
                {data.solution}
                </p>
                </div>
                <div className="my-0.5">
                <p className="text-purple-600"><strong>Feedback:</strong></p>
                 <p>
                 {data.response}
                 </p>
                </div>
                </div>
      ))}
            </div>

        </div>

    )
}

export default Portfolio