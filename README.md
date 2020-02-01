
## Setup of killed-letters

### Prerequisites

```
python 3.7
pipenv
postgresql 11.5
@angular/cli
```

### Database
Create a new Database called whatever you like.

Connect your database in the entity.py file of the entities directory. SQLAlchemy should create a table in the database called - dead-letter

### Installation

Use

pipenv --dev

to install dependencies on the pipfile.

### Link angular

To link the Angular application to the backend set the API_URL to your venv host, mine is for example.

export const API_URL = 'http://localhost:5000';
