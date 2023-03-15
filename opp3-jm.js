const main = (input) => {
  const [resultObject, _] = jsonPaser(input, 0);
  return resultObject;
}

const jsonPaser = (input, startIndex) => {
  const resultObject = {};
  let i = startIndex;
  let key = '';

  while (i < input.length) {
    const cursor = i;

    if (!key) {
      if (input[cursor] === '"') {
        const qIdx = input.indexOf('"', cursor + 1);
        key = input.substring(cursor + 1, qIdx);
        i = input.indexOf(':', qIdx + 1) + 1;
      } else {
        i++
      }
    }
    else {
      if (input[cursor] === ' ') {
        i++;
        continue;
      }

      const [value, endPoint] = parseValue(input, cursor)

      resultObject[key] = value;
      key = ''
      i = endPoint + 1;
      if (input[endPoint] === '}') {
        return [resultObject, i];
      }
    }
  }

  return [resultObject, i];
}

const parseValue = (input, cursor) => {
  if (input[cursor] === '"') {
    const idx = input.indexOf('"', cursor + 1);
    return [input.substring(cursor + 1, idx), idx+1]
  } else if (input[cursor] === '{') {
    return jsonPaser(input, cursor);
  } else {
    const cIdx = input.indexOf(',', cursor);
    const bIdx = input.indexOf('}', cursor);

    const endPoint = cIdx > -1 && cIdx < bIdx ? cIdx : bIdx;
    const value = parseOtherType(input.substring(cursor, endPoint));
    return [value, endPoint];
  }
}

const parseOtherType = (value) => {
  if (value === 'true') {
    return true
  } else if (value === 'false') {
    return false
  } else {
    return Number.parseInt(value)
  }
}

console.log('================')
console.log(main('{"string": "This is String,,,{}^^", "number": -39994 , "obj": {"one": 1, "nested object": {"a": 1, "b": "ddd"}}, "boolean": true}'))
