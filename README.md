# paginate.js
paginate.js is a lightweight javascript library that paginates tables and adds controls to navigate between pages. This is done client-side, so there's no need for additional server-side scripts.

## Installation
Download the paginate.js file and include it in your website:
```html
<script src="paginate.js"></script>
```

## Dependencies
None.

## How to use it
Any table that has the ```paginated``` class is paginated when loading the document:
```html
<table class="paginated">
...
</table>
```
You can also us the ```paginate``` method to trigger pagination later:
```js
paginate(myTableNode);
```
If you want header or footer rows to always show, put them in appropriate tags (```<thead>``` and ```<tfoot>```).

## License

[MIT License](LICENSE)
