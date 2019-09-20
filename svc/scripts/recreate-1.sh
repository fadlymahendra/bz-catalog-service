for dir in ../modules/bizzy-*/
do
    dir=${dir%*/}

    echo "\nStart Processing ${dir##*/}"

    setup_file="$dir/deployments/lambda/scripts/0-setup.sh"
    deploy_dev="$dir/deployments/lambda/scripts/build-and-deploy-to-dev.sh"
    $setup_file

    sleep 20
    echo "\nWait 20 seconds... this script will continue"

    $deploy_dev

    echo "\nFinish Processing ${dir##*/}"
done