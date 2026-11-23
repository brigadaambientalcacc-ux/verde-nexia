import {
  BrainCircuit,
  Flame,
  Radio,
  Plane,
  LibraryBig,
  Waves,
  type LucideIcon,
} from "lucide-react";

export type TomProjeto = "moss" | "ember" | "sky" | "forest";

export type Projeto = {
  slug: string;
  nome: string;
  apelido: string;
  subtitulo: string;
  resumo: string;
  equipe: number;
  foco: string[];
  resultados: string[];
  limites: string;
  icone: LucideIcon;
  tom: TomProjeto;
};

export const projetos: Projeto[] = [
  {
    slug: "deepforest",
    nome: "DeepForest",
    apelido: "Inteligência artificial aplicada à vegetação",
    subtitulo: "Reconhecimento e classificação de cobertura vegetal",
    resumo:
      "Pesquisa, desenvolvimento e validação de modelos de aprendizado profundo para reconhecer vegetação, identificar padrões ambientais e acompanhar mudanças da cobertura florestal.",
    equipe: 24,
    foco: [
      "Imagens de satélite, drones, câmeras e dados georreferenciados",
      "Modelos de aprendizado profundo aplicados a séries temporais",
      "Classificação de cobertura vegetal e comparação entre períodos",
      "Avaliação de desempenho dos algoritmos em diferentes condições ambientais",
    ],
    resultados: [
      "Mapas automatizados de cobertura vegetal",
      "Identificação de alterações ambientais",
      "Sistemas de classificação de imagens",
      "Estudos comparativos sobre a evolução da vegetação",
    ],
    limites:
      "Os modelos são experimentais e dependem de validação em campo; nenhuma classificação automática substitui laudo técnico.",
    icone: BrainCircuit,
    tom: "moss",
  },
  {
    slug: "fire-intelligence",
    nome: "Fire Intelligence",
    apelido: "Inteligência para prevenção de incêndios",
    subtitulo: "Identificação antecipada de riscos em vegetação",
    resumo:
      "Núcleo de pesquisa voltado à identificação antecipada de possíveis ocorrências de incêndios em vegetação, correlacionando imagens, temperatura, umidade e dados meteorológicos.",
    equipe: 45,
    foco: [
      "Correlação entre imagens, temperatura, umidade e dados meteorológicos",
      "Sinais térmicos e eventuais indícios de fumaça",
      "Triagem humana obrigatória antes de qualquer comunicação de alerta",
      "Estudos de falsos positivos, desempenho e tempo de reconhecimento",
    ],
    resultados: [
      "Algoritmos de identificação de indícios de risco",
      "Registro e classificação de alertas",
      "Protocolo de comunicação aos órgãos competentes",
      "Análise de desempenho dos modelos",
    ],
    limites:
      "O programa não substitui o Corpo de Bombeiros, a Defesa Civil ou os órgãos ambientais competentes.",
    icone: Flame,
    tom: "ember",
  },
  {
    slug: "forestsense",
    nome: "ForestSense",
    apelido: "Rede inteligente de sensores ambientais",
    subtitulo: "Dispositivos de coleta contínua em áreas de vegetação",
    resumo:
      "Pesquisa, desenvolvimento e experimentação de dispositivos eletrônicos destinados à coleta contínua de informações ambientais em territórios com conectividade e energia limitadas.",
    equipe: 40,
    foco: [
      "Sensores de temperatura, umidade e condições meteorológicas",
      "Gateways, telemetria e dispositivos de baixo consumo energético",
      "Testes de conectividade, alimentação elétrica e transmissão de dados",
      "Resistência dos equipamentos em ambientes de vegetação",
    ],
    resultados: [
      "Rede experimental de sensoriamento ambiental",
      "Prototipos adaptados a áreas florestais",
      "Protocolos de instalação e manutenção",
      "Dados territoriais integrados aos demais núcleos",
    ],
    limites:
      "A rede é experimental e implantada progressivamente, conforme conectividade e disponibilidade de recursos.",
    icone: Radio,
    tom: "forest",
  },
  {
    slug: "dronevision",
    nome: "DroneVision",
    apelido: "Sensoriamento aéreo e geoprocessamento",
    subtitulo: "Levantamentos ambientais com aeronaves remotamente pilotadas",
    resumo:
      "Utilização experimental de aeronaves remotamente pilotadas para levantamentos ambientais, com processamento fotogramétrico e comparação temporal de áreas monitoradas.",
    equipe: 18,
    foco: [
      "Planejamento de missões e captura de imagens aéreas",
      "Processamento fotogramétrico e produção de ortomosaicos",
      "Sensores ópticos e térmicos conforme viabilidade e autorização",
      "Comparação temporal de áreas monitoradas",
    ],
    resultados: [
      "Ortomosaicos e mapas de áreas monitoradas",
      "Identificação de modificações da vegetação",
      "Complementação das informações coletadas em campo",
      "Procedimentos de operação e registro de missões",
    ],
    limites:
      "Todas as operações observam as normas aeronáuticas e as permissões de acesso territorial.",
    icone: Plane,
    tom: "sky",
  },
  {
    slug: "bioatlas",
    nome: "BioAtlas",
    apelido: "Catálogo digital de biodiversidade e áreas verdes",
    subtitulo: "Base georreferenciada de espécies e registros ambientais",
    resumo:
      "Estruturação de uma base de informações ambientais organizada geograficamente, com cadastro de árvores, espécies, unidades amostrais, áreas verdes e registros de observação.",
    equipe: 30,
    foco: [
      "Cadastro de árvores, espécies, unidades amostrais e áreas verdes",
      "Recursos cartográficos, banco de dados e identificação digital",
      "Histórico de registros e ferramentas de consulta",
      "Identificadores digitais e QR Codes onde a instalação for autorizada",
    ],
    resultados: [
      "Catálogo digital georreferenciado",
      "Inventários ambientais organizados",
      "Relatórios e análises comparativas",
      "Apoio a estudos de recuperação de áreas degradadas",
    ],
    limites:
      "A instalação de identificadores físicos depende de autorização do gestor de cada área.",
    icone: LibraryBig,
    tom: "moss",
  },
  {
    slug: "hydrosense",
    nome: "HydroSense",
    apelido: "Inteligência hidrológica e climática",
    subtitulo: "Acompanhamento de água, clima e dinâmica hidrológica",
    resumo:
      "Pesquisa sobre precipitação, umidade, condições de cursos d'água e variações ambientais, com identificação de anomalias em séries de dados e produção de indicadores.",
    equipe: 25,
    foco: [
      "Precipitação, umidade e condições de cursos d'água",
      "Equipamentos instrumentais, bases meteorológicas e observação de campo",
      "Modelos computacionais e identificação de anomalias",
      "Integração com os demais sistemas do programa",
    ],
    resultados: [
      "Séries históricas de variáveis hidrológicas",
      "Indicadores de vulnerabilidade",
      "Estudos sobre a dinâmica dos recursos hídricos",
      "Integração de dados com o NOC Ambiental",
    ],
    limites:
      "As informações produzidas apoiam estudos e decisões; não constituem boletim oficial de alerta hidrológico.",
    icone: Waves,
    tom: "sky",
  },
];

export const projetoPorSlug = (slug?: string) =>
  projetos.find((projeto) => projeto.slug === slug);
