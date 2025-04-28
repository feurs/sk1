#!/bin/bash
echo "➡️  Pridávam všetky zmeny do Git..."
git add .

echo "➡️  Zadaj správu pre commit:"
read commitMessage

if [ -n "$(git status --porcelain)" ]; then
    git commit -m "$commitMessage"
    echo "➡️  Pushujem na GitHub (origin)..."
    git push origin main

    echo "➡️  Pushujem na GitLab (gitlab)..."
    git push gitlab main

    echo "✅ Hotovo! Projekt je aktualizovaný na oboch repozitároch."
else
    echo "⚠️  Žiadne zmeny na commitovanie."
fi
