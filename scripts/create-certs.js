/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable import/no-extraneous-dependencies */
const sh = require('shell-tag');

sh`
	mkdir configs/ssl
	cd configs/ssl
	openssl genrsa -out key.pem
	openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -sha256 -days 365 -subj '/CN=localhost' -nodes
`;
