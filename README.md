# paginate.js
paginate.js is a lightweight javascript library that paginates tables and adds controls to navigate between pages. This is done client-side, so there's no need for additional server-side scripts. You can try some [examples here](https://jsiebel.github.io/paginate.js/demo).

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

## Configuration

You can change the following default settings applied to the tables:

### perPage
The number of rows of a table that is displayed at once. The default is ```20```.

### navigationAbove
Controls if the navigation is shown above the table. The default value is ```false```.

### navigationBelow
Controls if the navigation is shown below the table. The default value is ```true```.

### navigation
The html structure of the navigation.

## Applying the configuration

There are three ways to change the settings:

1. Change the default configuration in the ```pagination.config``` object. All tables that are changed afterwards use
these settings, but not the ones already paginated.
```js
pagination.config.perPage = 10;
```
2. Add a data attribute to the table. Only that table is affected.
```html
<table class="paginated" data-paginate="{&quot;navigationAbove&quot; : true}">
...
</table>
```
3. When paginating after load using with the ```paginate``` method, use the ```config``` parameter. Again, only that
table is affected.
```js
paginate(myTableNode, {navigationBelow : false});
```
## License

[MIT License](LICENSE)
