import React from "react"

function Portfolio(){

    const data =[
    {   
    id:1,
    name:'João Mendes',
    work:'Desenvolvedor Web',
    problem:'João gerenciava múltiplos projetos de clientes e enfrentava dificuldades para acompanhar prazos e entregas.',
    solution:'Ele passou a organizar todas as tarefas por projeto, com status e prazos definidos. Hoje, consegue visualizar o progresso de cada site em desenvolvimento e manter um fluxo de trabalho constante.',
    response:'O ProjectMate virou meu painel de controle. Sei exatamente o que falta fazer em cada projeto.'
    },
    {   
    id:2,
    name:'Camila Torres',
    work:'Designer Gráfica',
    problem:'Camila trabalhava em diversos projetos de design ao mesmo tempo, e acabava se perdendo entre demandas de clientes.',
    solution:'Com o sistema de tarefas e categorização, ela passou a organizar seus jobs por prioridade, garantindo entregas pontuais e menos retrabalho.',
    response:'Agora tenho uma visão clara de tudo o que está em andamento. Me ajuda muito na rotina.'
    },
    {   
    id:3,
    name:'Rafael Costa',
    work:'Consultor de Marketing',
    problem:'Rafael precisava controlar as estratégias e entregas de campanhas de clientes, mas usava planilhas manuais.',
    solution:'Ele substituiu as planilhas por projetos dentro do ProjectMate, criando tarefas específicas para cada campanha e acompanhando os resultados em um só lugar.',
    response:'O ProjectMate me fez abandonar planilhas. Tudo está mais ágil e visual.'
    },
    {   
    id:4,
    name:'Beatriz Lima',
    work:'Redatora Freelancer',
    problem:'Beatriz gerenciava diversos textos e prazos de entrega para clientes diferentes.',
    solution:'Ela usa o ProjectMate para acompanhar cada artigo e cliente, recebendo lembretes sobre prazos e status das entregas.',
    response:'Organização é tudo no meu trabalho, e o ProjectMate me dá exatamente isso.'
    },
    {   
    id:5,
    name:'Ana Souza',
    work:'Fotógrafa Profissional',
    problem:'Ana precisava acompanhar sessões, edições e entregas de álbuns.',
    solution:'Ela estruturou seus projetos por cliente, separando as etapas de captura, edição e entrega. O ProjectMate a ajuda a visualizar o andamento de cada ensaio, sem deixar nada para trás.',
    response:'Antes eu esquecia prazos de edição. Agora está tudo sob controle.'
    },
    {   
    id:6,
    name:'Laura Bezerra',
    work:'Tradutora Freelancer',
    problem:'Dificuldade em controlar prazos e versões de traduções em andamento.',
    solution:'Ela configurou o ProjectMate para monitorar cada tradução com status (“em tradução”, “revisando”, “enviado”).',
    response:'Me ajudou a evitar confusões e atrasos. Agora tudo tem fluxo e ordem.'
    },
    {   
    id:7,
    name:'Gustavo Rocha',
    work:'Ilustrador Digital',
    problem:'Faltava um sistema visual para acompanhar o progresso de suas artes e encomendas.',
    solution:'Ele organiza suas encomendas em projetos com prazos definidos e checklists personalizados.',
    response:'O visual do ProjectMate combina comigo. Funcional e bonito.'
    },
    {   
    id:8,
    name:'Priscila Fernandes',
    work:'Consultora de RH',
    problem:'Gerenciar atendimentos e planos de ação para diferentes clientes.',
    solution:'Ela criou um painel para cada empresa atendida e controla follow-ups, reuniões e entregas.',
    response:'Simplificou meu fluxo de trabalho. Ganhou horas preciosas no meu dia.'
    },
    {   
    id:9,
    name:'Daniel Moraes',
    work:'Desenvolvedor de Jogos Indie',
    problem:'Controlar etapas longas e complexas do desenvolvimento de um jogo.',
    solution:'Criou tarefas para cada fase do projeto (roteiro, design, programação, testes, lançamento).',
    response:'O ProjectMate me ajuda a enxergar o progresso do meu jogo em tempo real.'
    },
    {   
    id:10,
    name:'Fernanda Ribeiro',
    work:'Personal Trainer Online',
    problem:'Organizar treinos, atualizações e planos de alunos individuais.',
    solution:'Ela usa o app para registrar planos de treino e acompanhar as revisões mensais de cada cliente',
    response:'O ProjectMate virou meu painel de controle de alunos.'
    }
    ]

    return(
        <div>
            <div>
                <div>
                <h1>ProjectMate</h1>
                <span>breve resumo</span>
                </div>
                <div>    
                    <p>resuminho</p>
                    <div>
                        <p>número de clientes no banco</p>
                    </div>
                </div>
            </div>
                <div>
                    <h1>Exemplo de Carteira de clientes</h1>
                </div>
            <div>
                <p>cardclientes</p>
            </div>

        </div>

    )
}

export default Portfolio