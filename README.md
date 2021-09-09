

# Ao Cli

`ao-cli` is used to authenticate programmatic access to our app and delegate those permissions to things such as node/js scripts.

## Setup

- Install [node](https://nodejs.org/en/download/) version 14.x.y.  We use [nvm](https://github.com/nvm-sh/nvm) to manage node versions.

Test in command line
```
node -v
```

- Get libraries from AO contact.  You should receive `ao-lib-v...` and `ao-cli-v...`

- Install libraries
```
npm install --save anderson-optimization-ao-lib-v2-0-4.tgz
npm install --save anderson-optimization-ao-cli-v2-0-4.tgz
```

- Test install
```
npm run help

# response should be 
> cli-setup@1.0.0 help /home/eric/work/cli-setup
> ao help

Usage: ao [options] [command]

Options:
  -V, --version   output the version number
  -v, --verbose   verbose output
  --jsonOutput    json output
  -h, --help      display help for command

Commands:
  auth            Authentication to AO system
  config          Configuration for ao
  file            File system
  resource        Resource system
  task            Task system
  ws              AO local workspace for deployment
  help [command]  display help for command
```

## Examples

```
npm run user-info
npm run fetch-projects
```