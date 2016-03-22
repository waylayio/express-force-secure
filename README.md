# Express Force Secure

Forces the Express application to be served over a secure connection. 

Aborts when it does not detect a secure connection instead of upgrading the request.

# Installation

`npm install --save express-force-secure`

# Usage

```javascript
app.use(require('express-force-secure')())
```

# Error handling

The middleware will return a `426 — Upgrade required` error, you can check for this error using the `code` property.

```javascript
// error middleware
app.use((err, req, res, next) => {
	if (err.code === 426) {
		// ...
	}
})
```

# Proxy
If the Express application sits behind a proxy, you must manually trust the proxy by setting `trust proxy`.

```javascript
app.set('trust proxy', true)
```

This will allow the middleware to pick up the `X-Forwarded-Proto` header.

[http://expressjs.com/en/guide/behind-proxies.html](http://expressjs.com/en/guide/behind-proxies.html)

Make sure you correctly set the `X-Forwarded-Proto` header in your Proxy.

**Nginx**

```nginx
location / {
	proxy_pass http://127.0.0.1:3000/;
	proxy_set_header Host $host;
	proxy_set_header X-Real-IP $remote_addr;
	proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
	proxy_set_header X-Forwarded-Proto $scheme;
}
```