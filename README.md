start.ffbsee
==========

Add a service
-------------

The list of all services is located at `_data/services.yaml`. You can use this file to sort the services and add new ones.

Development
-----------

	aptitude install jekyll
	git clone git@github.com:ffbsee/start-ffbsee.git
	cd start-ffbsee/
	jekyll serve -w

Deployment
----------

	cd /var/www/start-ffbsee/
	git pull
	jekyll build

License
-------

https://creativecommons.org/licenses/by/4.0/

