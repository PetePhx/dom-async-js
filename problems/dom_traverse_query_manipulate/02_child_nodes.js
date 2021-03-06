// Child Nodes

// How many direct and indirect child nodes does each parent node — starting with the element with an id of 1 — have in the DOM generated by the following HTML:

<div id="1">
  <h1 id="2">Hello, <em id="3">World</em></h1>
  <p id="4">
    Welcome to wonderland. This is an
    <span id="5">awesome</span> place.
  </p>
  <a href="#" id="6"><strong id="7">Enter</strong></a>
  <div id="8"><p id="9"><a href="#" id="10">Go back</a></p></div>
</div>

// Consider the following when counting the direct and indirect child nodes for each parent node:

  // * Any DOM node that has at least one child node is a parent node.
  // * Indirect child nodes are the child nodes of child nodes.

id    direct    indirect
1     9         12
2     2         1
3     1         0
4     3         1
5     1         0
6     1         1
7     1         0
8     1         2
9     1         1
10    1         0


// further exploration

// Write code that returns the number of direct and indirect child nodes for a given parent node as an array.

function childNodes(id) {
  return [directChildNodes(document, id), indirectChildNodes(document, id)];
}

function directChildNodes(doc, id) {
  var elm = doc.getElementById(id.toString());
  return elm ? elm.childNodes.length : null;
}

function indirectChildNodes(doc, id) {
  var count = 0;
  var elm = doc.getElementById(id.toString());
  if (!elm) return null;
  walk(elm, function () { count += 1; });
  return count - elm.childNodes.length - 1; // all - direct children - self
}

function walk(node, callback) {
  callback(node);
  var i
  for (i = 0; i < node.childNodes.length; i++) {
    walk(node.childNodes[i], callback);
  }
}


// sample output
childNodes(1); // [9, 12]
childNodes(4); // [3, 1]
childNodes(9); // [1, 1]
childNodes('hi'); // [null, null]
