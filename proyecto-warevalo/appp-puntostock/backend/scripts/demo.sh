#!/usr/bin/env bash
set -e

BASE="http://localhost:3000/api"

echo "== Health =="
curl -s "$BASE/health"; echo

echo "== Branches =="
curl -s -X POST "$BASE/branches" -H 'Content-Type: application/json' \
  -d '{"name":"Sucursal Riohacha","description":"Sede principal"}'; echo

echo "== Suppliers =="
curl -s -X POST "$BASE/suppliers" -H 'Content-Type: application/json' \
  -d '{"nit":"900999888","businessName":"Distribuidora Demo SAS"}'; echo

echo "== Clients =="
curl -s -X POST "$BASE/clients" -H 'Content-Type: application/json' \
  -d '{"name":"Ana Pérez","email":"ana@demo.com","phone":"3001234567"}'; echo

echo "== Product Types =="
curl -s -X POST "$BASE/product-types" -H 'Content-Type: application/json' \
  -d '{"name":"Bebidas","description":"Bebidas y refrescos"}'; echo

echo "== Products =="
curl -s -X POST "$BASE/products" -H 'Content-Type: application/json' \
  -d '{"name":"Agua Cristal 600ml","brand":"Cristal","price":2500,"minStock":1,"quantity":5,"productTypeId":1}'; echo

echo "== Inventory =="
curl -s -X POST "$BASE/inventories" -H 'Content-Type: application/json' \
  -d '{"branchId":1,"productId":1,"quantity":20,"minStock":5}'; echo

echo "== Sales (descuenta stock) =="
curl -s -X POST "$BASE/sales" -H 'Content-Type: application/json' \
  -d '{"clientId":1,"items":[{"productId":1,"quantity":2}],"tax":0,"discounts":0}'; echo

echo "== Payments (pago mixto) =="
curl -s -X POST "$BASE/payments" -H 'Content-Type: application/json' \
  -d '{"referenceType":"SALE","referenceId":1,"method":"CASH","amount":5000}'; echo

echo "== Returns =="
curl -s -X POST "$BASE/returns" -H 'Content-Type: application/json' \
  -d '{"saleId":1,"reason":"Producto en mal estado","lines":[{"productSaleId":1,"quantity":1}]}'; echo

echo "== Fin de la demo =="
