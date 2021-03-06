
<img src="https://andersonopt.com/assets/img/logo.png" width="75">

#  AO Scripts

AO Scripts is a starter repo to help utilize `ao-lib` and `ao-cli` for programmatic access to AO resources.  

- `ao-cli` is used to authenticate programmatic access to our app and delegate those permissions to things such as node/js scripts.  
- `ao-lib` is a js sdk to interact with AO resources in a structured way and is what powers most of AO's frontend and backend.

## Setup

### Install Node

Install [node](https://nodejs.org/en/download/) version 14.x.y.  We use [nvm](https://github.com/nvm-sh/nvm) to manage node versions.

Test in command line
```
node -v
```

### Clone Repo, Get Libraries



```
# go to wherever you want to store this code
cd $HOME  

# clone our starter repo
git clone https://github.com/anderson-optimization/ao-scripts
cd ao-scripts
```

#### Get libraries from AO contact

- You should receive `anderson-optimization-ao-lib-v...` and `anderson-optimization-ao-cli-v...`

```
# Make sure library files you received are in the same directory
npm install

# If you are installing different versions, you might have to
npm install --save anderson-optimization-ao-lib-2.0.4.tgz
npm install --save anderson-optimization-ao-cli-1.0.6.tgz
```

### Test Install

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

### Login
This needs to be run before you can access AO resources
```
npm run login

# output
Ao file doesn't exists
CLI Login initiated
Begin login pipeline { auth0: true, firebase: true }
User not logged in
Unable to fetch aoLib, likely not logged in
Login in at <url>

# Web browser should open, login with your user credentials
# After login, terminal will show

Retrieved login code
Requesting auth0 token
GetFirebaseToken
Firebase login succeeded.
Login finished, stored token at <local-path>
```

### Scripts

#### See basic user info
```
npm run user-info

# Output 
My user id is: <uid>
My user state is: <big object...>

I am a member of 216 teams
Team Alabama with 1 members
Team Alberta with 4 members
...

```

#### Fetch a list of projects
```
npm run fetch-projects

# Output

team/<tid>/project/-MfiWs9PcKQRRqVipjgq: ol performance - undefined

Parcel team/<tid>/asset/rau_AAAft2xGjlSL9WGC is 4.24m from CRIPPLE CREEK - 69kV
Bureau Of Land Management - 113.44

Parcel team/<tid>/asset/rau_AAAft3rzfNcOCZmA is 5.19m from CRIPPLE CREEK - 69kV
Cripple Creek Victor  [...] - 207.18

```

#### Rate an asset in a project programmatically
```
# Find an asset rn (you can get one easily by using the url)
# example assetrn=team/<tid>/asset/<aid>

# Usage
# node src/rate-asset-in-all-projects.js <rn> <rating>
node src/rate-asset-in-all-projects.js team/<tid>/asset/<aid> 1

# Output
Searching all projects in current team=<tid> for assetRn=team/<tid>/asset/<aid>
Found asset in project team/<tid>/project/<pid> at step/land/asset/land/<aid> currentRating=2
Updating project!!! {
  rn: 'team/<tid>/project/<pid>',
  'step/land/asset/land/<aid>/rating': '1'
}

# Use UI to confirm it change
```

#### Find asset by name

This currently uses a prefix match. You can also do exact matching.

```
node src/find-asset-by-name.js T

# output, returns all assets starting with capital T
searching for  T
Match: TAP138774 - 34.5kV
Match: TAP138828 - 34.5kV
...
```


#### Update Asset Site Control

```
node src/update-site-control.js <asset-rn>

# Response
Fetched team/ao-mn/asset/ra_27083_07-016003-0_398_94, preparing to update
undefined is not an allowed status [
  'Full Site Control',
  'Offer Accepted',
  'Offer Delivered',
  'Target',
  'Inactive',
  'Terminated'
]

# Update With Value
 node src/update-site-control.js <asset-rn> "Full Site Control"

# Response
 Fetched team/ao-mn/asset/ra_27083_07-016003-0_398_94, preparing to update
Performing multipath update {
  rn: 'team/ao-mn/asset/ra_27083_07-016003-0_398_94',
  'parameter/land/sitecontrolstatus': 'Full Site Control'
}
Confirming database value for parameter.land.sitecontrolstatus=Full Site Control
```

## Reference

### AoLib

The aoLib class documentation can be found [here](https://s3.us-west-2.amazonaws.com/docs.andersonopt.com/ao-lib/2.0.4/classes/ao.html)