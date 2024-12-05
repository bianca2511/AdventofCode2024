const fs = require("fs");

function readFile(filePath) {
  try {
    const data = fs.readFileSync(filePath);
    return data.toString();
  } catch (error) {
    console.error(`Got an error trying to read the file: ${error.message}`);
  }
}

const adventOfCodeInput = readFile("../Day5/day5input.txt");

const lines = adventOfCodeInput.split("\n");
const emptyLineIndex = lines.findIndex((line) => line == "");

const part1 = lines.slice(0, emptyLineIndex); // Lines before the empty line
const part2 = lines.slice(emptyLineIndex + 1); // Lines after the empty line

const updateRules = part1.map((line) => {
  const [a, b] = line.split("|").map(Number);
  return { a, b };
});

const newUpdates = part2.map((line) => line.split(",").map(Number));

// console.log("Update order rules: ", updateRules);
// console.log("Updates list: ", newUpdates);

function isUpdateInOrder(update, rules) {
  for (let { a, b } of rules) {
    const indexA = update.indexOf(a);
    const indexB = update.indexOf(b);

    if (indexA !== -1 && indexB !== -1 && indexA > indexB) {
      return false;
    }
  }
  return true;
}

// Function to perform DFS and topological sorting
function topologicalSortUtil(v, adj, visited, stack) {
  // Mark the current node as visited
  visited[v] = true;

  // Recur for all adjacent vertices
  for (let i of adj[v]) {
    if (!visited[i]) topologicalSortUtil(i, adj, visited, stack);
  }

  // Push current vertex to stack which stores the result
  stack.push(v);
}

// Function to perform Topological Sort
function topologicalSort(adj, V) {
  // Stack to store the result
  let stack = [];
  let visited = new Array(V).fill(false);

  // Call the recursive helper function to store
  // Topological Sort starting from all vertices one by
  // one
  for (let i = 0; i < V; i++) {
    if (!visited[i]) topologicalSortUtil(i, adj, visited, stack);
  }

  let ordered = [];
  // Print contents of stack
  while (stack.length > 0) {
    // console.log(stack.pop() + " ");
    ordered.push(stack.pop());
  }

  return ordered;
}

let sum = 0;
for (let update of newUpdates) {
  if (!isUpdateInOrder(update, updateRules)) {
    //if not in order
    //setup graph from the array and the rules concerning the numbers in the array
    let V = update.length;
    let filteredRules = updateRules.filter(
      (rule) => update.includes(rule.a) && update.includes(rule.b)
    ); // only include the rules that include the elements to be sorted

    let edges = filteredRules.map(({ a, b }) => [a, b]); //map the object into an array to satisfy the algorithm implementation

    const nameToIndex = {};
    const indexToName = {};

    // Creates arrays with translation to/from the actual numbers to/from [1,2,...V] to satisfy the algo gods
    update.forEach((name, index) => {
      nameToIndex[name] = index;
      indexToName[index] = name;
    });

    console.log(nameToIndex);

    // Creates adjacency list with new vertices and edges
    const adj = Array.from({ length: V }, () => []);

    for (let [out, into] of edges) {
      adj[nameToIndex[out]].push(nameToIndex[into]);
    }

    let order = topologicalSort(adj, V);

    // Get middle element, turn it back to normal and sum it
    let middle = Math.floor(order.length / 2);
    sum += indexToName[order[middle]];
  }
}

console.log(sum);
