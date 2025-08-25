# CLAUDE.md

This file provides persistent memory and guidance to Claude Code (claude.ai/code) when working in this repository.

## 🎯 Core Development Principles

### KISS (Keep It Simple, Stupid)
- Prefer simple, readable solutions over clever complexity
- If a solution requires extensive explanation, it's probably too complex
- Break complex problems into simple, composable parts

### YAGNI (You Aren't Gonna Need It)
- Don't add functionality until it's actually needed
- Avoid premature optimization and over-engineering
- Focus on current requirements, not hypothetical future needs

### SOLID Principles
- **Single Responsibility**: Each module/function should do one thing well
- **Open/Closed**: Open for extension, closed for modification
- **Liskov Substitution**: Derived classes must be substitutable for base classes
- **Interface Segregation**: Many specific interfaces > one general interface
- **Dependency Inversion**: Depend on abstractions, not concretions

## 🚀 Context Optimization Strategy

### Primary Goal: Maximize Conversation Length
**Target**: Reduce main context usage by 70-90% through intelligent delegation

### The Context Optimization Hierarchy:
1. **MCP Servers** (Best - Zero context cost)
2. **Agent Delegation** (Good - Minimal context)
3. **Direct Processing** (Avoid - Maximum context)

### How to Preserve Context:
1. **ALWAYS delegate specialized work to agents** - This is non-negotiable
2. **Batch related operations** in single agent calls
3. **Use specific, focused prompts** to agents
4. **Avoid copying large code blocks** back to main conversation
5. **Summarize agent results** instead of displaying full output

### Context Usage Guidelines:
- ✅ **DO**: Delegate, summarize, reference file:line
- ❌ **DON'T**: Copy full code, repeat agent output verbatim, handle specialized tasks directly

## 🔌 MCP Server Strategy

### What are MCP Servers?
Model Context Protocol servers extend Claude's capabilities without consuming conversation context. They provide direct access to external tools, APIs, and services.

### Available MCP Servers
*Run `claude mcp list` to check current status*

#### Development & Analysis
- **zen**: Advanced AI-powered analysis tools
  - `thinkdeep`, `debug`, `consensus` - Complex problem solving
  - `analyze`, `refactor`, `tracer` - Code analysis
  - Use for: Deep technical problems requiring multi-step reasoning

#### Project Management
- **atlassian**: Confluence & Jira integration
  - Read/write docs, manage issues
  - Use for: Documentation, issue tracking
  
- **graphite**: Advanced Git stacking workflow
  - Stack PRs, manage dependencies
  - Use for: Complex multi-PR features

#### External Integrations
  
- **playwright**: Browser automation
  - Web testing, scraping, automation
  - Use for: E2E testing, web interactions

- **context7**: Library documentation
  - Up-to-date docs for any library
  - Use for: Learning new APIs, checking latest syntax

- **taskmaster-ai**: AI-powered task management
  - Parse PRDs, manage tasks, expand subtasks
  - Use for: Project planning, task tracking, PRD analysis

#### Data & Infrastructure
- **redis**: Redis database operations
  - Direct Redis commands and management
  - Use for: Cache operations, session management
  
- **ide**: VS Code integration (if available)
  - Get diagnostics, execute code
  - Use for: Real-time code feedback

### MCP Server Discovery & Adaptation
**IMPORTANT**: MCP servers are dynamically configured and may change. Always:
1. Run `claude mcp list` at session start to discover available servers
2. Check for new MCP capabilities before delegating to agents
3. Prioritize MCP servers over agents when both can handle a task (zero context cost)

### Adding New MCP Servers
MCP servers can be added at any time. When new servers appear:
- They automatically extend capabilities
- Zero impact on context usage
- May replace need for certain agent delegations
- Should be preferred over in-conversation processing

Common MCP server categories to watch for:
- **Database Operations**: PostgreSQL, MongoDB, DynamoDB
- **Cloud Providers**: AWS, GCP, Azure specific tools
- **Monitoring**: Datadog, Grafana, Prometheus
- **CI/CD**: Jenkins, GitHub Actions, CircleCI
- **Communication**: Slack, Discord, Email
- **Custom Internal Tools**: Company-specific APIs

### MCP vs Agent Delegation Strategy

#### Use MCP Servers When:
- **External data needed**: Documentation, web content, API data
- **Tool functionality required**: Browser automation, Git operations
- **Complex reasoning needed**: zen's thinkdeep for architecture decisions
- **Project management**: TaskMaster for organizing work

#### Use Agent Delegation When:
- **Writing code**: Language-specific implementation
- **Code review**: Quality assessment
- **Architecture design**: System design decisions
- **Testing**: Test creation and strategy

### Context Optimization with MCP:
1. MCP servers run externally - zero context cost
2. Can handle large operations without affecting conversation
3. Results can be summarized before returning
4. Combine with agents for maximum efficiency

### Example MCP + Agent Workflow:
```
1. Use context7 MCP to fetch library docs (no context cost)
2. Use taskmaster MCP to create task list (no context cost)
3. Delegate implementation to golang-pro agent (minimal context)
4. Use zen MCP for complex debugging if needed (no context cost)
5. Summarize all results in main conversation (minimal context)
```

## 🤖 Specialized Agent Delegation (MANDATORY)

### Critical Delegation Rules:
1. **Language-specific work MUST be delegated**
2. **Check agent availability before starting tasks**
3. **Multiple agents can work in parallel**
4. **Agent results should be summarized, not copied**
5. **Combine with MCP servers for maximum context efficiency**

### Core Development Agents

#### Language Specialists (Use for ALL language-specific work)
- **golang-pro**: ALL Go code, gRPC, concurrency patterns
- **typescript-pro**: TypeScript, type systems, async patterns
- **python-pro**: Python code, data processing, scripting
- **rust-pro**: Rust code, memory safety, systems programming
- **java-pro**: Java/Spring, enterprise patterns
- **cpp-pro**: C++ code, performance optimization

#### Architecture & Design
- **backend-architect**: API design, microservices, system design
- **frontend-developer**: React, Next.js, UI components
- **cloud-architect**: AWS/GCP/Azure patterns, serverless
- **database-optimizer**: SQL optimization, schema design, migrations
- **terraform-specialist**: IaC, infrastructure automation

#### Quality & Operations
- **test-automator**: Test strategy, test creation, coverage
- **code-reviewer**: Code quality review (use after implementation)
- **debugger**: Bug investigation, error analysis
- **performance-engineer**: Optimization, profiling, bottlenecks
- **security-auditor**: Security review, vulnerability assessment

#### Documentation & Analysis
- **docs-architect**: Technical documentation, API docs
- **legacy-modernizer**: Refactoring legacy code
- **architect-reviewer**: Architecture consistency

### Delegation Workflow Example:
```
User: "Add a new gRPC endpoint to the fleet service"
Claude: "I'll delegate this Go/gRPC work to the golang-pro agent to minimize context usage..."
[Task tool → golang-pro agent]
Claude: "The golang-pro agent has successfully added the endpoint with proper error handling and tests at internal/grpc/handlers/new_endpoint.go:45"
```

## 🛠️ Quick Reference Commands

### Fleet Service (Go)
```bash
cd nexus-fleet-service
make build               # Build service
make test                # Run all tests
make demo                # Run automated demo
make run-local           # Run locally
```

### Backend (TypeScript/AdonisJS)
```bash
cd nexus-be
npm run dev              # Start dev server
npm test                 # Run unit tests
npm run systest          # Run system tests
npm run lint             # Run ESLint
make bootstrap           # Complete setup
```

### Frontend (Next.js/React)
```bash
cd nexus-fe
npm run dev              # Start on port 3000
npm run build            # Production build
npm test                 # Run tests
npm run lint             # Run ESLint
```

### Component Library
```bash
cd qumulo-component-library
npm run storybook        # Start Storybook on 6006
npm run build            # Build library
npm run co:login         # AWS CodeArtifact login
```

## 🏗️ Architecture Patterns

### System Communication Flow
```
User → Nexus FE → Nexus BE → Fleet Service → Clusters
                      ↓            ↓
                  PostgreSQL     Redis
```

### Authentication Strategy
- Frontend: Auth0 JWT
- Backend: Dual auth (JWT + API tokens)
- Fleet Service: TLS mutual auth
- AWS: IAM roles

### Database Architecture
- PostgreSQL: Primary data (main + event service)
- Redis: Session cache, connection state
- Timestream: Time-series metrics
- S3: Long-term archival

### Testing Philosophy
- Unit tests: Co-located *.spec.ts files
- Integration: tests/systests/ directory
- Factory pattern for test data
- Minimum 80% coverage target

## 📝 Development Workflow

### Before Starting Any Task:
1. Identify the service/language involved
2. Select appropriate specialized agent(s)
3. Create todo list for task tracking
4. Delegate work to minimize context usage

### After Implementation:
1. Run linting (npm run lint / make lint)
2. Run tests (npm test / make test)
3. Use code-reviewer agent
4. Update documentation if needed

### Git Commit Standards:
- Use conventional commits (feat:, fix:, docs:, etc.)
- Keep commits atomic and focused
- Reference issue numbers when applicable

## ⚡ Performance Guidelines

### Context Preservation Tips:
- Summarize long outputs to 2-3 key points
- Reference code locations as file:line instead of copying
- Batch multiple related changes in one agent call
- Use focused, specific prompts to agents
- Close conversations before context gets too large

### Working with Large Codebases:
- Use Grep/Glob tools for initial exploration
- Delegate deep analysis to specialized agents
- Keep main conversation focused on coordination
- Summarize findings instead of displaying full code

## 🔒 Security & Best Practices

### Never:
- Commit secrets or API keys
- Log sensitive data
- Bypass authentication
- Disable security features
- Use deprecated dependencies

### Always:
- Validate all inputs
- Use parameterized queries
- Follow OWASP guidelines
- Keep dependencies updated
- Use environment variables for config

## 📊 Metrics & Monitoring

### Key Metrics to Track:
- API response times < 200ms
- gRPC stream stability > 99.9%
- Redis connection pool utilization
- Lambda cold start frequency
- Database connection pool health

## 🎮 Local Development Setup

### Prerequisites:
1. Redis running locally
2. PostgreSQL with migrations
3. AWS credentials configured
4. Node.js 18+ installed
5. Go 1.21+ installed

### Quick Start:
```bash
# Backend
cd nexus-be && make bootstrap

# Frontend
cd nexus-fe && npm install && npm run dev

# Fleet Service
cd nexus-fleet-service && make run-local
```

## 💡 Remember

1. **Delegate aggressively** - Every specialized task to appropriate agent
2. **Preserve context** - Summarize, don't copy
3. **Follow patterns** - Consistency over creativity
4. **Test everything** - No code without tests
5. **Keep it simple** - KISS, YAGNI, SOLID

---
*Last Updated: 2025*
*Context Optimization Version: 2.0*