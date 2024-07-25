curl -X POST http://localhost:3000/envelope/create \
     -H "Content-Type: application/json" \
     -d '{
         "category": "Groceries",
         "description": "Monthly grocery budget",
         "budget": 500
     }'

curl -X POST http://localhost:3000/envelope/create \
     -H "Content-Type: application/json" \
     -d '{
         "category": "Food",
         "description": "Food budget",
         "budget": 1200
     }'