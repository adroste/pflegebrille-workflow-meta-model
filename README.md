# pflegebrille workflow meta model

for `bpmn-io/moddle`

## How to pull (without auth)

Use url:

`https://public:G9JTMUq9KJ4WwrF4keVY@gitlab.tu-clausthal.de/hcis/pflegebrille/pflegebrille-workflow-meta-model.git`

## How to add as npm dependency

Replace `<version>` with tag or commit

### Option 1: update package.json deps

```
"pflegebrille-workflow-meta-model": "git+https://public:G9JTMUq9KJ4WwrF4keVY@gitlab.tu-clausthal.de/hcis/pflegebrille/pflegebrille-workflow-meta-model.git#<version>",
```

### Option 2: use npm

```
npm uninstall --save pflegebrille-workflow-meta-model
npm install --save git+https://public:G9JTMUq9KJ4WwrF4keVY@gitlab.tu-clausthal.de/hcis/pflegebrille/pflegebrille-workflow-meta-model.git#<version>
```

## Moddle Versioning

Format: `<MAJOR>.<MINOR>.<PATCH>` (see: https://semver.org/)
 
* MAJOR: backwards incompatible change / breaking change
* MINOR: backwards compatible change
* PATCH: always 0

## Dev hints

See `moddle.js`.

## Todos

* [ ] tests