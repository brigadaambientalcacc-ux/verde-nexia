export const instituicao = {
  proponente: "Centro Assistencial Carlos Carvalho – CACC",
  cnpj: "00.144.652/0001-08",
  municipio: "Mesquita – RJ",
  responsavel: "Antonio Carlos Brandão Cerqueira",
  referencia: "Outubro de 2026",
  programa: "Programa Verde Nexia",
  assinatura: "Pesquisa, Desenvolvimento e Inteligência Ambiental",
};

export const numerosChave = [
  { valor: "6", rotulo: "núcleos de PD&I", detalhe: "Projetos tecnológicos integrados" },
  { valor: "200", rotulo: "profissionais previstos", detalhe: "182 nos núcleos + 18 transversais" },
  { valor: "120", rotulo: "meses de vigência inicial", detalhe: "Horizonte potencial de 240 meses" },
  { valor: "41,169", rotulo: "km² de território", detalhe: "Município de Mesquita, Baixada Fluminense" },
];

export const objetivosEspecificos = [
  "Desenvolver sistemas de inteligência artificial aplicados ao reconhecimento de vegetação, biodiversidade e alterações ambientais.",
  "Criar uma rede experimental de sensores para acompanhamento de variáveis ambientais.",
  "Desenvolver soluções para identificação precoce de indícios de incêndios florestais.",
  "Executar levantamentos por drones e sensoriamento remoto, mediante autorização.",
  "Construir um catálogo digital georreferenciado de áreas verdes e recursos ambientais.",
  "Monitorar indicadores hidrológicos, climáticos e condições de áreas vulneráveis.",
  "Integrar informações em um Centro de Operações e Monitoramento Ambiental.",
  "Produzir estudos científicos sobre conservação, recuperação ambiental e dinâmica dos ecossistemas.",
  "Formar profissionais especializados em tecnologia ambiental.",
  "Criar modelos tecnológicos que possam ser adaptados a outros municípios.",
  "Desenvolver ações de educação e conscientização ambiental.",
  "Estabelecer mecanismos de documentação científica, transparência e avaliação de resultados.",
];

export const territorios = [
  {
    nome: "Parque Natural Municipal de Mesquita",
    descricao: "Unidade municipal de conservação entre as áreas consideradas para levantamento preliminar.",
  },
  {
    nome: "Áreas relacionadas à APARU Gericinó",
    descricao: "Área de proteção ambiental com interface direta com o maciço e seu entorno.",
  },
  {
    nome: "Maciço Gericinó-Mendanha",
    descricao: "Remanescente de Mata Atlântica próximo às áreas urbanizadas do município.",
  },
  {
    nome: "Remanescentes florestais e áreas de transição urbana",
    descricao: "Fragmentos de vegetação e faixas de contato entre cidade e floresta.",
  },
  {
    nome: "Áreas de influência dos rios Dona Eugênia e Sarapuí",
    descricao: "Territórios de interesse para o acompanhamento hidrológico.",
  },
  {
    nome: "Áreas verdes urbanas e pontos ambientalmente vulneráveis",
    descricao: "Praças, áreas remanescentes e locais com histórico de pressão ambiental.",
  },
];

export const ressalvaTerritorial =
  "A seleção definitiva de cada área depende de levantamento geográfico, identificação do órgão gestor, autorização de acesso e avaliação técnica.";

export const governanca = [
  { nome: "Superintendência e coordenação executiva", descricao: "Representação institucional e direção geral do programa." },
  { nome: "Direção científica de PD&I", descricao: "Condução das linhas de pesquisa e do plano científico de cada núcleo." },
  { nome: "Coordenação tecnológica e de inteligência artificial", descricao: "Desenvolvimento de software, modelos e infraestrutura de processamento." },
  { nome: "Coordenação ambiental e equipes de campo", descricao: "Levantamentos, observação territorial e registro de dados primários." },
  { nome: "Gestão administrativa e financeira", descricao: "Centros de custo, execução orçamentária e prestação de contas." },
  { nome: "Controle de contratos e aquisições", descricao: "Especificação técnica, estimativa e acompanhamento contratual." },
  { nome: "Assessoria jurídica e conformidade", descricao: "Análise de instrumentos, autorizações e requisitos legais." },
  { nome: "Monitoramento de resultados e prestação de contas", descricao: "Indicadores, relatórios periódicos e auditoria técnica." },
];

export const contratos = [
  { nome: "Tecnologia integrada", descricao: "Equipamentos, servidores, sensores, drones, telecomunicações e dispositivos digitais." },
  { nome: "Alimentação", descricao: "Atendimento às equipes conforme jornadas e locais de trabalho." },
  { nome: "Limpeza e conservação", descricao: "Manutenção das instalações administrativas, técnicas e laboratórios." },
  { nome: "Veículos e transporte", descricao: "Deslocamento de equipes, levantamentos ambientais e transporte de equipamentos." },
  { nome: "Energia e infraestrutura", descricao: "Alimentação elétrica, sistemas auxiliares e continuidade operacional." },
  { nome: "Uniformes e equipamentos de proteção", descricao: "Vestuário operacional, identificação e EPI adequado aos riscos das atividades." },
  { nome: "Manutenção especializada", descricao: "Suporte preventivo e corretivo de instalações e equipamentos científicos." },
  { nome: "Telecomunicações", descricao: "Implantação e manutenção de conectividade e transmissão de dados." },
];

export type Fase = {
  id: string;
  rotulo: string;
  periodo: string;
  intervalo: string;
  equipe: number | null;
  resumo: string;
  marcos: string[];
};

export const fases: Fase[] = [
  {
    id: "preparatoria",
    rotulo: "Fase preparatória",
    periodo: "Habilitação institucional",
    intervalo: "Antes do mês 1",
    equipe: null,
    resumo: "Preparação das condições necessárias à execução.",
    marcos: [
      "Revisão documental e análise jurídica",
      "Confirmação da representação institucional",
      "Estudos territoriais e orçamentos",
      "Identificação de parceiros",
    ],
  },
  {
    id: "fase-1",
    rotulo: "Fase I",
    periodo: "Meses 1 a 6",
    intervalo: "1 → 6",
    equipe: 50,
    resumo: "Estruturação inicial e primeiros ambientes tecnológicos.",
    marcos: [
      "Implantação dos primeiros ambientes técnicos",
      "Seleção de áreas-piloto",
      "Testes preliminares de sensores",
      "Equipe inicial de até 50 profissionais",
    ],
  },
  {
    id: "fase-2",
    rotulo: "Fase II",
    periodo: "Meses 7 a 12",
    intervalo: "7 → 12",
    equipe: 100,
    resumo: "Expansão dos núcleos científicos e primeiros modelos de IA.",
    marcos: [
      "Ampliação de equipamentos",
      "Desenvolvimento dos primeiros modelos de inteligência artificial",
      "Execução de levantamentos ambientais",
      "Crescimento planejado para 100 profissionais",
    ],
  },
  {
    id: "fase-3",
    rotulo: "Fase III",
    periodo: "Meses 13 a 18",
    intervalo: "13 → 18",
    equipe: 150,
    resumo: "Integração dos projetos e evolução do NOC Ambiental.",
    marcos: [
      "Integração entre os seis núcleos",
      "Ampliação das atividades de campo",
      "Validação cruzada de informações",
      "Crescimento para até 150 profissionais",
    ],
  },
  {
    id: "fase-4",
    rotulo: "Fase IV",
    periodo: "Meses 19 a 36",
    intervalo: "19 → 36",
    equipe: 200,
    resumo: "Consolidação operacional e capacidade planejada.",
    marcos: [
      "Consolidação da estrutura operacional",
      "Ampliação das pesquisas",
      "Produção de relatórios e auditorias técnicas",
      "Alcance de até 200 profissionais",
    ],
  },
  {
    id: "continuidade",
    rotulo: "Fase de continuidade",
    periodo: "Meses 37 a 120",
    intervalo: "37 → 120",
    equipe: null,
    resumo: "Operação, manutenção e atualização tecnológica.",
    marcos: [
      "Operação e manutenção dos sistemas",
      "Desenvolvimento de novas pesquisas",
      "Avaliação de resultados",
      "Novos planejamentos e orçamentos específicos",
    ],
  },
  {
    id: "horizonte",
    rotulo: "Horizonte complementar",
    periodo: "Meses 121 a 240",
    intervalo: "121 → 240",
    equipe: null,
    resumo: "Continuidade institucional condicionada a novos instrumentos.",
    marcos: [
      "Possível continuidade institucional",
      "Expansão tecnológica",
      "Celebração dos instrumentos juridicamente admissíveis",
    ],
  },
];

export type IndicadorPrevisto = {
  nome: string;
  descricao: string;
  grupo: "Território" | "Tecnologia" | "Pesquisa" | "Pessoas" | "Gestão";
};

export const indicadoresPrevistos: IndicadorPrevisto[] = [
  { nome: "Disponibilidade dos sistemas de comunicação", descricao: "Percentual de tempo em que a rede de transmissão permanece ativa.", grupo: "Tecnologia" },
  { nome: "Missões aéreas autorizadas", descricao: "Quantidade de voos realizados com autorização vigente.", grupo: "Território" },
  { nome: "Registros ambientais validados", descricao: "Observações conferidas pela equipe técnica e incorporadas ao catálogo.", grupo: "Pesquisa" },
  { nome: "Precisão dos modelos de inteligência artificial", descricao: "Desempenho medido dos modelos de classificação e detecção.", grupo: "Tecnologia" },
  { nome: "Tempo de identificação e triagem de alertas", descricao: "Intervalo entre o indício registrado e a classificação humana.", grupo: "Tecnologia" },
  { nome: "Estudos e protótipos desenvolvidos", descricao: "Entregas científicas e tecnológicas documentadas por núcleo.", grupo: "Pesquisa" },
  { nome: "Profissionais capacitados", descricao: "Pessoas formadas em metodologia, operação e segurança.", grupo: "Pessoas" },
  { nome: "Atividades educativas executadas", descricao: "Oficinas, apresentações e ações comunitárias realizadas.", grupo: "Pessoas" },
  { nome: "Entregas científicas documentadas", descricao: "Relatórios, artigos e protocolos registrados.", grupo: "Gestão" },
  { nome: "Execução financeira e auditoria", descricao: "Acompanhamento por centros de custo e prestação de contas.", grupo: "Gestão" },
];

export const niveisTriagem = [
  {
    nivel: "01",
    nome: "Teste",
    descricao: "Verificação de funcionamento dos sensores e modelos, sem valor de alerta.",
    tom: "muted" as const,
  },
  {
    nivel: "02",
    nome: "Suspeita",
    descricao: "Sinal atípico registrado, ainda sem confirmação de relevância ambiental.",
    tom: "sky" as const,
  },
  {
    nivel: "03",
    nome: "Indício relevante",
    descricao: "Conjunto de sinais convergem e o caso é encaminhado para análise técnica.",
    tom: "ember" as const,
  },
  {
    nivel: "04",
    nome: "Emergência",
    descricao: "Situação que exige comunicação imediata aos órgãos competentes.",
    tom: "ember" as const,
  },
];

export const navegacao = [
  { rotulo: "O programa", href: "/programa" },
  { rotulo: "Projetos", href: "/projetos" },
  { rotulo: "NOC Ambiental", href: "/noc" },
  { rotulo: "Governança", href: "/governanca" },
  { rotulo: "Cronograma", href: "/cronograma" },
  { rotulo: "Indicadores", href: "/indicadores" },
];
