# Angular Routine 01 Setup - Home with Products, About Us static, Product List, Product Detail, fake api

## Project Version - ng version
```
Angular CLI: 16.2.3
Node: 18.18.0
Package Manager: npm 9.8.1
OS: win32 x64

Angular: 16.2.6
... animations, common, compiler, compiler-cli, core, forms
... platform-browser, platform-browser-dynamic, router

Package                         Version
---------------------------------------------------------
@angular-devkit/architect       0.1602.3
@angular-devkit/build-angular   16.2.3
@angular-devkit/core            16.2.3
@angular-devkit/schematics      16.2.3
@angular/cli                    16.2.3
@schematics/angular             16.2.3
rxjs                            7.8.1
typescript                      5.1.6
zone.js                         0.13.3
```

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

## Step 9 - setup user authentication, purchases, sales to connect api(customUserBlogProdInvApi01 - https://github.com/jmgcheng/customUserBlogProdInvApi01)
- create user interface
- create auth.service.ts
- create user.module.ts
```
ng g m user/user --flat -m app --dry-run
```	
- generate login component
```
ng g c user/login --flat --skip-tests --dry-run
```	
- create user class
```
ng generate class user/user --skip-tests --dry-run
```
- create auth guard
```
ng generate guard user/auth --skip-tests --dry-run
```
- create purchases module
```
ng g m purchases/purchase --flat -m app --dry-run
```
- generate purchase interface
```
ng g i purchases/ipurchase --dry-run
```
- generate purchases service
```
ng g s purchases/purchase --skip-tests --flat --dry-run
```
- create purchase class
```
ng generate class purchases/purchase --skip-tests --dry-run
```
- generate purchase-list component
```
ng g c purchases/purchase-list --flat --skip-tests -m purchases/purchase.module --dry-run
```
- generate purchases detail
```
ng g c purchases/purchase-detail --flat --skip-tests -m purchases/purchase.module --dry-run
```
- generate purchases edit
```
ng g c purchases/purchase-edit --flat --skip-tests -m purchases/purchase.module --dry-run
```
- create sales module
```
ng g m sales/sale --flat -m app --dry-run
```
- generate sale interface
```
ng g i sales/isale --dry-run
```
- generate sales service
```
ng g s sales/sale --skip-tests --flat --dry-run
```
- create sale class
```
ng generate class sales/sale --skip-tests --dry-run
```
- generate sale-list component
```
ng g c sales/sale-list --flat --skip-tests -m sales/sale.module --dry-run
```
- generate sales detail
```
ng g c sales/sale-detail --flat --skip-tests -m sales/sale.module --dry-run
```
- generate sales edit
```
ng g c sales/sale-edit --flat --skip-tests -m sales/sale.module --dry-run
```