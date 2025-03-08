function typeOf(obj:any):string {
    if (Array.isArray(obj))
        return "array";

    const objectType = {}.toString.call(obj);
    const e = objectType.split(" ")[1];
    if (!e)
        return "unknown";
    return e.slice(0, -1).toLowerCase();
}

var indentLevel = '';
const handlers = {
    "undefined": function () {
        // objects will not have `undefined` converted to `null`
        // as this may have unintended consequences
        // For arrays, however, this behavior seems appropriate
        return 'null';
    },
     "null": function () {
        return 'null';
    },
    "number": function (x) {
        return x;
    },
    "boolean": function (x) {
        return x ? 'true' : 'false';
    },
    "string": function (x) {
        // to avoid the string "true" being confused with the
        // the literal `true`, we always wrap strings in quotes
        return JSON.stringify(x);
    },
    "array": function (val:any) {
        if (val.length === 0) {
            return '[]';
        }
        var output = '';

        indentLevel = indentLevel.replace(/$/, '  ');

        val.forEach(function (val:any) {
            const type = typeOf(val);
            // TODO how should `undefined` be handled?
            var handler = handlers[type];

            if (!handler) {
                throw new Error('what the crap: ' + type);
            }

            output += '\n' + indentLevel + '- ' + handler(val);
        });
        indentLevel = indentLevel.replace(/  /, '');
        
        return output;
    },
    "object": function (obj:any) {
        if (Object.keys(obj).length === 0) {
            return '{}';
        }
        var output = '';
        indentLevel = indentLevel.replace(/$/, '  ');

        Object.keys(obj).forEach(function (key:string) {
            const entry = obj[key];
            const type = typeOf(entry);
            const handler = handlers[type];

            if (type === 'undefined') {
                // the user should do
                // delete obj.key
                // and not
                // obj.key = undefined
                // but we'll error on the side of caution
                return;
            }

            if (!handler) {
                throw new Error('what the crap: ' + type);
            }

            output += '\n' + indentLevel + key + ': ' + handler(entry);
        });
        indentLevel = indentLevel.replace(/  /, '');

        return output;
    },
    "function": function () {
        // TODO this should throw or otherwise be ignored
        return '[object Function]';
    }
};

export default function json2yaml(data:any):string {
    return handlers[typeof data](data) + '\n';
}
