# HTML

Created: February 23, 2022 5:14 PM
Reviewed: No
Type: Notes

# Main Tags

## <head>

Contains all the metadata about the document

## <body>

Content of html document, only one per document

## <article>

self-contained composition in a document, page, application, or site, which is intended to be independently distributable, e.g. A Forum post, blog entry etc.

## <header>

introductory content, typically a group of introductory or navigational aids

## <footer>

typically contains information about the author of the section, copyright data or links to related documents.

## <main>

element represents the dominant content of the `body`
 of a document.

## <h1-6>

six levels of section headings

## <nav>

## <section>

This element represents a generic standalone section of a document, which doesn't have a more specific semantic element to represent it. Sections should always have a heading, with very few exceptions.

## <div>

The <div> HTML element is the generic container for flow content.

## <p>

The <p> HTML element represents a paragraph

## <ol>

The <ol> HTML element represents an ordered list of items

## <ul>

The <ol> HTML element represents an ordered list of items

## <li>

The <li> HTML element is used to represent an item in a list.

## <span>

The <span> HTML element is a generic inline container for phrasing content, which does not inherently represent anything but div is a **block-level** element whereas a <span> is an **inline** element.

## <img>

The <img> HTML element embeds an image into the document.

## <script>

The <script> HTML element is used to embed executable code or data; this is typically used to embed or refer to JavaScript code

## <a>

The <a> HTML element (or anchor element), with its href attribute, creates a hyperlink to web pages, files, email addresses, locations in the same page, or anything else a URL can address.

## <table>

```html
<table></table>
<td></td> -> defines a cell of a table that contains data.
<tr></tr> -> defines a row of a table that contains cells.
<th></th> -> Table headings
<thead></thead> -> Wraps a row to indicate it is header
<tbody></tbody> -> Wraps body rows
<tfooter></tfooter> -> footer row (usually used for cumulative values or something.)
```

colspan and rowspawn attributes:

- `colspan`: This attribute contains a non-negative integer value that indicates for how many columns the cell extends
- `rowspawn`: This attribute contains a non-negative integer value that indicates for how many rows the cell extends. Its default value is `1`; if its value is set to `0`, it extends until the end of the table section (, , , even if implicitly defined), that the cell belongs to. Values higher than 65534 are clipped down to 65534.

# Forms

## <form>

The <form> HTML element represents a document section containing interactive controls for submitting information.

```html
<form></form>

```

- form itself is a shell or container. Fill form with inputs, checkboxes, buttons etc.
- The action attribute specitfies WHERE the form data should be sent.
- The method attribute specifies which HTTP method should be used.

## <input>

has no closing tag.

```
<input>
```

inputs can have many type attributes:

- text
- password
- color
- number -> Can have a min,max and step
- range
- url
- email
- checkbox -> can have `checked` attribute to default to checked
- radio button -> cant have more than one checked in a group. same `name` attribute required to group them together. `id` needed to link to label. **`value` needed to s**pecify what the value is when submitted.

etc more here -> [https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input)

`id` attribute -> unique identifier for labels.

Can have `placeholder` attribute in the text/password fields for example

`name` attribute:

Is the name of the value that will be passed to the server, example in this url.

file://dogs?**username=dog123**

inputs of type range

```
<input type = "range" id="range" value = "range" min="0" max="1">
```

multi line plain text input

```
<textarea id = "" name="" rows="" cols="" placeholder=""></textarea>
```

Uses an attribute called `required`

[https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/required](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/required)

The required attribute is supported by text, search, url, tel, email, password, date, month, week, time, datetime-local, number, checkbox, radio, file, `<input>` types along with the `<select>` and `<textarea>` form control elements. If present on any of these input types and elements, the :required pseudo class will match. If the attribute is not included, the :optional pseudo class will match.

required can be added to input and it will make it required to fill out before submission.

```html
<input type="text" name="first" id="first" required>
```

input type of **tel**, **email** and **url** is also useful

## <label>

```
<label></label>
```

labels have a `for` attribute which specifies which input it is linked to. The corresponding input needs to have the matching `id` attribute for the `for` attribute.

## <button>

```
<button></button>
```

Buttons inside a form will by default do the action/submit the form

has 'type' attribute:

- button -> tell html it is a button it will not submit the form by default on click anymore.
- submit -> will submit the form

A form doesn't need a button to submit, if user presses enter it will also submit!

## <select>

```
<select name="" id="">
    <option value=""></option>
</select>
```

can add `selected` attribute to an option to make it automatically selected

## <range>

inputs of type range

```html
<input type = "range" id="range" value = "range" min="0" max="1">
```

## <text area>

multi line plain text input

```html
<textarea id = "" name="" rows="" cols="" placeholder=""></textarea>
```

## Form Validation

uses an attribute called `required`

[https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/required](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/required)

The required attribute is supported by text, search, url, tel, email, password, date, month, week, time, datetime-local, number, checkbox, radio, file, `<input>` types along with the `<select>` and `<textarea>` form control elements. If present on any of these input types and elements, the :required pseudo class will match. If the attribute is not included, the :optional pseudo class will match.

required can be added to input and it will make it required to fill out before submission.

```
<input type="text" name="first" id="first" required>
```

Input type of tel, email and url is also useful

# Other stuff

## Block vs Inline elements

Inline elements fit in aloneside other elements

Block level elements take up a whole “block” of space.

[https://www.samanthaming.com/pictorials/css-inline-vs-inlineblock-vs-block/](https://www.samanthaming.com/pictorials/css-inline-vs-inlineblock-vs-block/)

## Html Entities

- Start with & and ends with ;
- Used to display reserved characters, that are normally invalid or complicated symbols like a copyright sign.
- Stuff like < or > which are html characters need to be encoded so it doesnt screw up the markup.

## Semantic markup

- Dont use div for everything u nonce.
- use spans, articles, section, footer, nav, header,main etc so that the markup kind of makes sense.
- **Main**: Dominant content of document
- **Nav:** Navigation links
- **Section:** A standalone section , usually has a heading. Used to seperate different topic in ur markup
- **Article:** Self contained composition in a document, intended to be independently distributable. (E.g. A Forum post, newspaper article, blog entry)
- **Figure:** Self contained content with a caption

## .