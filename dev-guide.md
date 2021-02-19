# Developer Guide
A collection of the choices I made and functions and standards to be used througout this site. This is just to keep everything a lot more managable and as simple as possible.

## Client-side Forms
* ### Input Validation
  Note: The labels that show validation errors are not XSS safe.

  The validation rules provided by Semantic UI are completely removed. I replaced them with rules that use the package ```validate```. This is because I want to have the exact same validation on the server as I do on the client. When validating, use a "cluster" of rules, if none exist for your use case create one! These "clusters" are stored in a global object called ```inputRuleSet```. The rules themselves are stored on another global object at ```$.fn.form.settings.rules```.

  To maintain consistency try to use inline error messages and validate on blur.

  Example:
  ```javascript
  $('.ui.form')
  .form({
    on: 'blur',
    inline: true,
    fields: {
      email: inputRuleSet.email
    }
  })
  ```

  The current list of validators on the ```inputRuleSet``` object is:
  * ```email``` - emails
  * ```username``` - usernames
  * ```legalName``` - for "legal" names, like first name, last name, etc.
  * ```password``` - for passwords


## Serverside Forms
* ### CSRF
  All POST requests need to contain a server-generated CSRF token in the request body with the name ```_csrf```. These tokens are automatically passed into the render function as ```csrfToken``` for each request. Inside each form with method ```POST``` you should add the following input tag so the server will recognize your request as valid:

  ```<input type="hidden" name="_csrf" value="<%= csrfToken %>">```

* ### Input Validation
  At ```/util``` there is an ```index.js``` which contains ```rules``` and a function ```checkMultiple```. ```rules``` is a list of functions that take a value as an input and output true or false according to the rules of the validator. ```CheckMultiple``` is a function that take an array of ```rules``` (or any expression that is ```true``` or ```false```) and returns true if all of the values are not false. If one or more values is false then the function will return false.
