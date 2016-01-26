# Virtualmin API

[![Build Status](https://travis-ci.org/luizstacio/virtualmin-api.svg?branch=master)](https://travis-ci.org/luizstacio/virtualmin-api)

It's a simple wrapper

##How it works?

```
  /**
   * Create a new instance
   */
  var config = {
    host: 'foo.com', //required
    path: '/virtual-server/remote.cgi', //value default
    port: 10000, //value default
    user: 'senha', //required
    password: 'password' //required
  };
  var connection = new Virutalmin(config);

  /**
   * Executing one action
   */
  connection.command(program)({
      //pass params here
      domain,
      proxy
    })
    .then((data) => {
    })
    .catch((err) => {
    });
```

The commands and params is the same of ["Virutalmin CLI, check the original doc here."](https://www.virtualmin.com/documentation/developer/cli)
