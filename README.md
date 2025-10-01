# test_tech_nary

## Prérequis

- **Node.js** >= v22.16.0 et **npm**
- **React** >= 19.1.0
- **Next.js** >= 15.5.4
- **Python** >= 3.11.8
- **FastAPI** >= 0.118.0
- **Git**
- Un terminal (Windows PowerShell ou Git Bash)
- *(Optionnel)* Environnement virtuel Python (`venv`)

---

## Installation

### 1. Frontend (Next.js)

```bash
cd frontend
npm install
```

### 2. Backend (FastAPI)

```bash
cd python-service
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
```

---

## Lancement des services

### Frontend

```bash
cd frontend
npm run dev
```

### Backend

```bash
cd python-service
uvicorn main:app --reload --port 8001
```

---

## Variables d’environnement

Aucune variable obligatoire.

Pour changer les ports :

- **Frontend** : `.env.local` → `PORT=3000`
- **Backend** : paramètre `--port` dans uvicorn ou `.env` avec `PORT=8001`

---

## Choix techniques

- **Frontend** : Next.js (React) avec API routes pour proxy éventuel vers le micro-service.
- **Backend** : FastAPI pour le micro-service chatbot.
- **Matching** : recherche par mot-clé dans un fichier `faq.json` local (données petites et structurées).
- **Logs** : affichage minimal dans la console (timestamp, question, réponse).
- **Organisation** :
  - Frontend dans `/frontend`
  - Backend dans `/python-service`
  - FAQ locale (`faq.json`) dans la racine de `python-service`
  - Articles (`articles.json`) dans la racine de `frontend`
- **UI/UX** : Bootstrap et CSS pour un design simple et populaire.
- **CSS** : Utilisation de `.module.css` pour éviter les conflits entre composants.
- **API** : Liaison entre Next.js (frontend) et FastAPI (backend) pour le chatbot.

---

## Limites et pistes d’amélioration

- **Matching** : Simple par mot-clé, améliorable avec TF-IDF ou embeddings pour une recherche plus intelligente. Il est préferable aussi de bien structurer et choisir les données pour avoir une meilleur performances dans l'avenir.
- **FAQ** : Statique, pas de base de données. Bien structurer les questions pour éviter les confusions.
- **UI du chatbot** : Minimaliste, possibilité d’ajouter historique, loader, meilleure mise en page.
- **Sessions** : Pas de gestion, tout est stateless.
- **Sécurité** : Améliorer la sécurité des appels API et mieux séparer les couches.
- **Design** : Ajouter header, footer, polices cohérentes avec le thème.
- **Accessibilité** : Améliorer l’accessibilité et l’expérience utilisateur.
- **Langues** : Ajouter la gestion multilingue.
- **Chargement** : Ajouter un indicateur pendant le traitement du bot.
- **Messages** : Permettre le pliage/dépliage automatique pour éviter des bulles trop larges.
- **Historique** : Gérer et sauvegarder l’historique des conversations pour économiser des ressources.

---

## Structure des fichiers

- `/frontend` : Application Next.js (React)
  - `articles.json` : Stockage des articles
- `/python-service` : Micro-service FastAPI
  - `faq.json` : Base de connaissances du chatbot

---

