# 🤖 AtlasAgent

A production-ready Multi-Agent AI System with RAG (Retrieval-Augmented Generation), featuring intelligent orchestration, code generation, Gmail integration, and support for multiple LLM providers.

## ✨ Features

- 🤖 **Multi-Agent Orchestration** - Intelligent routing between specialized agents
- 📚 **RAG System** - Document upload, chunking, and semantic search
- 💻 **Code Generation & Review** - AI-powered code generator and critic
- 📧 **Gmail Integration** - Email summarization and management
- 🌐 **Multiple LLM Providers** - OpenAI, Anthropic, Google, Ollama support
- 🎨 **Modern React Frontend** - Beautiful UI with real-time agent monitoring
- 🔐 **Authentication** - Google OAuth & local auth with JWT
- 🐳 **Docker Ready** - Easy deployment with Docker Compose
- 👤 **Guest Mode** - Try it without sign-up

## 🚀 Quick Start

### Prerequisites

- Python 3.9+
- Node.js 16+
- Redis (optional, for caching)
- PostgreSQL (optional, for persistent storage)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/ShubhXDev3200/AtlasAgent.git
cd AtlasAgent
```

2. **Set up environment variables**
```bash
cp .env.example .env
# Edit .env with your API keys
```

3. **Install dependencies**
```bash
# Backend
pip install -r requirements.txt

# Frontend
cd frontend
npm install
cd ..
```

4. **Start the application**
```bash
# Using the convenience scripts
./start.sh      # Starts both backend and frontend
```

5. **Access the application**
Open your browser and navigate to: **http://localhost:5173**

## 🎯 Simple Commands

| Command | Description |
|---------|-------------|
| `./start.sh` | Start both backend and frontend |
| `./stop.sh` | Stop all services |
| `./status.sh` | Check service status |
| `./restart.sh` | Restart all services |

## 🔧 Configuration

### LLM Provider Setup

AtlasAgent supports multiple LLM providers. Configure in your `.env` file:

```bash
# Choose your provider: openai, anthropic, google, ollama, openrouter
LLM_PROVIDER=openai
LLM_MODEL=gpt-4
LLM_API_KEY=your-api-key-here

# Provider-specific settings
LLM_BASE_URL=https://api.openai.com/v1  # Optional
LLM_TEMPERATURE=0
LLM_MAX_TOKENS=4096
```

### Database Configuration (Optional)

```bash
# PostgreSQL for persistent storage
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_DB=atlas_agent
POSTGRES_USER=postgres
POSTGRES_PASSWORD=your-password

# Redis for caching
REDIS_HOST=localhost
REDIS_PORT=6379
```

### Gmail Integration (Optional)

1. Create a Google Cloud project
2. Enable Gmail API
3. Download `credentials.json` and place in project root
4. Set `GMAIL_ENABLED=true` in `.env`

## 📁 Project Structure

```
AtlasAgent/
├── agents/              # AI agent implementations
│   ├── orchestrator.py  # Main agent orchestrator
│   ├── code_generator.py
│   ├── code_critic.py
│   ├── gmail_agent.py
│   └── rag_agent.py
├── api/                 # FastAPI routes
├── config/              # Configuration settings
├── frontend/            # React frontend
│   ├── src/
│   │   ├── components/  # UI components
│   │   ├── pages/       # Page components
│   │   └── store/       # State management
├── llm_provider/        # Multi-provider LLM abstraction
├── memory/              # Redis & PostgreSQL memory
├── rag/                 # RAG implementation
│   ├── chunking.py      # Document processing
│   ├── embeddings.py    # Vector embeddings
│   └── vector_store.py  # ChromaDB integration
├── schemas/             # Pydantic models
├── tools/               # Agent tools
│   ├── code_context.py
│   ├── code_pipeline.py
│   ├── gmail_tools.py
│   ├── retriever.py
│   └── web_search.py
├── app.py               # Main FastAPI application
├── requirements.txt     # Python dependencies
└── docker-compose.yml   # Docker configuration
```

## 🔑 Key Components

### Agents

- **Orchestrator** - Routes queries to appropriate agents using LangGraph
- **RAG Agent** - Semantic search across uploaded documents
- **Code Generator** - Generates code from natural language
- **Code Critic** - Reviews and improves generated code
- **Gmail Agent** - Manages and summarizes emails

### Tools

- **Web Search** - DuckDuckGo integration for web queries
- **Document Retriever** - ChromaDB vector store search
- **Code Pipeline** - Automated code generation and review
- **Gmail Tools** - Email fetching and processing

## 🐳 Docker Deployment

```bash
# Build and start with Docker Compose
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

## 🧪 Testing

```bash
# Test Redis connection
python -c "from memory.redis_memory import save_message; print('Redis OK')"

# Test PostgreSQL connection
python -c "from memory.postgres_memory import get_connection; print('PostgreSQL OK')"

# Run the application in development mode
uvicorn app:app --reload
```

## 📚 API Documentation

Once the backend is running, visit:
- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

### Main Endpoints

- `POST /api/v1/chat` - Chat with AI agents
- `POST /api/v1/upload` - Upload documents for RAG
- `POST /api/v1/rag/query` - Query uploaded documents
- `POST /api/v1/code/generate` - Generate code
- `POST /api/v1/code/critic` - Review code
- `GET /api/v1/gmail/list` - List emails
- `POST /api/v1/auth/signup` - Create account
- `POST /api/v1/auth/login` - Login

## 🎨 Frontend Features

- **Modern UI** - Built with React, TailwindCSS, and Framer Motion
- **Real-time Updates** - Agent status and topology visualization
- **Dark Mode** - Beautiful dark theme
- **Responsive** - Works on all devices
- **Interactive Canvas** - Agent network visualization

## 🔐 Security

- JWT-based authentication
- Password hashing with secure algorithms
- Environment variable configuration
- CORS protection
- OAuth2 integration for Google login

## 📝 Environment Variables

See `.env.example` for all available configuration options:

```bash
# Application
APP_NAME=AtlasAgent
DEBUG=false
SECRET_KEY=your-secret-key

# LLM Provider
LLM_PROVIDER=openai
LLM_API_KEY=your-api-key

# Database (Optional)
POSTGRES_HOST=localhost
REDIS_HOST=localhost

# Gmail (Optional)
GMAIL_ENABLED=false

# Authentication
JWT_SECRET=your-jwt-secret
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the MIT License.

## 🆘 Troubleshooting

### Backend won't start
```bash
# Check logs
tail -f backend.log

# Verify dependencies
pip install -r requirements.txt
```

### Frontend won't start
```bash
# Check logs
tail -f frontend.log

# Reinstall dependencies
cd frontend && npm install
```

### Services not stopping
```bash
# Force kill all services
./stop.sh
```

### Database connection issues
- Ensure PostgreSQL/Redis are running
- Check connection strings in `.env`
- Try using Docker Compose for automatic setup

## 💡 Tips

- Start with **Guest Mode** to try without setup
- Use **OpenAI GPT-3.5** for cost-effective testing
- Try **Ollama** for completely free, local LLMs
- Enable **PostgreSQL** for conversation history
- Enable **Gmail** for email agent features

## 📞 Support

For issues and questions:
- Open an issue on GitHub
- Check existing documentation in the project

---

**Made with ❤️ for the AI community**
