# AtlasAgent

AtlasAgent is a production-ready multi-agent AI system built with FastAPI and React. It combines intelligent agent orchestration, retrieval-augmented generation (RAG), code generation and review, Gmail integration, and support for multiple LLM providers through a unified abstraction layer.

---

## Features

- **Multi-Agent Orchestration** — LangGraph-powered routing between specialized agents
- **RAG Pipeline** — Document ingestion, chunking, vector storage, and semantic retrieval via ChromaDB
- **Code Generation and Review** — Automated code generation with an integrated critic agent for quality assurance
- **Gmail Integration** — OAuth-authenticated email fetching and AI-generated summaries
- **Multi-Provider LLM Support** — Unified interface for OpenAI, Anthropic, Google Gemini, Ollama, and OpenRouter
- **React Frontend** — Responsive UI with real-time agent topology visualization
- **Authentication** — JWT-based local auth and Google OAuth2
- **Docker Support** — Full Compose configuration for containerized deployment
- **Guest Mode** — Unauthenticated access for quick evaluation

---

## Prerequisites

- Python 3.9 or higher
- Node.js 16 or higher
- Redis (optional — used for message history caching)
- PostgreSQL (optional — used for persistent user and token storage)

---

## Installation

**1. Clone the repository**

```bash
git clone https://github.com/ShubhXDev3200/AtlasAgent.git
cd AtlasAgent
```

**2. Configure environment variables**

```bash
cp .env.example .env
```

Edit `.env` with your API keys and configuration values.

**3. Install backend dependencies**

```bash
pip install -r requirements.txt
```

**4. Install frontend dependencies**

```bash
cd frontend
npm install
cd ..
```

**5. Start the application**

```bash
./start.sh
```

The frontend will be available at `http://localhost:5173` and the backend API at `http://localhost:8000`.

---

## Service Management

| Command | Description |
|---|---|
| `./start.sh` | Start both backend and frontend |
| `./stop.sh` | Stop all running services |
| `./status.sh` | Display current service status |
| `./restart.sh` | Restart all services |

**Log files:**

```bash
tail -f backend.log   # Backend application logs
tail -f frontend.log  # Frontend build/dev server logs
```

---

## Configuration

### LLM Provider

Set the following variables in your `.env` file:

```bash
LLM_PROVIDER=openai          # openai | anthropic | google | ollama | openrouter
LLM_MODEL=gpt-4
LLM_API_KEY=your-api-key
LLM_BASE_URL=                # Optional — override the provider base URL
LLM_TEMPERATURE=0
LLM_MAX_TOKENS=4096
```

### Database

```bash
# PostgreSQL
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_DB=atlas_agent
POSTGRES_USER=postgres
POSTGRES_PASSWORD=your-password

# Redis
REDIS_HOST=localhost
REDIS_PORT=6379
```

### Gmail Integration

1. Create a project in the [Google Cloud Console](https://console.cloud.google.com/)
2. Enable the Gmail API and configure OAuth2 credentials
3. Download `credentials.json` and place it in the project root
4. Set `GMAIL_WEB_CLIENT_ID`, `GMAIL_WEB_CLIENT_SECRET`, and `GMAIL_REDIRECT_URI` in `.env`

### Application

```bash
APP_NAME=AtlasAgent
DEBUG=false
SECRET_KEY=your-secret-key
JWT_SECRET_KEY=your-jwt-secret
```

For a full list of supported variables, refer to `.env.example`.

---

## Project Structure

```
AtlasAgent/
├── agents/
│   ├── orchestrator.py      # LangGraph-based agent router
│   ├── code_generator.py    # Code generation agent
│   ├── code_critic.py       # Code review and validation agent
│   ├── gmail_agent.py       # Gmail summarization agent
│   └── rag_agent.py         # RAG query agent
├── api/
│   └── routes.py            # All FastAPI route definitions
├── config/
│   └── settings.py          # Pydantic settings and LLM config detection
├── llm_provider/
│   ├── base_provider.py     # Abstract provider interface
│   ├── provider_factory.py  # Provider instantiation logic
│   ├── llm_initializer.py   # Convenience wrapper for model loading
│   ├── openai_provider.py
│   ├── anthropic_provider.py
│   ├── google_provider.py
│   └── ollama_provider.py
├── memory/
│   ├── memory_manager.py    # Unified memory interface
│   ├── redis_memory.py      # Redis-backed message history
│   └── postgres_memory.py   # PostgreSQL-backed user and token storage
├── rag/
│   ├── chunking.py          # Document parsing and chunking
│   ├── embeddings.py        # Embedding model configuration
│   └── vector_store.py      # ChromaDB vector store operations
├── schemas/
│   └── request_models.py    # Pydantic request and response models
├── tools/
│   ├── code_context.py      # RAG-based code context retrieval tool
│   ├── code_pipeline.py     # End-to-end code generation pipeline tool
│   ├── gmail_tools.py       # Gmail API interaction utilities
│   ├── retriever.py         # Document retriever LangChain tool
│   └── web_search.py        # DuckDuckGo search tool
├── frontend/
│   └── src/
│       ├── components/      # Reusable UI components
│       ├── pages/           # Route-level page components
│       ├── store/           # Zustand state management
│       └── hooks/           # Custom React hooks
├── app.py                   # FastAPI application entry point
├── requirements.txt
├── Dockerfile
└── docker-compose.yml
```

---

## API Reference

Interactive documentation is available at runtime:

- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

### Core Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/v1/health` | Health check |
| GET | `/api/v1/config/llm` | Active LLM configuration |
| POST | `/api/v1/chat` | Send a message to the orchestrator |
| POST | `/api/v1/upload` | Upload a document for ingestion |
| POST | `/api/v1/rag/query` | Query the knowledge base |
| GET | `/api/v1/rag/documents` | List ingested documents |
| DELETE | `/api/v1/rag/documents` | Clear the knowledge base |
| POST | `/api/v1/code/generate` | Generate code from a natural language prompt |
| POST | `/api/v1/code/critic` | Review and validate generated code |
| GET | `/api/v1/gmail/list` | List inbox emails |
| GET | `/api/v1/gmail/get/{msg_id}` | Retrieve a single email |
| POST | `/api/v1/gmail/summarize` | Summarize selected emails |
| POST | `/api/v1/auth/signup` | Register a new user |
| POST | `/api/v1/auth/login` | Authenticate and receive a JWT |
| POST | `/api/v1/auth/google` | Google OAuth2 sign-in |
| GET | `/api/v1/agents/status` | Status of all agents and services |

---

## Docker Deployment

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop all services
docker-compose down
```

---

## Architecture Overview

```
Client Request
      |
  FastAPI (api/routes.py)
      |
  Agent Orchestrator (LangGraph)
      |
  +---+---+---+---+
  |       |       |
RAG   Code   Gmail
Agent Pipeline  Agent
  |       |       |
ChromaDB  LLM   Gmail API
  
All agents use:
  get_llm_model() -> LLMProviderFactory -> Provider Instance
  config/settings.py -> .env
```

---

## Security

- Passwords are hashed using PBKDF2-HMAC-SHA256 with a random salt
- JWT tokens are signed with a configurable secret key and expire after 7 days
- Gmail credentials are stored per-user in PostgreSQL and refreshed automatically
- CORS is configurable via environment variables
- Sensitive configuration is loaded exclusively from environment variables

---

## Troubleshooting

**Backend fails to start**

Verify all required environment variables are set in `.env` and dependencies are installed:
```bash
pip install -r requirements.txt
uvicorn app:app --reload
```

**Frontend fails to start**

```bash
cd frontend
npm install
npm run dev
```

**Database connection errors**

Ensure PostgreSQL and Redis are running and accessible with the credentials in `.env`. Using `docker-compose up -d` is the easiest way to bring up both services.

**LLM errors**

Verify that `LLM_API_KEY` is valid for the configured `LLM_PROVIDER`. Use `GET /api/v1/config/llm` to confirm what the backend has detected.

---

## Contributing

Pull requests are welcome. For significant changes, please open an issue first to discuss the proposed change.

---

## License

This project is licensed under the MIT License.
