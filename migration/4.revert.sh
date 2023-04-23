# Je prends l'identité admin_smoothies
export PGUSER=admin_smoothies
export PGPASSWORD=smoothies

sqitch revert # revert tout
# sqitch revert 1.create_tables
# sqitch revert 5.tracking # je souhaite revenir à la version 3