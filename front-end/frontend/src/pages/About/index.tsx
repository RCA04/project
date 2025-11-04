
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
                O ProjectMate é uma plataforma moderna de gerenciamento de projetos e tarefas, <br/> 
                criada para ajudar profissionais a organizarem seu trabalho de forma prática, 
                colaborativa e eficiente. <br/>
                Com uma interface intuitiva e visual limpo, o ProjectMate permite que você crie e conclua projetos e tarefas com facilidade, <br/>
                mantendo tudo centralizado em um só lugar.<br/>

                Nosso objetivo é simplificar a gestão do dia a dia, 
                fornecendo ferramentas que aumentam a produtividade e promovem o trabalho em equipe.<br/>
                </p>
                <p className="font-bold text-2xl mt-5">
                Com o ProjectMate, você pode:<br/>
                </p>
            </div>

            <div className="w-full text-center">
                <ul className="flex flex-col gap-3 font-semibold">
                    <li>
                    ✅ Criar e gerenciar múltiplos projetos;
                    </li>
                    <li>
                    🗂️ Organizar tarefas por prioridade e status;
                    </li>
                </ul>
            </div>

            <div className="w-full text-center">
                <p className="font-semibold">
                Mais do que uma ferramenta, o ProjectMate é o seu parceiro de produtividade.<br/>
                Transforme ideias em resultados e mantenha seus projetos sempre sob controle.
                </p>
            </div>

        </div>
    </div>
)
}

export default About;