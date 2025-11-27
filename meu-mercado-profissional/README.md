# Meu Mercado - Profissional (Fullstack)

Conteúdo:
- backend/  -> Node.js + Express + SQLite + JWT + Multer (uploads)
- frontend/ -> HTML/CSS/JS (Bootstrap) consumindo a API
- docker-compose.yml -> levanta backend facilmente

## Instruções rápidas

1. Rodar com Node (local dev)
- Backend:
  ```bash
  cd backend
  npm install
  npm run migrate
  npm run dev
  ```
  API ficará em http://localhost:4000

- Frontend:
  Abra a pasta `frontend` no VSCode e use Live Server ou abra `index.html` diretamente no navegador.
  O frontend espera a API em http://localhost:4000 (configurado para detectar localhost).

2. Rodar com Docker (recomendado para produção simples)
  ```bash
  docker-compose up --build
  ```
  Backend disponível em http://localhost:4000

## Credenciais iniciais (seed)
- admin / admin123

## Funcionalidades implementadas
- Autenticação (JWT) para rotas administrativas
- CRUD completo de produtos (create/update/delete protegidos)
- Upload de imagens (`/api/uploads`)
- Pedidos simples (tabela orders) e painel admin para visualizar pedidos
- Frontend com listagem, página de produto, carrinho (localStorage) e checkout que cria pedido
- Dockerfile + docker-compose para backend

---
Se desejar, eu posso agora:
1) Gerar o ZIP para download pronto para abrir no VSCode.
2) Adicionar integração com MercadoPago / PagSeguro (posso adicionar stubs ou integração real - precisarei das chaves).
3) Converter frontend para React/Next.js ou criar CI/CD (GitHub Actions) e deploy scripts.
