#!/bin/bash
# Skript na prípravu aplikácie

echo "Budujem Docker image..."
docker build -t moja-webstranka .

echo "Hotovo. Teraz môžeš pushnuť repozitár na GitHub a deploynúť na Railway."

