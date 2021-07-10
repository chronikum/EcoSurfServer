
Surf sustainable. EcoSurf.  
Winner of the Google Challenge at Collabothon 2021.
# EcoSurf EXPERIMENTAL (k anonymity version)

> THIS VERSION SHOULD NOT BE USED. IT IS NEITHER TESTED AND IS CONSIDERED SLOW, UNSAFE AND INEFFICENT.

This version is ecosurf is being considered unstable. It is privacy secure though.  
Redis was not working for the k-anonymity design, so we switched first to memcached (not working, not well maintained on nodejs)  
and then, finally, to mongodb.

**Why did we choose a nosql database in favor of a key-value database?**  
We can easily use regex to implement k-anonymity, which is to my knowledge not possible in comparable speed to other nosql-databases and  
is considered not possible in key-value databases.

**Why did it not work? What does not work?**  
Importing currently takes very long. I tried to approaches:  
-> **HttpArchiveFetcher** (takes very long but only needs 1G of ram constantly)
	It reads in line for line, comparable to get_next_line in c and inserts them after reading 10000 total results.  
	Then it goes on and takes the next 10000. It takes a very long time and it is not very effective.  
-> **GreenWebFoundationFetcher** (Takes shorter, still long and needs on my system quite a lot of ram (20GB!))  
	It reads in the whole file and then inserts all the read objects at once. This is not really efficient  
	and may lead to problems. Also, it can easily crash if the memory runs full.  

**So if importing works, why don't you continue it?**  
It is not that easy. It may work now, but mongodb does need really long to find all matching patterns (~4 seconds. too long).  
And we return more than usual! In general, 8x more data than normal is transmitted due to the implementation of  
k-anonymity. But it works. Kind of. 

**Next approaches**  
I plan to start over and take a completely new approach in handling this amount of data.  
I am also looking into the possibility in rewriting the backend in Rust, a fast, memory-safe and secure language.  
It is considered one of the "fastest" languages besided C and Assembly.  Also, we want to work with protobuf or MessagePack.  
This are dataformats which are way smaller than JSON.

Do you have suggestions what to do? Please let me know at ecosurf@nosc.io.  

**This is ecosurf**  
In the hackathon beta, we did consider to built it in a privacy focused design.  
But we did not had enough time. So we thought about how to make it harder for us to track the user.  
We came up with an idea and this is the first implementation of it.  
Our implementation is heavily inspired by [haveibeenpwned](https://haveibeenpwned.com/Privacy) password handling.  
We will never see the hash of the full url you visited.  
This also increases the overhead of information sent back to you a little, but it is marginal.  
We implemented better compression to reduce to overhead (brotli).  

This is a project work in progress developed during the hackathon https://collabothon.eu in 2021.  
Special thanks to the fantastic coding school [42heilbronn](https://42heilbronn.de), which provided the team EcoSurf not only with
room to hack in, but also with food, hardware and even dorms for a few people.

We welcome contribution to our project.

## **Licenses and Datasets:**

### License of EcoSurf

This project is licensed under the MIT License.  
### Datasets

**Green Web Dataset**

The Green Web Datasets are being publicy offered by the thegreenwebfoundation.org.
You can find them here:

https://admin.thegreenwebfoundation.org/admin/green-urls


**HTTPArchive Dataset**

HTTPArchive also is a important part for our solution to the challenge.  
You can find their website here: https://httparchive.org  
We used this tutorial the make the data usable and we removed not important parts for us.  
We are planning to automate this, but it will take time.

https://github.com/HTTPArchive/httparchive.org/blob/main/docs/gettingstarted_bigquery.md

Also, you can find general information here:  
https://httparchive.org/reports/page-weight?start=2017_02_15&end=latest&view=list

### Third Party Code and Packages

Also, we are using different other open source projects we would like to attribute.
We will attribute every open source project we used.  
There can be duplicates inside.
**The table was created with a script**, so please be aware that we use information which can be automatically  
obtained by the package information file. It may contain errors.

Thank you very much for the contribution to open source!

module name                               |  license                                                           |  repository
------------------------------------------|--------------------------------------------------------------------|-----------------------------------------------------------
@types/axios@0.14.0                       |  MIT                                                               |  https://github.com/mzabriskie/axios
@types/body-parser@1.19.1                 |  MIT                                                               |  https://github.com/DefinitelyTyped/DefinitelyTyped
@types/connect@3.4.35                     |  MIT                                                               |  https://github.com/DefinitelyTyped/DefinitelyTyped
@types/express-serve-static-core@4.17.23  |  MIT                                                               |  https://github.com/DefinitelyTyped/DefinitelyTyped
@types/express@4.17.13                    |  MIT                                                               |  https://github.com/DefinitelyTyped/DefinitelyTyped
@types/mime@1.3.2                         |  MIT                                                               |  https://github.com/DefinitelyTyped/DefinitelyTyped
@types/moment@2.13.0                      |  MIT                                                               |  https://github.com/moment/moment
@types/node@16.0.0                        |  MIT                                                               |  https://github.com/DefinitelyTyped/DefinitelyTyped
@types/qs@6.9.6                           |  MIT                                                               |  https://github.com/DefinitelyTyped/DefinitelyTyped
@types/range-parser@1.2.3                 |  MIT                                                               |  https://github.com/DefinitelyTyped/DefinitelyTyped
@types/redis@2.8.30                       |  MIT                                                               |  https://github.com/DefinitelyTyped/DefinitelyTyped
@types/serve-static@1.13.10               |  MIT                                                               |  https://github.com/DefinitelyTyped/DefinitelyTyped
abbrev@1.1.1                              |  ISC                                                               |  https://github.com/isaacs/abbrev-js
accepts@1.3.7                             |  MIT                                                               |  https://github.com/jshttp/accepts
ajv@6.12.6                                |  MIT                                                               |  https://github.com/ajv-validator/ajv
ansi-regex@2.1.1                          |  MIT                                                               |  https://github.com/chalk/ansi-regex
aproba@1.2.0                              |  ISC                                                               |  https://github.com/iarna/aproba
are-we-there-yet@1.1.5                    |  ISC                                                               |  https://github.com/iarna/are-we-there-yet
array-flatten@1.1.1                       |  MIT                                                               |  https://github.com/blakeembrey/array-flatten
asn1@0.2.4                                |  MIT                                                               |  https://github.com/joyent/node-asn1
assert-plus@1.0.0                         |  MIT                                                               |  https://github.com/mcavage/node-assert-plus
asynckit@0.4.0                            |  MIT                                                               |  https://github.com/alexindigo/asynckit
aws-sign2@0.7.0                           |  Apache-2.0                                                        |  https://github.com/mikeal/aws-sign
aws4@1.11.0                               |  MIT                                                               |  https://github.com/mhart/aws4
axios@0.21.1                              |  MIT                                                               |  https://github.com/axios/axios
backend@1.0.0                             |  Custom: https://admin.thegreenwebfoundation.org/admin/green-urls  |
balanced-match@1.0.2                      |  MIT                                                               |  https://github.com/juliangruber/balanced-match
base64-js@1.5.1                           |  MIT                                                               |  https://github.com/beatgammit/base64-js
bcrypt-pbkdf@1.0.2                        |  BSD-3-Clause                                                      |  https://github.com/joyent/node-bcrypt-pbkdf
bl@1.2.3                                  |  MIT                                                               |  https://github.com/rvagg/bl
block-stream@0.0.9                        |  ISC                                                               |  https://github.com/isaacs/block-stream
body-parser@1.19.0                        |  MIT                                                               |  https://github.com/expressjs/body-parser
brace-expansion@1.1.11                    |  MIT                                                               |  https://github.com/juliangruber/brace-expansion
buffer-alloc-unsafe@1.1.0                 |  MIT                                                               |  https://github.com/LinusU/buffer-alloc-unsafe
buffer-alloc@1.2.0                        |  MIT                                                               |  https://github.com/LinusU/buffer-alloc
buffer-crc32@0.2.13                       |  MIT                                                               |  https://github.com/brianloveswords/buffer-crc32
buffer-fill@1.0.0                         |  MIT                                                               |  https://github.com/LinusU/buffer-fill
buffer@5.7.1                              |  MIT                                                               |  https://github.com/feross/buffer
bytes@3.1.0                               |  MIT                                                               |  https://github.com/visionmedia/bytes.js
caseless@0.12.0                           |  Apache-2.0                                                        |  https://github.com/mikeal/caseless
code-point-at@1.1.0                       |  MIT                                                               |  https://github.com/sindresorhus/code-point-at
combined-stream@1.0.8                     |  MIT                                                               |  https://github.com/felixge/node-combined-stream
commander@2.20.3                          |  MIT                                                               |  https://github.com/tj/commander.js
concat-map@0.0.1                          |  MIT                                                               |  https://github.com/substack/node-concat-map
console-control-strings@1.1.0             |  ISC                                                               |  https://github.com/iarna/console-control-strings
content-disposition@0.5.3                 |  MIT                                                               |  https://github.com/jshttp/content-disposition
content-type@1.0.4                        |  MIT                                                               |  https://github.com/jshttp/content-type
cookie-signature@1.0.6                    |  MIT                                                               |  https://github.com/visionmedia/node-cookie-signature
cookie@0.4.0                              |  MIT                                                               |  https://github.com/jshttp/cookie
core-util-is@1.0.2                        |  MIT                                                               |  https://github.com/isaacs/core-util-is
cors@2.8.5                                |  MIT                                                               |  https://github.com/expressjs/cors
dashdash@1.14.1                           |  MIT                                                               |  https://github.com/trentm/node-dashdash
debug@2.6.9                               |  MIT                                                               |  https://github.com/visionmedia/debug
decompress-tar@4.1.1                      |  MIT                                                               |  https://github.com/kevva/decompress-tar
decompress-tarbz2@4.1.1                   |  MIT                                                               |  https://github.com/kevva/decompress-tarbz2
decompress-targz@4.1.1                    |  MIT                                                               |  https://github.com/kevva/decompress-targz
decompress-unzip@4.0.1                    |  MIT                                                               |  https://github.com/kevva/decompress-unzip
decompress@4.2.1                          |  MIT                                                               |  https://github.com/kevva/decompress
deep-extend@0.6.0                         |  MIT                                                               |  https://github.com/unclechu/node-deep-extend
delayed-stream@1.0.0                      |  MIT                                                               |  https://github.com/felixge/node-delayed-stream
delegates@1.0.0                           |  MIT                                                               |  https://github.com/visionmedia/node-delegates
denque@1.5.0                              |  Apache-2.0                                                        |  https://github.com/invertase/denque
depd@1.1.2                                |  MIT                                                               |  https://github.com/dougwilson/nodejs-depd
destroy@1.0.4                             |  MIT                                                               |  https://github.com/stream-utils/destroy
detect-libc@1.0.3                         |  Apache-2.0                                                        |  https://github.com/lovell/detect-libc
ecc-jsbn@0.1.2                            |  MIT                                                               |  https://github.com/quartzjer/ecc-jsbn
ee-first@1.1.1                            |  MIT                                                               |  https://github.com/jonathanong/ee-first
encodeurl@1.0.2                           |  MIT                                                               |  https://github.com/pillarjs/encodeurl
end-of-stream@1.4.4                       |  MIT                                                               |  https://github.com/mafintosh/end-of-stream
escape-html@1.0.3                         |  MIT                                                               |  https://github.com/component/escape-html
etag@1.8.1                                |  MIT                                                               |  https://github.com/jshttp/etag
express@4.17.1                            |  MIT                                                               |  https://github.com/expressjs/express
extend@3.0.2                              |  MIT                                                               |  https://github.com/justmoon/node-extend
extsprintf@1.3.0                          |  MIT                                                               |  https://github.com/davepacheco/node-extsprintf
fast-deep-equal@3.1.3                     |  MIT                                                               |  https://github.com/epoberezkin/fast-deep-equal
fast-json-stable-stringify@2.1.0          |  MIT                                                               |  https://github.com/epoberezkin/fast-json-stable-stringify
fd-slicer@1.1.0                           |  MIT                                                               |  https://github.com/andrewrk/node-fd-slicer
file-type@5.2.0                           |  MIT                                                               |  https://github.com/sindresorhus/file-type
finalhandler@1.1.2                        |  MIT                                                               |  https://github.com/pillarjs/finalhandler
follow-redirects@1.14.1                   |  MIT                                                               |  https://github.com/follow-redirects/follow-redirects
forever-agent@0.6.1                       |  Apache-2.0                                                        |  https://github.com/mikeal/forever-agent
form-data@2.3.3                           |  MIT                                                               |  https://github.com/form-data/form-data
forwarded@0.2.0                           |  MIT                                                               |  https://github.com/jshttp/forwarded
fresh@0.5.2                               |  MIT                                                               |  https://github.com/jshttp/fresh
fs-constants@1.0.0                        |  MIT                                                               |  https://github.com/mafintosh/fs-constants
fs.realpath@1.0.0                         |  ISC                                                               |  https://github.com/isaacs/fs.realpath
fstream@1.0.12                            |  ISC                                                               |  https://github.com/npm/fstream
gauge@2.7.4                               |  ISC                                                               |  https://github.com/iarna/gauge
get-stream@2.3.1                          |  MIT                                                               |  https://github.com/sindresorhus/get-stream
getpass@0.1.7                             |  MIT                                                               |  https://github.com/arekinath/node-getpass
glob@7.1.7                                |  ISC                                                               |  https://github.com/isaacs/node-glob
graceful-fs@4.2.6                         |  ISC                                                               |  https://github.com/isaacs/node-graceful-fs
gunzip-file@0.1.1                         |  MIT                                                               |  https://github.com/tyxla/gunzip-file
har-schema@2.0.0                          |  ISC                                                               |  https://github.com/ahmadnassri/har-schema
har-validator@5.1.5                       |  MIT                                                               |  https://github.com/ahmadnassri/node-har-validator
has-unicode@2.0.1                         |  ISC                                                               |  https://github.com/iarna/has-unicode
http-errors@1.7.2                         |  MIT                                                               |  https://github.com/jshttp/http-errors
http-signature@1.2.0                      |  MIT                                                               |  https://github.com/joyent/node-http-signature
https@1.0.0                               |  ISC                                                               |
iconv-lite@0.4.24                         |  MIT                                                               |  https://github.com/ashtuchkin/iconv-lite
ieee754@1.2.1                             |  BSD-3-Clause                                                      |  https://github.com/feross/ieee754
ignore-walk@3.0.4                         |  ISC                                                               |  https://github.com/isaacs/ignore-walk
inflight@1.0.6                            |  ISC                                                               |  https://github.com/npm/inflight
inherits@2.0.3                            |  ISC                                                               |  https://github.com/isaacs/inherits
ini@1.3.8                                 |  ISC                                                               |  https://github.com/isaacs/ini
ipaddr.js@1.9.1                           |  MIT                                                               |  https://github.com/whitequark/ipaddr.js
is-fullwidth-code-point@1.0.0             |  MIT                                                               |  https://github.com/sindresorhus/is-fullwidth-code-point
is-natural-number@4.0.1                   |  MIT                                                               |  https://github.com/shinnn/is-natural-number.js
is-stream@1.1.0                           |  MIT                                                               |  https://github.com/sindresorhus/is-stream
is-typedarray@1.0.0                       |  MIT                                                               |  https://github.com/hughsk/is-typedarray
isarray@1.0.0                             |  MIT                                                               |  https://github.com/juliangruber/isarray
isexe@2.0.0                               |  ISC                                                               |  https://github.com/isaacs/isexe
isstream@0.1.2                            |  MIT                                                               |  https://github.com/rvagg/isstream
jsbn@0.1.1                                |  MIT                                                               |  https://github.com/andyperlitch/jsbn
json-schema-traverse@0.4.1                |  MIT                                                               |  https://github.com/epoberezkin/json-schema-traverse
json-schema@0.2.3                         |  AFLv2.1,BSD                                                       |  https://github.com/kriszyp/json-schema
json-stringify-safe@5.0.1                 |  ISC                                                               |  https://github.com/isaacs/json-stringify-safe
jsprim@1.4.1                              |  MIT                                                               |  https://github.com/joyent/node-jsprim
make-dir@1.3.0                            |  MIT                                                               |  https://github.com/sindresorhus/make-dir
media-typer@0.3.0                         |  MIT                                                               |  https://github.com/jshttp/media-typer
merge-descriptors@1.0.1                   |  MIT                                                               |  https://github.com/component/merge-descriptors
methods@1.1.2                             |  MIT                                                               |  https://github.com/jshttp/methods
mime-db@1.48.0                            |  MIT                                                               |  https://github.com/jshttp/mime-db
mime-types@2.1.31                         |  MIT                                                               |  https://github.com/jshttp/mime-types
mime@1.6.0                                |  MIT                                                               |  https://github.com/broofa/node-mime
minimatch@3.0.4                           |  ISC                                                               |  https://github.com/isaacs/minimatch
minimist@1.2.5                            |  MIT                                                               |  https://github.com/substack/minimist
mkdirp@0.5.5                              |  MIT                                                               |  https://github.com/substack/node-mkdirp
moment@2.29.1                             |  MIT                                                               |  https://github.com/moment/moment
ms@2.0.0                                  |  MIT                                                               |  https://github.com/zeit/ms
needle@2.8.0                              |  MIT                                                               |  https://github.com/tomas/needle
negotiator@0.6.2                          |  MIT                                                               |  https://github.com/jshttp/negotiator
node-addon-api@3.2.1                      |  MIT                                                               |  https://github.com/nodejs/node-addon-api
node-gyp@3.8.0                            |  MIT                                                               |  https://github.com/nodejs/node-gyp
node-pre-gyp@0.11.0                       |  BSD-3-Clause                                                      |  https://github.com/mapbox/node-pre-gyp
nopt@3.0.6                                |  ISC                                                               |  https://github.com/npm/nopt
npm-bundled@1.1.2                         |  ISC                                                               |  https://github.com/npm/npm-bundled
npm-normalize-package-bin@1.0.1           |  ISC                                                               |  https://github.com/npm/npm-normalize-package-bin
npm-packlist@1.4.8                        |  ISC                                                               |  https://github.com/npm/npm-packlist
npmlog@4.1.2                              |  ISC                                                               |  https://github.com/npm/npmlog
number-is-nan@1.0.1                       |  MIT                                                               |  https://github.com/sindresorhus/number-is-nan
oauth-sign@0.9.0                          |  Apache-2.0                                                        |  https://github.com/mikeal/oauth-sign
object-assign@4.1.1                       |  MIT                                                               |  https://github.com/sindresorhus/object-assign
on-finished@2.3.0                         |  MIT                                                               |  https://github.com/jshttp/on-finished
once@1.4.0                                |  ISC                                                               |  https://github.com/isaacs/once
os-homedir@1.0.2                          |  MIT                                                               |  https://github.com/sindresorhus/os-homedir
os-tmpdir@1.0.2                           |  MIT                                                               |  https://github.com/sindresorhus/os-tmpdir
osenv@0.1.5                               |  ISC                                                               |  https://github.com/npm/osenv
parseurl@1.3.3                            |  MIT                                                               |  https://github.com/pillarjs/parseurl
path-is-absolute@1.0.1                    |  MIT                                                               |  https://github.com/sindresorhus/path-is-absolute
path-to-regexp@0.1.7                      |  MIT                                                               |  https://github.com/component/path-to-regexp
pend@1.2.0                                |  MIT                                                               |  https://github.com/andrewrk/node-pend
performance-now@2.1.0                     |  MIT                                                               |  https://github.com/braveg1rl/performance-now
pify@2.3.0                                |  MIT                                                               |  https://github.com/sindresorhus/pify
pinkie-promise@2.0.1                      |  MIT                                                               |  https://github.com/floatdrop/pinkie-promise
pinkie@2.0.4                              |  MIT                                                               |  https://github.com/floatdrop/pinkie
process-nextick-args@2.0.1                |  MIT                                                               |  https://github.com/calvinmetcalf/process-nextick-args
proxy-addr@2.0.7                          |  MIT                                                               |  https://github.com/jshttp/proxy-addr
psl@1.8.0                                 |  MIT                                                               |  https://github.com/lupomontero/psl
punycode@2.1.1                            |  MIT                                                               |  https://github.com/bestiejs/punycode.js
qs@6.7.0                                  |  BSD-3-Clause                                                      |  https://github.com/ljharb/qs
range-parser@1.2.1                        |  MIT                                                               |  https://github.com/jshttp/range-parser
raw-body@2.4.0                            |  MIT                                                               |  https://github.com/stream-utils/raw-body
rc@1.2.8                                  |  (BSD-2-Clause OR MIT OR Apache-2.0)                               |  https://github.com/dominictarr/rc
readable-stream@2.3.7                     |  MIT                                                               |  https://github.com/nodejs/readable-stream
redis-commands@1.7.0                      |  MIT                                                               |  https://github.com/NodeRedis/redis-commands
redis-errors@1.2.0                        |  MIT                                                               |  https://github.com/NodeRedis/redis-errors
redis-parser@3.0.0                        |  MIT                                                               |  https://github.com/NodeRedis/node-redis-parser
redis@3.1.2                               |  MIT                                                               |  https://github.com/NodeRedis/node-redis
request@2.88.2                            |  Apache-2.0                                                        |  https://github.com/request/request
rimraf@2.7.1                              |  ISC                                                               |  https://github.com/isaacs/rimraf
safe-buffer@5.1.2                         |  MIT                                                               |  https://github.com/feross/safe-buffer
safer-buffer@2.1.2                        |  MIT                                                               |  https://github.com/ChALkeR/safer-buffer
sax@1.2.4                                 |  ISC                                                               |  https://github.com/isaacs/sax-js
seek-bzip@1.0.6                           |  MIT                                                               |  https://github.com/cscott/seek-bzip
semver@5.3.0                              |  ISC                                                               |  https://github.com/npm/node-semver
send@0.17.1                               |  MIT                                                               |  https://github.com/pillarjs/send
serve-static@1.14.1                       |  MIT                                                               |  https://github.com/expressjs/serve-static
set-blocking@2.0.0                        |  ISC                                                               |  https://github.com/yargs/set-blocking
setprototypeof@1.1.1                      |  ISC                                                               |  https://github.com/wesleytodd/setprototypeof
signal-exit@3.0.3                         |  ISC                                                               |  https://github.com/tapjs/signal-exit
sqlite3@5.0.2                             |  BSD-3-Clause                                                      |  https://github.com/mapbox/node-sqlite3
sqlite@4.0.23                             |  MIT                                                               |  https://github.com/kriasoft/node-sqlite
sshpk@1.16.1                              |  MIT                                                               |  https://github.com/joyent/node-sshpk
statuses@1.5.0                            |  MIT                                                               |  https://github.com/jshttp/statuses
string-width@1.0.2                        |  MIT                                                               |  https://github.com/sindresorhus/string-width
string_decoder@1.1.1                      |  MIT                                                               |  https://github.com/nodejs/string_decoder
strip-ansi@3.0.1                          |  MIT                                                               |  https://github.com/chalk/strip-ansi
strip-dirs@2.1.0                          |  MIT                                                               |  https://github.com/shinnn/node-strip-dirs
strip-json-comments@2.0.1                 |  MIT                                                               |  https://github.com/sindresorhus/strip-json-comments
tar-stream@1.6.2                          |  MIT                                                               |  https://github.com/mafintosh/tar-stream
tar@2.2.2                                 |  ISC                                                               |  https://github.com/isaacs/node-tar
through@2.3.8                             |  MIT                                                               |  https://github.com/dominictarr/through
to-buffer@1.1.1                           |  MIT                                                               |  https://github.com/mafintosh/to-buffer
toidentifier@1.0.0                        |  MIT                                                               |  https://github.com/component/toidentifier
tough-cookie@2.5.0                        |  BSD-3-Clause                                                      |  https://github.com/salesforce/tough-cookie
tunnel-agent@0.6.0                        |  Apache-2.0                                                        |  https://github.com/mikeal/tunnel-agent
tweetnacl@0.14.5                          |  Unlicense                                                         |  https://github.com/dchest/tweetnacl-js
type-is@1.6.18                            |  MIT                                                               |  https://github.com/jshttp/type-is
unbzip2-stream@1.4.3                      |  MIT                                                               |  https://github.com/regular/unbzip2-stream
unpipe@1.0.0                              |  MIT                                                               |  https://github.com/stream-utils/unpipe
uri-js@4.4.1                              |  BSD-2-Clause                                                      |  https://github.com/garycourt/uri-js
util-deprecate@1.0.2                      |  MIT                                                               |  https://github.com/TooTallNate/util-deprecate
utils-merge@1.0.1                         |  MIT                                                               |  https://github.com/jaredhanson/utils-merge
uuid@3.4.0                                |  MIT                                                               |  https://github.com/uuidjs/uuid
vary@1.1.2                                |  MIT                                                               |  https://github.com/jshttp/vary
verror@1.10.0                             |  MIT                                                               |  https://github.com/davepacheco/node-verror
which@1.3.1                               |  ISC                                                               |  https://github.com/isaacs/node-which
wide-align@1.1.3                          |  ISC                                                               |  https://github.com/iarna/wide-align
wrappy@1.0.2                              |  ISC                                                               |  https://github.com/npm/wrappy
xtend@4.0.2                               |  MIT                                                               |  https://github.com/Raynos/xtend
yauzl@2.10.0                              |  MIT                                                               |  https://github.com/thejoshwolfe/yauzl
