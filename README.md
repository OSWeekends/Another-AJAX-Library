# Another-AJAX-Library
Yep, Another AJAX Library

**:warning: JUST FOR EXPERIMENTAL USE ONLY!**

## Team

- @Xexuline
- @UlisesGascon

## Concept


**HEADERS**
```javascript
$http("http://airemad.com/api/v1/")
	.headers({
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    })
    .method("trace")
```



**Behaviour for GET, POST, PUT, DELETE**
```javascript
$http("http://airemad.com/api/v1/")
	.get("station/123")
	.then(console.log)
	.catch(console.warn)

$http("http://airemad.com/api/v1/")
	.get("station/123", (err, data) => {
		if(err){
			console.warn(err)
		} else {
			console.log(data)
		}

	})
```

```javascript
$http("http://airemad.com/api/v1/")
	.post("station", {id:123})
	.then(console.log)
	.catch(console.warn)
```
