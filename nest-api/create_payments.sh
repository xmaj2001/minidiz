#!/bin/bash

for i in {1..100}
do
  # Gera valores dinâmicos para cada pagamento
  amount=$(awk "BEGIN {print 50 + ($i % 10) * 10}") # Valores entre 50.00 e 500.00
  # Corrige a lógica para alternar entre tithe e offering
  if [ $((i % 2)) -eq 0 ]; then
    type="tithe"
  else
    type="offering"
  fi
  # Gera data no formato ISO 8601 (ex.: 2025-06-01T10:00:00Z)
  day=$(printf "%02d" $(( (i % 30) + 1 ))) # Dias de 01 a 30
  date="2025-03-${day}T10:00:00Z"
  description="Pagamento teste $i"

  curl -X POST http://localhost:5000/payments \
  -H "Content-Type: application/json" \
  -d "{\"memberId\": 1, \"type\": \"$type\", \"amount\": $amount, \"date\": \"$date\", \"description\": \"$description\"}"

  echo "Pagamento $i enviado"
done
