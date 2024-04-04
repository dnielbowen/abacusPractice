deploy:
	npm run build
	rsync --chmod=a+rX -av --info=progress2 \
		./dist/ /var/www/webapps/soroban
