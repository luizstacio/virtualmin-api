# Virtualmin API

Its a simples wrapper

##How its works?

```
  /**
   * Create a new instance
   */
  var config = {
    host: 'foo.com', //required
    path: '/virtual-server/remote.cgi', //value default not required
    port: 10000, //value default not required
    user: 'senha', //required
    password: 'password' //required
  };
  var connection = new Virutalmin(config);

  /**
   * Execute one action
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