# Selfinder — Interactive Story Engine

### Django + Flask Final Project (EPITA)

Selfinder is an interactive narrative platform inspired by **Choose Your Own Adventure** books.

Instead of classic adventure stories, the experience explores **13 symbolic levels of vibration**, representing different emotional and psychological states.
Players navigate through branching story paths that encourage reflection, intuition, and self-exploration.

The system allows:

* authors to design branching narrative trees
* players to explore stories and reach different endings
* automatic tracking of progression and outcomes
* statistics and (later) community feedback

This project follows the **NAHB architecture requirements** while applying a more personal and experiential theme.

---

## 🏗 Architecture (mandatory separation)

The application is intentionally split into **two independent services**.

### 🔹 Flask — Story Content API

Responsible only for narrative data:

* stories
* pages (scenes)
* choices (branches)

Returns **JSON only**.

No UI, no gameplay logic.

---

### 🔹 Django — Game Engine & Web App

Responsible for:

* user interface
* gameplay flow
* session tracking
* statistics
* authentication & permissions
* community features (ratings/comments)

Django consumes the Flask API to display and play stories.

---

## 🎯 Separation of responsibilities

| Responsibility   | Flask | Django |
| ---------------- | ----- | ------ |
| Story storage    | ✅     | ❌      |
| Gameplay logic   | ❌     | ✅      |
| Tracking & stats | ❌     | ✅      |
| Authentication   | ❌     | ✅      |
| UI               | ❌     | ✅      |

This enforces clean **separation of concerns**.

---

## 🧩 Design decisions & patterns

To keep the system maintainable and modular:

* **Adapter pattern**
  `StoryAPIClient` wraps all Flask API calls
  → Django never directly depends on raw HTTP logic

* **Service layer**
  Gameplay logic separated from views
  → easier testing and extension

* **Repository abstraction (optional)**
  DB queries isolated from business logic

This structure makes the project easier to scale and respects software engineering best practices.

---

## 🌿 Concept — “Levels of Vibration”

Instead of traditional adventure stories, Selfinder uses a symbolic progression model:

* each story represents a journey
* each page represents a mental/emotional state
* choices represent different perspectives or actions
* endings correspond to different outcomes or realizations

This creates a reflective experience rather than a competitive game.

Technically, it still behaves exactly like a branching story engine.

---

## 📁 Project structure

```
levels/
│
├── backend/
│   ├── django_api/
│   ├── flask_api/
│   └── requirements.txt
│
├── frontend/
└── README.md
```

---

## ⚙️ Installation

### Create virtual environment

```
cd backend
python -m venv .venv
source .venv/bin/activate
```

### Install dependencies

```
pip install -r requirements.txt
```

---

## 🚀 Running the project

### Start Flask API

```
cd backend/flask_api
python run.py
```

Runs on:

```
http://localhost:5000
```

---

### Start Django Web App

```
cd backend/django_api/nahb_web
python manage.py migrate
python manage.py runserver
```

Runs on:

```
http://localhost:8000
```

---

## 📡 Core API endpoints

Reading:

* GET /stories?status=published
* GET /stories/<id>
* GET /stories/<id>/start
* GET /pages/<id>

Writing:

* POST /stories
* PUT /stories/<id>
* DELETE /stories/<id>
* POST /stories/<id>/pages
* POST /pages/<id>/choices

---

## 🎓 Academic requirements coverage

### Level 10

✔ Story creation
✔ Story playing
✔ Anonymous play tracking
✔ Statistics

### Level 13

✔ Search/filter
✔ Named endings
✔ Auto-save sessions
✔ Draft vs published

### Level 16

✔ Authentication
✔ Roles & permissions
✔ Ownership
✔ API key protection

### Level 18–20

✔ Ratings & comments
✔ Reports
✔ Visualizations

---

## 👩‍💻 Author

Aleksandra Temereva
EPITA — Python for Web Final Project
Selfinder Studio
