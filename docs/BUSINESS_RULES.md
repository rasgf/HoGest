# DIRETRIZES DE NEGÓCIO: HOTGEST (SaaS para Hotelaria)

## 1. O Problema Central (Nossa Alavanca)
A gestão de luxo está perdendo centenas de milhares de reais (ex: >R$ 100k sementrais em desvios de estoque) e sofrendo com lentidão operacional extrema (chamados críticos levando 5,79 dias) devido ao uso do **TOTVS**.
* O TOTVS possui uma interface de 1998 (Windows Forms), exigindo dezenas de cliques confusos (Movimentação > Ordem de Serviço > Operador x OS) para uma simples tarefa.
* A fricção gera abandono: Funcionários não abrem OS ou não dão baixa em estoque porque o sistema é "tenebroso". 

## 2. A Nossa Solução (Proposta de Valor)
Nós não somos "mais um sistema de gestão". Nós somos um **Sistema de Estancamento de Perdas (Revenue Leakage)** disfarçado de MMS (Maintenance Management System) e Controle de Estoque.
* **Foco:** Eliminar a barreira de Usabilidade (UX).
* **Mantra de Engenharia:** "Se levar mais de 3 cliques num celular para abrir ou fechar uma OS, nós falhamos."
* **Relatórios Nativos:** O que o cliente precisava fazer como ETL no Alteryx e jogar no Tableau, nós damos em um Dashboard nativo em tempo real.

## 3. Arquitetura e Estratégia de Desenvolvimento (Tech)
* **Mobile-First:** A camareira, garçom ou recepcionista não senta num PC. O sistema de OS precisa ser um Web App que parece nativo no celular.
* **Multi-Tenant Desde o Dia 1:** O núcleo será construído para escalar. Os hotéis de luxo rodarão na mesma arquitetura de banco de dados (tenant_id).
* **Nenhum "Frankenstein":** Não faremos customização pesada por cliente. Resolvemos dores genéricas de hotelaria (Estoque, Manutenção, Limpeza) através de configurações e feature flags no mesmo código.

## 4. Estratégia de Precificação Física (Go-To-Market)
Diferente da ideia original de um SaaS de R$ 97/mês, estamos cobrindo um buraco de R$ 200 mil reais/ano.
O nosso preço deve refletir a economia gerada. Preços SaaS Enterprise (Ex: Setup Fee alto + Mensalidade entre R$ 2k a R$ 5k para hotéis boutique, dependendo do número de quartos).
