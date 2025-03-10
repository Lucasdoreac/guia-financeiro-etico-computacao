document.addEventListener('DOMContentLoaded', function() {
    // Navegação entre seções
    const navLinks = document.querySelectorAll('nav a');
    const sections = document.querySelectorAll('section');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remover classe ativa de todos os links
            navLinks.forEach(navLink => navLink.classList.remove('active'));
            
            // Adicionar classe ativa ao link clicado
            this.classList.add('active');
            
            // Obter o ID da seção a ser mostrada
            const targetId = this.getAttribute('href').substring(1);
            
            // Esconder todas as seções
            sections.forEach(section => {
                section.classList.remove('active-section');
            });
            
            // Mostrar a seção alvo
            document.getElementById(targetId).classList.add('active-section');
            
            // Rolar para o topo
            window.scrollTo(0, 0);
        });
    });
    
    // Links internos (botões CTA, etc)
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        if (!link.closest('nav')) {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href').substring(1);
                
                // Esconder todas as seções
                sections.forEach(section => {
                    section.classList.remove('active-section');
                });
                
                // Mostrar a seção alvo
                document.getElementById(targetId).classList.add('active-section');
                
                // Atualizar navegação
                navLinks.forEach(navLink => {
                    if (navLink.getAttribute('href') === '#' + targetId) {
                        navLink.classList.add('active');
                    } else {
                        navLink.classList.remove('active');
                    }
                });
                
                // Rolar para o topo
                window.scrollTo(0, 0);
            });
        }
    });

    // Carregar dados financeiros
    loadFinancialData();
    
    // Filtro de áreas financeiras
    const areaFilter = document.getElementById('area-filter');
    if (areaFilter) {
        areaFilter.addEventListener('change', function() {
            filterFinancialData(this.value);
        });
    }
});

// Dados financeiros
const financialData = {
    ia: {
        title: "Inteligência Artificial e Machine Learning",
        salaries: [
            "Iniciante (0-2 anos): R$ 6.500 - R$ 9.000",
            "Intermediário (3-5 anos): R$ 10.000 - R$ 18.000",
            "Sênior (6+ anos): R$ 18.000 - R$ 35.000",
            "Especialista/Líder Técnico: R$ 30.000 - R$ 50.000+"
        ],
        freelance: [
            "Projetos pontuais: R$ 150 - R$ 300/hora",
            "Consultoria especializada: R$ 200 - R$ 500/hora",
            "Treinamento corporativo: R$ 8.000 - R$ 15.000/dia"
        ],
        startups: [
            "Equity: Startups de IA oferecem frequentemente 0,1% a 1,5% de participação para especialistas",
            "Bônus por performance: Comuns em empresas de IA, podendo alcançar 30% do salário anual",
            "Financiamento: O setor de IA recebeu R$ 2,8 bilhões em investimentos no Brasil em 2024"
        ],
        alternative: [
            "Cooperativas tecnológicas: Rendimento médio de R$ 12.000 - R$ 20.000 mensais",
            "Pesquisa acadêmica com bolsas: R$ 8.000 - R$ 15.000 (pós-doutorado/pesquisador visitante)"
        ]
    },
    web: {
        title: "Desenvolvimento Web/Mobile",
        salaries: [
            "Iniciante (0-2 anos): R$ 3.800 - R$ 6.500",
            "Intermediário (3-5 anos): R$ 7.000 - R$ 12.000",
            "Sênior (6+ anos): R$ 12.000 - R$ 20.000",
            "Especialista/Líder Técnico: R$ 18.000 - R$ 30.000"
        ],
        freelance: [
            "Aplicativo mobile simples: R$ 15.000 - R$ 40.000",
            "Site institucional: R$ 8.000 - R$ 20.000",
            "E-commerce completo: R$ 25.000 - R$ 80.000",
            "Hora técnica: R$ 100 - R$ 200/hora"
        ],
        startups: [
            "Equity: Normalmente 0,05% a 0,8% para desenvolvedores seniores",
            "Ganhos potenciais: Desenvolvedores full-stack são dos profissionais mais requisitados em startups iniciais"
        ],
        alternative: [
            "Cooperativas de desenvolvimento: Rendimento médio de R$ 8.000 - R$ 15.000 mensais",
            "Coletivos de tecnologia: Projetos de impacto social com rendimentos de R$ 6.000 - R$ 10.000"
        ]
    },
    cyber: {
        title: "Cibersegurança",
        salaries: [
            "Iniciante (0-2 anos): R$ 5.000 - R$ 8.000",
            "Intermediário (3-5 anos): R$ 9.000 - R$ 15.000",
            "Sênior (6+ anos): R$ 15.000 - R$ 28.000",
            "Especialista/Líder Técnico: R$ 25.000 - R$ 45.000"
        ],
        freelance: [
            "Teste de penetração: R$ 15.000 - R$ 50.000 por projeto",
            "Auditoria de segurança: R$ 25.000 - R$ 80.000 por projeto",
            "Resposta a incidentes: R$ 300 - R$ 800/hora",
            "Bug bounty: Recompensas médias de R$ 5.000 - R$ 30.000 por vulnerabilidade crítica"
        ],
        startups: [
            "Equity: Especialistas em segurança recebem frequentemente 0,5% a 2% em startups de tecnologia",
            "Demanda crescente: Aumento de 300% na contratação de especialistas em cibersegurança no Brasil entre 2023-2025"
        ],
        alternative: [
            "Coletivos de segurança digital: Foco em proteção de ONGs e ativistas, com rendimentos de R$ 8.000 - R$ 18.000",
            "Educação e treinamento: Cursos e workshops podem gerar R$ 5.000 - R$ 15.000 mensais"
        ]
    },
    data: {
        title: "Ciência de Dados e Analytics",
        salaries: [
            "Iniciante (0-2 anos): R$ 5.500 - R$ 8.500",
            "Intermediário (3-5 anos): R$ 9.000 - R$ 16.000",
            "Sênior (6+ anos): R$ 16.000 - R$ 28.000",
            "Especialista/Líder Técnico: R$ 25.000 - R$ 40.000"
        ],
        freelance: [
            "Projetos de análise de dados: R$ 15.000 - R$ 60.000",
            "Dashboards e visualização: R$ 8.000 - R$ 25.000",
            "Implementação de modelos preditivos: R$ 20.000 - R$ 80.000",
            "Consultoria estratégica de dados: R$ 200 - R$ 400/hora"
        ],
        startups: [
            "Equity: 0,2% a 1% para cientistas de dados seniores",
            "Bônus por performance: Entre 15% e 25% do salário anual"
        ],
        alternative: [
            "Laboratórios de dados abertos: Focados em cidades inteligentes e transparência, com rendimentos de R$ 10.000 - R$ 18.000",
            "Projetos sociais com dados: ONGs pagando R$ 7.000 - R$ 15.000 para projetos específicos"
        ]
    },
    devops: {
        title: "DevOps e Infraestrutura Cloud",
        salaries: [
            "Iniciante (0-2 anos): R$ 5.000 - R$ 8.000",
            "Intermediário (3-5 anos): R$ 9.000 - R$ 16.000",
            "Sênior (6+ anos): R$ 15.000 - R$ 25.000",
            "Especialista/Arquiteto Cloud: R$ 22.000 - R$ 40.000"
        ],
        freelance: [
            "Migração para cloud: R$ 20.000 - R$ 100.000 (dependendo do porte)",
            "Implementação de pipeline CI/CD: R$ 15.000 - R$ 40.000",
            "Otimização de infraestrutura: R$ 150 - R$ 300/hora",
            "Disaster recovery planning: R$ 25.000 - R$ 60.000"
        ],
        startups: [
            "Equity: Geralmente 0,1% a 0,8% para DevOps seniores",
            "Economia gerada: Profissionais de DevOps podem demonstrar redução de custos de 30-60% em infraestrutura"
        ],
        alternative: [
            "Coletivos de hospedagem ética: Foco em privacidade e software livre, rendimentos de R$ 8.000 - R$ 15.000",
            "Consultoria para ONGs: Infraestrutura para projetos sociais, R$ 6.000 - R$ 12.000 mensais"
        ]
    }
};

// Função para carregar dados financeiros
function loadFinancialData() {
    const financialContent = document.getElementById('financial-content');
    if (!financialContent) return;
    
    // Limpar conteúdo atual
    financialContent.innerHTML = '';
    
    // Iterar sobre cada área
    Object.keys(financialData).forEach(area => {
        const data = financialData[area];
        
        // Criar card para a área
        const card = document.createElement('div');
        card.className = 'financial-card';
        card.dataset.area = area;
        
        // Adicionar título
        const title = document.createElement('h3');
        title.textContent = data.title;
        card.appendChild(title);
        
        // Adicionar salários
        const salaryTitle = document.createElement('h4');
        salaryTitle.textContent = 'Faixas Salariais (Brasil)';
        card.appendChild(salaryTitle);
        
        const salaryList = document.createElement('ul');
        data.salaries.forEach(salary => {
            const item = document.createElement('li');
            item.textContent = salary;
            salaryList.appendChild(item);
        });
        card.appendChild(salaryList);
        
        // Adicionar freelance
        const freelanceTitle = document.createElement('h4');
        freelanceTitle.textContent = 'Freelance e Consultoria';
        card.appendChild(freelanceTitle);
        
        const freelanceList = document.createElement('ul');
        data.freelance.forEach(freelance => {
            const item = document.createElement('li');
            item.textContent = freelance;
            freelanceList.appendChild(item);
        });
        card.appendChild(freelanceList);
        
        // Adicionar startups
        const startupTitle = document.createElement('h4');
        startupTitle.textContent = 'Oportunidades em Startups';
        card.appendChild(startupTitle);
        
        const startupList = document.createElement('ul');
        data.startups.forEach(startup => {
            const item = document.createElement('li');
            item.textContent = startup;
            startupList.appendChild(item);
        });
        card.appendChild(startupList);
        
        // Adicionar modelos alternativos
        const altTitle = document.createElement('h4');
        altTitle.textContent = 'Cooperativas e Modelos Alternativos';
        card.appendChild(altTitle);
        
        const altList = document.createElement('ul');
        data.alternative.forEach(alt => {
            const item = document.createElement('li');
            item.textContent = alt;
            altList.appendChild(item);
        });
        card.appendChild(altList);
        
        // Adicionar card ao conteúdo
        financialContent.appendChild(card);
    });
}

// Função para filtrar dados financeiros
function filterFinancialData(area) {
    const cards = document.querySelectorAll('.financial-card');
    
    cards.forEach(card => {
        if (area === 'all' || card.dataset.area === area) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}