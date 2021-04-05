import 'dart:convert';
import 'dart:io';

import 'package:flutter/material.dart';
import 'package:http/http.dart' as Http;


class MyForm extends StatefulWidget {
  @override
  State<StatefulWidget> createState() => MyFormState();

  //final String url;
  //MyForm({String url}):url = url;
}


class MyFormState extends State {

  final _formKey = GlobalKey<FormState>();

  String _url, body;
  int statusCode;

  String ip = "";
  String port = "";
  String message = "";
  String hash = "";

  Widget build(BuildContext context) {
    return Container(padding: EdgeInsets.all(10.0), child: new Form(key: _formKey, child: new Column(
      children: <Widget>[

      new Text('IP or DNS name:', style: TextStyle(fontSize: 20.0),),

      // ignore: missing_return
      new TextFormField(validator: (value)
      {
        if (value.isEmpty) return 'Enter IP!';
        try { ip = value.toString(); } catch(e) {
          ip = null;
          return e.toString();
        }
      }),

      new SizedBox(height: 20.0),

        new Text('PORT:', style: TextStyle(fontSize: 20.0),),

        // ignore: missing_return
        new TextFormField(validator: (value){
          if (value.isEmpty) return 'Enter Port!';

          try { port = value.toString(); } catch(e) {
            port = null;
            return e.toString();
          }
        }),

        new SizedBox(height: 20.0),

        new Text('Message:', style: TextStyle(fontSize: 20.0),),

        // ignore: missing_return
        new TextFormField(validator: (value){
          if (value.isEmpty) return 'Enter Message!';

          try { message = value.toString(); } catch(e) {
            message = null;
            return e.toString();
          }
        }),

        new SizedBox(height: 20.0),

        new Text('Hash:', style: TextStyle(fontSize: 20.0),),

        // ignore: missing_return
        new TextFormField(validator: (value){
          if (value.isEmpty) return 'Enter Hash!';

          try { hash = value.toString(); } catch(e) {
            hash = null;
            return e.toString();
          }
        }),

      new RaisedButton(onPressed: () async {
        if(_formKey.currentState.validate()) Scaffold.of(context).showSnackBar(SnackBar(content: Text('Success'),
          backgroundColor: Colors.green,));

        /*
        http.Response res = await http.post('https://' + ip + ":" + port + "/vhash",
            body: {'data': message, 'generHash': hash},
            headers: { 'Accept':'application/json' });

        print("Response status: ${res.statusCode}");
        print("Response body: ${res.body}");
         */

        HttpClient client = new HttpClient();
        client.badCertificateCallback =((X509Certificate cert, String host, int port) => true);

        String url = "https://" + ip + ":" + port + "/vhash";
        Map map = { "data" : message , "generHash" : hash };
        HttpClientRequest request = await client.postUrl(Uri.parse(url));

        request.headers.set('content-type', 'application/json');
        request.add(utf8.encode(json.encode(map)));

        HttpClientResponse response = await request.close();
        String reply = await response.transform(utf8.decoder).join();
        print(reply);

        }, child: Text('Send'), color: Colors.blue, textColor: Colors.white,),
    ],
    )
    )
    );
  }

}

void main() => runApp(
    new MaterialApp(
        debugShowCheckedModeBanner: false,
        home: new Scaffold(
            appBar: new AppBar(title: new Text('LB2_3')),
            body: new MyForm()
        )
    )
);

class MyApp extends StatelessWidget {
  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      theme: ThemeData(
        primarySwatch: Colors.blue,
        visualDensity: VisualDensity.adaptivePlatformDensity,
      ),
      home: MyHomePage(title: 'Flutter LB2_3'),
    );
  }
}

class MyHomePage extends StatefulWidget {
  MyHomePage({Key key, this.title}) : super(key: key);

  final String title;

  @override
  _MyHomePageState createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  int _counter = 0;

  void _incrementCounter() {
    setState(() { _counter++; });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(widget.title),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            Text(
              'You have pushed the button this many times:',
            ),
            Text(
              '$_counter',
              style: Theme.of(context).textTheme.headline4,
            ),
          ],
        ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: _incrementCounter,
        tooltip: 'Increment',
        child: Icon(Icons.add),
      ),
    );
  }
}
