```
Job API
   ↓
Fetch job listings using Python
   ↓
Clean and store data in SQLite/MongoDB
   ↓
Filter jobs using ordinary Python
   ↓
OpenAI API
   ├── Extract required skills
   ├── Compare with your resume
   ├── Explain skill gaps
   └── Generate application suggestions
   ↓
React dashboard
```

job-finder/
├── pyproject.toml
├── .env
├── .gitignore
├── main.py
├── utils/
│ ├── **init**.py
│ └── jobs_api.py
├── database/
│ ├── **init**.py
│ └── db.py
└── frontend/
