json2yaml
===

A command-line utility to convert JSON to YAML (meaning a `.json` file to a `.yml` file)

The purpose of this utility is to pretty-print JSON in the human-readable YAML object notation
(ignore the misnomer, YAML is not a Markup Language at all).

Installation
===

```bash
npm install -g @convergence-engineering/json2yaml
```

*Note*: To use `npm` and `json2yaml` you must have installed [NodeJS](http://nodejs.org#download).

Usage
---

Specify a file:

```bash
json2yaml ./example.json > ./example.yaml
json2yml ./example.json > ./example.yml
yaml2json ./example.yaml > ./example.json
yml2json ./example.yml > ./example.json
```
