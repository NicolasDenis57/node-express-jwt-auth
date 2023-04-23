# donner les droits d'exécution du fichier :
# chmod +x init_db.sh 

# Je prends l'identité de spedata :
export PGUSER=spedata

# Je supprime la BDD cuisto et l'utilisateur admin_cuisto
dropdb smoothies
echo "BDD supprimée"
dropuser admin_smoothies
echo "admin_smoothies supprimé"

# Je crèe la BDD cuisto et l'utilisateur admin_cuisto
createuser admin_smoothies -P
echo "admin_smoothies créé"
createdb smoothies -O admin_smoothies
echo "BDD créée"

# Je supprime sqitch.conf et sqitch.plan
rm sqitch.conf
rm sqitch.plan

# J'initiase Sqitch
sqitch init smoothies --target db:pg:smoothies
echo "Sqitch initialisé"
