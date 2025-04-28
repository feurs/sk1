#!/bin/bash

echo "Budujem Docker image..."
docker build -t moja-aplikacia-2.0 .
echo "✅ Docker image je hotový. Teraz môžeš pushnuť projekt alebo deploynúť na Railway."
