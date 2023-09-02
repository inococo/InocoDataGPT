<p align="center">
  <img src="https://github.com/inococo/InocoDataGPT/blob/main/public/InocoDataGPT.png" height="200"/>
</p>
<p align="center">
  <em>🤖 AI assistant for data analytics, data engineering, and machine learning. 🤖</em>
</p>

<p align="center">
<a href="https://datagpt.inoco.ai">🔗 Short link</a>
<span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>
<a href="https://twitter.com/luhuihu">🐦 Twitter</a>
</p>

---

</div>

---

InocoDataGPT is an AI assistant for data analytics, data engineering, and machine learning. 🚀.

## 🎉 Roadmap

This platform is currently in alpha, we are currently working on:

- Long term memory via a vector DB 🧠
- Web browsing capabilities via LangChain 🌐
- Interaction with websites and people 👨‍👩‍👦
- Writing capabilities via a document API 📄
- Saving run sessions 💾
- Users and authentication 🔐

More Coming soon...

## 🚀 Tech Stack

- ✅ **Bootstrapping**: [create-t3-app](https://create.t3.gg).
- ✅ **Framework**: [Nextjs 13 + Typescript](https://nextjs.org/).
- ✅ **Auth**: [Next-Auth.js](https://next-auth.js.org)
- ✅ **ORM**: [Prisma](https://prisma.io).
- ✅ **Database**: [Supabase](https://supabase.com/).
- ✅ **Styling**: [TailwindCSS + HeadlessUI](https://tailwindcss.com).
- ✅ **Typescript Schema Validation**: [Zod](https://github.com/colinhacks/zod).
- ✅ **End-to-end typesafe API**: [tRPC](https://trpc.io/).

## 👨‍🚀 Getting Started

### 🐳 Docker Setup

The easiest way to run InocoDataGPT locally is by using docker.
A convenient setup script is provided to help you get started.

```bash
./setup.sh --docker
```

### 👷 Local Development Setup

If you wish to develop InocoDataGPT locally, the easiest way is to
use the provided setup script.

```bash
./setup.sh --local
```

### 🛠️ Manual Setup

> 🚧 You will need [Nodejs +18 (LTS recommended)](https://nodejs.org/en/) installed.

1. Clone the repository:

```bash
git clone git@github.com:inococo/InocoDataGPT.git
```

2. Install dependencies:

```bash
cd InocoDataGPT
npm install
```

3. Create a **.env** file with the following content:

> 🚧 The environment variables must match the following [schema](https://github.com/inococo/InocoDataGPT/blob/main/src/env/schema.mjs).

```bash
# Deployment Environment:
NODE_ENV=development

# Next Auth config:
# Generate a secret with `openssl rand -base64 32`
NEXTAUTH_SECRET=changeme
NEXTAUTH_URL=http://localhost:3000
DATABASE_URL=file:./db.sqlite

# Your open api key
OPENAI_API_KEY=changeme

# Snowflake account info
SNOWFLAKE_ACCOUNT=changeme
SNOWFLAKE_USERNAME=changeme
SNOWFLAKE_PASSWORD=changeme
SNOWFLAKE_REGION=changeme
SNOWFLAKE_WAREHOUSE=changeme
SNOWFLAKE_DATABASE=changeme
SNOWFLAK