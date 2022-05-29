# orbital

To run the website on you local machine, ensure that postgresql is downloaded, and run the backend and then the frontend.

To run the backend, fill up the .env file with the corresponding values and run the following commands while you are in the backend directory:

```
cd migrations
go run *.go init
go run *.go up
cd ..
source .env
go run main.go
```

Then the backend should be ready.

To run the frontend, ensure that you are in the frontend directory and run the following

 ```
 npm start
 ```

Then you are ready to use IntroNus
