#! /usr/bin/env node

import process from 'node:process';
import fs from 'node:fs';
import json2yaml from '../lib/json2yaml.ts';

const filename = process.argv[2]

function printUsage() {
    console.warn("Usage:");
    console.warn("json2yaml example.json");
}

function handleInput(err, text) {
    if (err) {
        printUsage();
        return;
    }

    console.info(json2yaml(JSON.parse(text)));
}

readInput(handleInput, filename);

//
// this could (and probably should) be its own module
//
function readInput(cb, filename) {
    function readFile() {
        fs.readFile(filename, 'utf8', function (err, text) {
        if (err) {
            console.error("[ERROR] couldn't read from '" + filename + "':");
            console.error(err.message);
            return;
        }

        cb(err, text);
        });
    }

    function readStdin() {
        var text = ''
        , stdin = process.stdin
        ;

        stdin.resume();

        stdin.on('data', function (chunk) {
        text += chunk;
        });

        stdin.on('end', function () {
        cb(null, text);
        });
    }

    if (filename) {
        readFile();
    }
    else {
        readStdin();
    }
}