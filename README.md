# Angular Routine 01 Setup - Home with Products, About Us static, Product List, Product Detail, fake api

## Step 1 - setup project
```angular
cd desktop
ng new project-name.com
cd project-name.com
code . your folder
ng serve --open OR npm start
```

## Step 2 - prep static files
- create static folders below in src/assets  
	- css
	- images
	- scripts

## Step 3 - bootstrap and fontawesome if needed
```
npm install bootstrap font-awesome
```
be aware of your bootstrap and font-awesome version as you might need to change your html classes


## Step 4 - import your css in src/styles.css
```
@import url('./assets/css/reset.css');
@import url('./assets/css/main.css');
```	
OR
```		
@import "~bootstrap/dist/css/bootstrap.min.css";
@import "~font-awesome/css/font-awesome.min.css";	
```

## Step 5 - add your global script
angular.json 
```
"scripts": [ "src/assets/scripts/scripts.js" ]
```
assets/scripts/scripts.js
```
window.onload = function() { console.log('ready'); };
//restart server to see changes
```

## Step 6 - check/update src/index.html. Add base href, link stylesheet, favicon, scripts, etc if needed
```
<!doctype html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<title>Your Project Title</title>
	<base href="/">
	<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=0">
	<link rel="icon" type="image/x-icon" href="favicon.ico">
	<link rel="preconnect" href="https://fonts.googleapis.com">
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
	<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto">
	<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Montserrat">
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
	<script src="https://maps.googleapis.com/maps/api/js?key=yourGoogleAPIKey" defer></script>
</head>
<body>
	<app-root></app-root>
</body>
</html>
```

## Step 7 - generate components, interface, module, service
```
ng g c header --skip-tests --dry-run
ng g c footer --skip-tests --dry-run
ng g c home --skip-tests --dry-run
ng g c about --skip-tests --dry-run
ng g c aside --skip-tests --dry-run
ng g i products/product --dry-run
ng g m products/product --flat -m app --dry-run
ng g m shared/shared --flat -m products/product.module --dry-run
ng g c products/product-list --skip-tests --flat -m products/product.module --dry-run
ng g c products/product-detail --skip-tests --flat -m products/product.module --dry-run
ng g s products/product --skip-tests --flat --dry-run
```

## Step 7 - setup fake backend - for mock api call
```
npm install angular-in-memory-web-api --save-dev
ng g s products/in-memory-data --skip-tests --flat --dry-run
```

## Step 8 - code
- app.component.html. Note that router-outlet will error below until you setup modules properly.
```
<router-outlet></router-outlet>
```
- shared.module.ts. Note all modules will error until all are setup correctly
- in-memory-data.service.ts
- product.ts
- product.service.ts
- product.module.ts
- app.module.ts
- header.component.html
- footer.component.html
- aside.component.html
- about.component.html
- home.component.ts
- home.component.html
- product-list.component.ts
- product-list.component.html
- product-detail.component.ts
- product-detail.component.html

